from django.contrib import admin
from django.conf import settings
from dj_rest_auth.registration.views import VerifyEmailView
from django.conf.urls.static import static
from django.urls import path, include
from accounts.views import CookieTokenRefreshView, CookieTokenObtainPairView


urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/', include('accounts.urls')),
    path('accounts/', include('dj_rest_auth.urls')),
    path('accounts/signup/', include('dj_rest_auth.registration.urls')),
    path('token/', CookieTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', CookieTokenRefreshView.as_view(), name='token_refresh'),
    path('confirm-email/', VerifyEmailView.as_view(),
         name='account_email_verification_sent'),
    path('accounts/', include('allauth.urls')),
    path('posts/', include('posts.urls')),

    path('ckeditor/', include('ckeditor_uploader.urls')),
]


if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)
    import debug_toolbar
    urlpatterns += [
        path('__debug__/', include(debug_toolbar.urls)),
    ]
