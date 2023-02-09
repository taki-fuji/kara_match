from django.contrib import admin
from django.urls import path, include
from rest_framework.authtoken import views
from django.conf import settings  # settings.pyをimport
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('authen/', views.obtain_auth_token),  # rest_frameworkが持っているauthView を使う
    path('api/user/', include('api_user.urls')),  # api_userのurls.pyはapi/userから入る
]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)  # settings.pyで設定したmediaURLを設定

