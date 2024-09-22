from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.conf import settings


# フロントエンドでアップロードされてくる画像ファイルをきれいなファイル名に直す関数
def upload_path(instance, filename):
    ext = filename.split('.')[-1]  # .で分けたファイル名の[-1]番目->つまり拡張子を抜き出す
    return '/'.join(['image', str(instance.userPro.id) + str(instance.nickName) + str(".") + ext])


class UserManager(BaseUserManager):
    # email形式のユーザーモデルにするためにオーバーライド
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('email is must')

        user = self.model(email=self.normalize_email(email), **extra_fields)
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, email, password):
        user = self.create_user(email, password)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)

        return user


class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=50, unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'email'

    def __str__(self):
        return self.email


class Profile(models.Model):
    nickName = models.CharField(max_length=20)
    # userProは一つのユーザーが一つのプロフィールを持てるようにする
    userPro = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        related_name='userPro',
        on_delete=models.CASCADE  # ユーザーの削除がされた時このモデルも削除される
    )
    created_on = models.DateTimeField(auto_now_add=True)
    # img = models.ImageField(blank=True, null=True, upload_to="_media/image")
    img = models.ImageField(blank=True, null=True, upload_to=upload_path)

    def __str__(self):
        return self.nickName


class FriendRequest(models.Model):
    # 1対多のフォーリンキー
    askFrom = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name='askFrom',
        on_delete=models.CASCADE
    )
    askTo = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name='askTo',
        on_delete=models.CASCADE
    )

    approved = models.BooleanField(default=False)

    class Meta:
        unique_together = (('askFrom', 'askTo'),)

    def __str__(self):
        return str(self.askFrom) + '----->' + str(self.askTo)


class Song(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name='user',
        on_delete=models.CASCADE
    )

    song_name = models.TextField(default="")  # 歌名(API:trackCensoredName)

    singer = models.TextField(default="")  # 歌手(API:artistName)

    artistId = models.IntegerField(default=0)  # id

    collectionId = models.IntegerField(default=0)  # id

    trackId = models.IntegerField(default=0)  # id

    created_on = models.DateTimeField(auto_now_add=True)  # 作成日付

    img_url = models.TextField(default="")  # 曲の画像を保存するモデルを作る

    def __str__(self):
        return self.song_name
