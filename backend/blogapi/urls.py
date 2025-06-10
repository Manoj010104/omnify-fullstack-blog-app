# backend/blogapi/urls.py

from django.urls import path
from .views import BlogListCreate, BlogDetailUpdateDelete, UserRegister

urlpatterns = [
    # Authentication (Register)
    path('auth/register/', UserRegister.as_view(), name='register'), # This path is correct

    # Blog CRUD (CHANGE THESE PATHS)
    path('blogs/', BlogListCreate.as_view(), name='blog-list-create'), # Now explicitly /api/blogs/
    path('blogs/<int:pk>/', BlogDetailUpdateDelete.as_view(), name='blog-detail-update-delete'), # Now explicitly /api/blogs/<id>/
]