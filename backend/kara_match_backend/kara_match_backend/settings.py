from pathlib import Path
import os
import dj_database_url
from decouple import config
from django.views.generic import TemplateView
from django.urls import re_path, include

from django.urls import path

CORS_ORIGIN_ALLOW_ALL = True  #

urlpatterns = [

    # Reactのすべての他のルート
    re_path(r'^.*$', TemplateView.as_view(template_name='index.html')),
]


# 追加
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')  # 任意のディレクトリ名に変更可能
# 追加 -ここまで

DATABASE_URL = config('DATABASE_URL')

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-y)0s2x%$8d&c1o^u&3spbit4=9q-cxkzf6jia)#46vq2z64w58'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True


# render デプロイ用に追加した
ALLOWED_HOSTS = ['https://kara-match.web.app', 'kara-match-backend.onrender.com', 'localhost', '127.0.0.1', 'kara-match-frontend.onrender.com']


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    # ここから自分で追記
    'rest_framework',
    'rest_framework.authtoken',
    'core.apps.CoreConfig',
    'api_user.apps.ApiUserConfig',
    'corsheaders',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',

    # ここから自分で追記
    'corsheaders.middleware.CorsMiddleware',
]

CORS_ORIGIN_WHITELIST = [
    "https://kara-match-frontend.onrender.com",
    "http://localhost:3000",
    "https://kara-match.web.app",
]

ROOT_URLCONF = 'kara_match_backend.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'kara_match_backend.wsgi.application'


# Database
# https://docs.djangoproject.com/en/4.0/ref/settings/#databases

# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.mysql', # 変更
#         'NAME': 'kara_match_database', # プロジェクトで使用するデータベース名
#         'USER': 'root', # パソコンにインストールしたMySQLのユーザー名
#         'PASSWORD': '', # 同上。そのパスワード
#     }
# }

# DATABASES設定をPostgreSQL用に変更
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'kara_match_database',  # データベース名
        'USER': 'kara_match_database_user',  # ユーザー名
        'PASSWORD': 'a1Oe8mNmdTiXt4WHIY6G1CTjovRbtxbu',  # パスワード
        'HOST': 'dpg-croi7gij1k6c739hvimg-a',  # ホスト名
        'PORT': '5432',  # ポート（デフォルト: 5432）
    }
}
# Render用に環境変数 DATABASE_URL が設定されている場合、それを使用
DATABASE_URL = None  # 環境変数を明示的に無効にする（または削除）

DATABASES = {
    'default': dj_database_url.config(default='postgresql://kara_match_database_user:a1Oe8mNmdTiXt4WHIY6G1CTjovRbtxbu@dpg-croi7gij1k6c739hvimg-a.oregon-postgres.render.com/kara_match_database')
}

if DATABASE_URL:
    DATABASES['default'] = dj_database_url.config(default=DATABASE_URL)


# Database configuration
# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.postgresql',
#         'NAME': 'kara-match',  # データベース名
#         'USER': 'postgres',  # ユーザー名
#         'PASSWORD': 'yHMtycDsdoMfkGZ',  # パスワード
#         'HOST': 'kara-match.internal',  # ホスト名
#         'PORT': '5432',  # ポート（デフォルト: 5432）
#     }
# }
#
# # DATABASE_URLが設定されている場合、それを優先して使用
# DATABASE_URL = config('DATABASE_URL', default='postgres://postgres:yHMtycDsdoMfkGZ@kara-match.flycast:5432/kara-match')
#
# if DATABASE_URL:
#     DATABASES['default'] = dj_database_url.config(default=DATABASE_URL)
#

# DATABASES設定をPostgreSQL用に変更 -ここまで

# Password validation
# https://docs.djangoproject.com/en/4.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.0/topics/i18n/

LANGUAGE_CODE = 'ja'

TIME_ZONE = 'Asia/Tokyo'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.0/howto/static-files/

STATIC_URL = 'static/'

# Default primary key field type
# https://docs.djangoproject.com/en/4.0/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'


# メディアの入っているディレクトリを追記
MEDIA_ROOT = os.path.join(BASE_DIR, '_media')
MEDIA_URL = '/media/'

# userモデルをカスタマイズしていくという宣言
AUTH_USER_MODEL = 'core.User'
