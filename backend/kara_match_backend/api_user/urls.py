"""
api_userのurls.py
kara_match_backend/urls.pyからincludeをしている
なので実際にアクセスする時は"api/user/***/となる
"""

from django.urls import path, include
from rest_framework.routers import DefaultRouter

app_name = 'user'

router = DefaultRouter()

urlpatterns = [
    path('', include(router.urls))
]