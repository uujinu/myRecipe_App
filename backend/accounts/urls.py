from django.urls import path
from .views import *
from .social.views import *


urlpatterns = [
    path('login/', CustomLoginView.as_view(), name='user_login'),
    path(
        'users/<int:pk>/', UserViewSet.as_view({'get': 'retrieve'}), name='user_profile'),
    path('logout/', LogoutView.as_view(), name='rest_logout'),
    path('logout_all/', LogoutAllView.as_view(), name='logout_all'),
    path('password/reset/confirm/<slug:uidb64>/<slug:token>/',
         CustomPasswordResetConfirmView.as_view(), name='password_reset_confirm'),
    path('send-email/', ResendEmailView.as_view(), name='resend_email'),

    path('kakao/', KakaoSignUpView.as_view(), name='kakao_login'),
    path('kakao/login/callback/',
         KakaoSignInCallBackView.as_view(), name='kakao_callback'),
    path('kakao/login/', kakaoLogin.as_view(), name='kakao_login_finish'),
    path('naver/', NaverSignUpView.as_view(), name='naver_login'),
    path('naver/login/callback/',
         NaverSignInCallBackView.as_view(), name='naver_callback'),
    path('naver/login/', NaverLogin.as_view(), name='naver_login_finish'),

    path('following/', following, name='following'),
    path('following/<int:user_id>/', following, name='following'),
    path('info/', info,),
]
