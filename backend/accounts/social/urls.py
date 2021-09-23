from django.urls import path
from .views import *


urlpatterns = [
    path('kakao/', KakaoSignUpView.as_view(), name='kakao_login'),
    path('kakao/login/callback/',
         KakaoSignInCallBackView.as_view(), name='kakao_callback'),
    path('kakao/login/', kakaoLogin.as_view(), name='kakao_login_finish'),

    path('naver/', NaverSignUpView.as_view(), name='naver_login'),
    path('naver/login/callback/',
         NaverSignInCallBackView.as_view(), name='naver_callback'),
    path('naver/login/', NaverLogin.as_view(), name='naver_login_finish'),
]
