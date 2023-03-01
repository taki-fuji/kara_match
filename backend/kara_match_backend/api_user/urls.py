"""
api_userのurls.py
kara_match_backend/urls.pyからincludeをしている
なので実際にアクセスする時は"api/user/***/となる
"""

from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter

app_name = 'user'

router = DefaultRouter()
router.register('profile', views.ProfileViewSet)
router.register('approval', views.FriendRequestViewSet)
router.register('song', views.SongView)

urlpatterns = [
    path('create/', views.CreateUserView.as_view(), name='create'),
    path('myprofile/', views.MyProfileListView.as_view(), name='myprofile'),
    path('mysong/', views.MySongView.as_view(), name='mysong'),
    path('', include(router.urls))
]
