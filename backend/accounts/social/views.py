
import os
import requests
from json.decoder import JSONDecodeError
from rest_framework.views import APIView
from django.shortcuts import redirect
from rest_framework import generics
from rest_framework import status
from rest_framework.response import Response
from django.http.response import JsonResponse
from dj_rest_auth.registration.views import SocialLoginView
from rest_framework.permissions import AllowAny
from allauth.socialaccount.providers.kakao.views import KakaoOAuth2Adapter
from allauth.socialaccount.providers.naver.views import NaverOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from dj_rest_auth.registration.serializers import SocialAccountSerializer
from accounts.models import User
from .serializers import *


class NaverSignUpView(APIView):
    permission_classes = [AllowAny, ]

    def get(self, request):
        client_id = os.environ.get('NAVER_CLIENT_ID')
        redirectURI = os.environ.get('NAVER_REDIRECT_URI')
        state = request.COOKIES.get('csrftoken')
        url = f'https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id={client_id}&redirect_uri={redirectURI}&state={state}'
        return redirect(url)


class NaverSignInCallBackView(generics.GenericAPIView):
    permission_classes = [AllowAny, ]
    serializer_class = SocialAccountSerializer
    adapter_class = NaverOAuth2Adapter

    def get(self, request, *args, **kwargs):
        error = request.GET.get('error')
        if error is not None:
            error_description = request.GET.get('error_description')
            return Response(error_description, status=status.HTTP_400_BAD_REQUEST)
        code = request.GET.get('code')
        state = request.GET.get('state')

        # 접근 토큰 발급 요청
        grant_type = 'authorization_code'
        client_id = os.environ.get('NAVER_CLIENT_ID')
        client_secret = os.environ.get('NAVER_CLIENT_SECRET')
        url = f'https://nid.naver.com/oauth2.0/token?grant_type={grant_type}&client_id={client_id}&client_secret={client_secret}&code={code}&state={state}'
        token_response = requests.get(url)
        token_response_json = token_response.json()

        error = token_response_json.get('error')
        if error is not None:
            error_description = token_response_json.get('error_description')
            msg = f'{error_description} [{error}]'
            return Response(msg, status=status.HTTP_400_BAD_REQUEST)

        # 발급 요청 성공한 경우 네이버 회원정보 요청
        access_token = token_response_json.get('access_token')

        headers = {'Authorization': f'Bearer {access_token}'}
        url = "https://openapi.naver.com/v1/nid/me"

        naver_response = requests.get(url, headers=headers)
        naver_response_json = naver_response.json()

        if (naver_response_json.get('resultcode') != '00'):
            return JsonResponse(naver_response_json.get('message'), status=status.HTTP_400_BAD_REQUEST)

        email = naver_response_json.get('response').get('email')

        try:
            user = User.objects.get(email=email)
            if user.platform != 'naver':
                platform = "일반 계정" if user.platform is None else user.platform
                return Response({'error': email + '은 ' + platform + '(으)로 가입된 계정입니다.'}, status=status.HTTP_400_BAD_REQUEST)
        except:
            pass

        url = 'http://localhost:8000/accounts/naver/login/'
        data = requests.post(
            url, {'access_token': access_token, 'code': code})
        data_status = data.status_code
        if data_status != 200:
            return Response({'error': '로그인에 실패하였습니다.'}, status=status.HTTP_400_BAD_REQUEST)
        accept_json = data.json()
        accept_json.pop('user', None)
        return Response(accept_json, status=status.HTTP_200_OK)


class NaverLogin(SocialLoginView):
    adapter_class = NaverOAuth2Adapter
    client_class = OAuth2Client
    callback_url = os.environ.get('NAVER_REDIRECT_URI')


class KakaoSignUpView(APIView):
    permission_classes = [AllowAny, ]

    def get(self, request):
        rest_api_key = os.environ.get('REST_API_KEY')
        redirect_uri = os.environ.get('REDIRECT_URI')
        authorize_url = 'https://kauth.kakao.com/oauth/authorize'
        return redirect(
            f'{authorize_url}?response_type=code&client_id={rest_api_key}&redirect_uri={redirect_uri}'
        )


class KakaoSignInCallBackView(generics.GenericAPIView):
    permission_classes = [AllowAny, ]
    serializer_class = SocialAccountSerializer
    adapter_class = KakaoOAuth2Adapter

    def get(self, request):
        rest_api_key = os.environ.get('REST_API_KEY')
        redirect_uri = os.environ.get('REDIRECT_URI')
        code = request.GET.get('code')
        kakao_token_api = 'https://kauth.kakao.com/oauth/token'
        data = {
            'grant_type': 'authorization_code',
            'client_id': rest_api_key,
            'redirect_uri': redirect_uri,
            'code': code,
        }
        token_response = requests.post(kakao_token_api, data=data)

        token_response_json = token_response.json()
        error = token_response_json.get('error')
        if error is not None:
            raise JSONDecodeError(error)

        access_token = token_response_json.get('access_token')

        url = 'https://kapi.kakao.com/v2/user/me'
        headers = {"Authorization": f'Bearer {access_token}'}

        # 사용자 정보
        kakao_response = requests.get(url, headers=headers)
        kakao_response_json = kakao_response.json()
        email = kakao_response_json.get('kakao_account').get('email')

        url = 'http://localhost:8000/accounts/kakao/login/'

        if email is None:
            return Response({'error': '가입 시 이메일은 필수입니다.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.get(email=email)
            if user.platform != 'kakao':
                platform = "일반 계정" if user.platform is None else user.platform
                return Response({'error': email + '은 ' + platform + '(으)로 가입된 계정입니다.'}, status=status.HTTP_400_BAD_REQUEST)
        except:
            pass

        data = requests.post(url, {'access_token': access_token})
        data_status = data.status_code
        if data_status != 200:
            return JsonResponse({'error': '로그인에 실패하였습니다.'}, status=data_status)

        accept_json = data.json()
        accept_json.pop('user', None)
        access_token = accept_json.get('access_token')

        return JsonResponse({'success': '로그인에 성공하였습니다.', 'result': accept_json})


class kakaoLogin(SocialLoginView):
    adapter_class = KakaoOAuth2Adapter
    client_class = OAuth2Client
    callback_url = os.environ.get('REDIRECT_URI')
