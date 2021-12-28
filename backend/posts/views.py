import os
import sys
import json
from PIL import Image
from io import BytesIO
from django.http.response import JsonResponse
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from accounts.models import User
from .models import *
from .serializers import *
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.core.files.uploadedfile import InMemoryUploadedFile
import requests
from django.core.paginator import EmptyPage, Paginator


class PostView(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostWriteSerializer
    permission_classes = (IsAuthenticated,)

    def get_permissions(self):
        if self.action == 'list' or self.action == 'retrieve':
            return (AllowAny(),)
        return super().get_permissions()

    def get_serializer_class(self):
        if self.action == 'create':
            return PostWriteSerializer

        if self.action == 'list':
            return PostListSerializer

        if self.action == 'retrieve':
            return PostDetailSerializer

    def convert_test(self, img, w, h):
        temp = Image.open(img).copy()
        temp = temp.convert('RGB')
        temp.thumbnail((w, h), Image.ANTIALIAS)
        return self.image_to_bytes(temp)

    def image_to_bytes(self, img):
        res = BytesIO()
        img.save(res, format='JPEG', quality=95)
        res.seek(0)
        return res

    def get_serializer(self, *args, **kwargs):
        serializer_class = self.get_serializer_class()
        kwargs.setdefault('context', self.get_serializer_context())

        if self.action == 'create':
            request_data = self.request.data.copy()

            # cooksteps
            cooksteps = []
            step_des = self.request.POST.getlist('step_des')
            request_data.pop('step_des')

            for idx in range(len(step_des)):
                cooksteps.append(
                    {'step_id': idx + 1, 'description': step_des[idx]})

            for img in (img for img in self.request.FILES.keys() if img.split('_')[0] == 'img'):
                idx = int(img.split('_')[1])
                cooksteps[idx]['step_image'] = self.request.FILES.get(img)

            request_data['cooksteps'] = cooksteps

            # ingredients
            request_data['ingredients'] = json.loads(
                self.request.POST.get('ingredients'))

            # images
            imgArr = self.request.FILES.getlist('images')
            if (len(imgArr)):
                tempArr = []
                for img in imgArr:
                    tempArr.append({'recipe_image': img})
                request_data['images'] = tempArr

            # thumbnail
            if request_data['thumbnail'] == '':
                request_data.pop('thumbnail')
            else:
                img = request_data['thumbnail']
                converted = self.convert_test(img, 620, 500)
                thumbnail = InMemoryUploadedFile(
                    file=converted, field_name="ImageField", name=img.name, content_type='image/jpeg', size=sys.getsizeof(converted), charset=None)
                request_data['thumbnail'] = thumbnail

            kwargs['data'] = request_data.dict()

        return serializer_class(*args, **kwargs)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(author=request.user)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def get_queryset(self):
        if self.action == 'list':
            post_all = Post.objects.all()
            page = int(self.request.GET.get('p', 1))
            try:
                paginator = Paginator(post_all, 16).page(page)
            except EmptyPage:
                return {}
            return paginator
        return super().get_queryset()

    def list(self, request, *args, **kwargs):
        res = super().list(request, *args, **kwargs)
        res['total'] = Post().count
        return res


class CommentView(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = (IsAuthenticated,)

    def get_permissions(self):
        if self.action == 'list':
            return (AllowAny(),)
        return super().get_permissions()

    def create(self, request, *args, **kwargs):
        if kwargs['post_id'] is None:
            return Response('잘못된 요청입니다.', status=status.HTTP_400_BAD_REQUEST)
        request.data['post'] = kwargs['post_id']

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def list(self, request, *args, **kwargs):
        if kwargs['post_id'] is None:
            return Response('잘못된 요청입니다.', status=status.HTTP_400_BAD_REQUEST)
        data = CommentSerializer(Post.objects.get(
            id=kwargs['post_id']).comments.all(), many=True).data
        return Response(data, status=status.HTTP_200_OK)


def getData():  # json 데이터 로드
    dir = os.path.dirname(os.path.dirname(
        os.path.dirname(os.path.abspath(__file__))))
    ingridient = os.path.join(dir, 'ingredients.json')
    recipe = os.path.join(dir, 'recipe.json')

    with open(ingridient, 'r', encoding='UTF8') as json_file:
        ing = json.load(json_file)
    with open(recipe, 'r', encoding='UTF8') as json_file:
        rcp = json.load(json_file)

    return ing, rcp


# query 관련 레시피 정보 응답
def search(request):
    query = request.GET['q']
    if query:
        set_temp = set()
        post_list = Post.objects.filter(
            title__contains=query)  # 제목에 query가 포함된 post
        ings = Ingredient.objects.filter(name__contains=query)  # query와 관련된 재료
        for i in post_list:
            set_temp.add(i.id)
        for i in ings:
            set_temp.add(i.post_id)

        # query 관련 post 데이터
        data = PostListSerializer(instance=Post.objects.filter(
            id__in=set_temp), many=True).data

        # openapi
        ing, rcp = getData()
        ings = []
        temp = set()

        for i in ing:  # query 관련 재료
            if query in i['NEW_IRDNT_NM']:
                ings.append(i['IRDNT_NM'])
        for i in ings:  # 해당 재료가 들어가는 모든 레시피 ID
            res = requests.get(os.environ.get(
                'RECIPE_IRDNT') + f'/1/1000?IRDNT_NM={i}').json()['Grid_20150827000000000227_1']['row']
            for k in res:
                if rcp.get(str(k['RECIPE_ID'])):
                    temp.add(rcp[str(k['RECIPE_ID'])])
        for i in rcp:
            if query in rcp[i]:
                temp.add(rcp[i])

        return JsonResponse({'posts': json.dumps(data, ensure_ascii=False), 'rcps': json.dumps(list(temp), ensure_ascii=False)})


def jsonData(request):
    ing, rcp = getData()
    ary = set()
    for i in ing:
        if i['NEW_IRDNT_NM'] not in ary:
            ary.add(i['NEW_IRDNT_NM'])
    for i in rcp:
        ary.add(rcp[i])
    return JsonResponse({'data': list(ary)})


@api_view(['get', 'post', 'delete'])
@permission_classes((IsAuthenticated,))
def like(request, post_id=None):
    if request.method == 'GET':  # 사용자 좋아요 리스트
        like_list = User.objects.get(id=request.user.id).like_posts.all()
        return Response(PostListSerializer(like_list, many=True).data, status=status.HTTP_200_OK)
    else:  # 좋아요 생성/삭제
        if post_id is None:
            return Response('잘못된 접근입니다.', status=status.HTTP_400_BAD_REQUEST)
        try:
            post = Post.objects.get(id=post_id)
            res = {}
            if post.likes.filter(id=request.user.id).exists():
                post.likes.remove(request.user)
                res['msg'] = '좋아요가 취소되었습니다.'
            else:
                post.likes.add(request.user)
                res['msg'] = '좋아요가 추가되었습니다.'
            res['count'] = post.likes.count()
            return Response(res, status=status.HTTP_200_OK)
        except:
            return Response('존재하지 않는 포스트입니다.', status=status.HTTP_404_NOT_FOUND)


@api_view(['get', 'post', 'delete'])
@permission_classes((IsAuthenticated,))
def bookmark(request, post_id=None):
    if request.method == 'GET':  # 사용자 북마크 리스트
        mark_list = User.objects.get(id=request.user.id).bookmarks.all()
        return Response(PostListSerializer(mark_list, many=True).data, status=status.HTTP_200_OK)
    else:  # 북마크 생성/삭제
        if post_id is None:
            return Response('잘못된 접근입니다.', status=status.HTTP_400_BAD_REQUEST)
        try:
            post = Post.objects.get(id=post_id)
            res = {}
            if post.bookmarks.filter(id=request.user.id).exists():
                post.bookmarks.remove(request.user)
                res['msg'] = '북마크가 취소되었습니다.'
            else:
                post.bookmarks.add(request.user)
                res['msg'] = '북마크가 추가되었습니다.'
            res['count'] = post.bookmarks.count()
            return Response(res, status=status.HTTP_200_OK)
        except:
            return Response('존재하지 않는 포스트입니다.', status=status.HTTP_404_NOT_FOUND)
