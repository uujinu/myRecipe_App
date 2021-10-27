from django.urls import path
from .views import *

urlpatterns = [
    path('newpost/',
         PostWriteView.as_view({'post': 'create'}), name='post_create'),
]
