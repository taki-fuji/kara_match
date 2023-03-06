from django.shortcuts import render
from rest_framework import generics, authentication, permissions
from . import serializers
from core.models import Profile, FriendRequest, Song
from django.db.models import Q  # フィルタリングする時に使う
from rest_framework import viewsets
from rest_framework.exceptions import ValidationError
from rest_framework import status
from rest_framework.response import Response
from core import custompermissions


# userを新規作成するためのview
class CreateUserView(generics.CreateAPIView):
    serializer_class = serializers.UserSerializer  # ここでuserのシリアライザーを割り当てるだけで新規userのviewを作れる


class FriendRequestViewSet(viewsets.ModelViewSet):  # ModelViewSetはCRUDの動き全てに対応できる
    queryset = FriendRequest.objects.all()
    serializer_class = serializers.FriendRequestSerializer
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        return self.queryset.filter(Q(askTo=self.request.user) | Q(askFrom=self.request.user))

    def perform_create(self, serializer):
        try:
            serializer.save(askFrom=self.request.user)
        except:
            raise ValidationError("User can have only unique request")

    # def destroy(self, request, *args, **kwargs):  # おそらくここを消せばフレンドリクエストを消すことができる
    #     response = {'message': 'Delete is not allowed !'}
    #     return Response(response, status=status.HTTP_400_BAD_REQUEST)

    def partial_update(self, request, *args, **kwargs):
        response = {'message': 'Patch is not allowed !'}
        return Response(response, status=status.HTTP_400_BAD_REQUEST)


class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = serializers.ProfileSerializer
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = (permissions.IsAuthenticated, custompermissions.ProfilePermission)

    # custompermissions.pyでログインしているusrだけが書き換えられるようにする

    def perform_create(self, serializer):
        serializer.save(userPro=self.request.user)


class MyProfileListView(generics.ListAPIView):
    queryset = Profile.objects.all()
    serializer_class = serializers.ProfileSerializer
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        return self.queryset.filter(userPro=self.request.user)


# songsなどのように全ての歌をまとめて保存するやつを作り忘れてるから今度作る(完了)
class SongView(viewsets.ModelViewSet):  # ModelViewSetはCRUDに対応
    queryset = Song.objects.all()
    serializer_class = serializers.SongSerializer
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)  # custompermissions.ProfilePermissionを外したら歌を除去できるようになった

    # うまくCRUDができなかったら下記が原因になる
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class MySongView(generics.ListAPIView):
    queryset = Song.objects.all()
    serializer_class = serializers.SongSerializer
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)
