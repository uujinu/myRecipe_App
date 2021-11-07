import sys
import json
from PIL import Image
from io import BytesIO
from rest_framework import status
from .models import *
from .serializers import *
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.core.files.uploadedfile import InMemoryUploadedFile


class PostView(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostWriteSerializer
    permission_classes = (IsAuthenticated,)

    def get_permissions(self):
        if self.action == 'list':
            return (AllowAny(),)
        return super().get_permissions()

    def get_serializer_class(self):
        if self.action == 'create':
            return PostWriteSerializer

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


        if self.action == 'list':
            return PostListSerializer

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
            # thumbnail
            if request_data['thumbnail'] == '':
                request_data.pop('thumbnail')
            else:
                img = request_data['thumbnail']
                converted = self.convert_test(img, 620, 500)
                thumbnail = InMemoryUploadedFile(
                    file=converted, field_name="ImageField", name=img.name, content_type='image/jpeg', size=sys.getsizeof(converted), charset=None)
                request_data['thumbnail'] = thumbnail

                for img in imgArr:
                    tempArr.append({'recipe_image': img})
                request_data['images'] = tempArr

            kwargs['data'] = request_data.dict()

        return serializer_class(*args, **kwargs)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(author=request.user)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class CommentView(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = (AllowAny,)
