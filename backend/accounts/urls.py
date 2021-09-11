from django.urls import path
from .views import *
from allauth.account.views import ConfirmEmailView
from dj_rest_auth.views import PasswordResetConfirmView


urlpatterns = [
    path('login/', CustomLoginView.as_view(), name='user_login'),
    path('users/', UserViewSet.as_view({'get': 'list'}), name='user_list'),
    path('logout/', LogoutView.as_view(), name='rest_logout'),
    path('logout_all/', LogoutAllView.as_view(), name='logout_all'),
    path('password/reset/confirm/<slug:uidb64>/<slug:token>/',
         PasswordResetConfirmView.as_view(), name='password_reset_confirm'),

    path('test/', ConfirmEmailView.as_view()),
    path('send-email/', ResendEmailView.as_view(), name='resend_email'),
]
