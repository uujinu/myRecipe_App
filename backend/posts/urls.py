from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
router.register('post', PostView)

urlpatterns = [
    path('', include(router.urls)),
    path('search/', search, name='search-posts'),
    path('data/', jsonData, name='json-data'),

    path('like/', like, name='like-list'),
    path('like/<int:post_id>/', like, name='like-setting'),

    path('bookmark/', bookmark, name='bookmark-list'),
    path('bookmark/<int:post_id>/', bookmark, name='bookmark-setting'),

    path('<int:post_id>/comment/',
         CommentView.as_view({'post': 'create', 'get': 'list'}), name='comment-add'),
    path('comment/<int:pk>/',
         CommentView.as_view({'patch': 'partial_update', 'delete': 'destroy'}), name='comment-manage'),
]
