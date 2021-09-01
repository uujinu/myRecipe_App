import os
from uuid import uuid4
from django.utils import timezone
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.base_user import BaseUserManager
import random
from random import choice
from string import ascii_letters
from django.utils.translation import ugettext_lazy as _
from imagekit.models.fields import ImageSpecField
from imagekit.processors import ResizeToFill


class CustomUserManager(BaseUserManager):
    def create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError(_('이메일을 입력하세요.'))
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError(_('Superuser must have is_staff=True.'))
        if extra_fields.get('is_superuser') is not True:
            raise ValueError(_('Superuser must have is_superuser=True.'))
        return self.create_user(email, password, **extra_fields)


def url(instance, filename):
    ymd_path = timezone.now().strftime('%Y/%m/%d')
    uuid_name = uuid4().hex
    extension = os.path.splitext(filename)[-1].lower()
    return '/profile/image/'.join([
        ymd_path,
        uuid_name + extension,
    ])


def generate_random_name():
    s = ''.join([choice(ascii_letters).lower() for i in range(5)])
    num = random.randrange(1000, 10000)
    return f'{s}{num}'


class User(AbstractUser):

    PLATFORM_CHOICES = (
        ('NAVER', 'Naver'),
        ('KAKAO', 'Kakao')
    )

    first_name = None
    last_name = None
    date_joined = None
    last_login = None

    email = models.EmailField('이메일', unique=True)
    username = models.CharField('이름', unique=True, max_length=20)
    nickname = models.CharField(
        '닉네임', max_length=20, unique=True, blank=True, default=generate_random_name)
    platform = models.CharField(
        '소셜플랫폼', max_length=10, choices=PLATFORM_CHOICES, blank=True, null=True)
    social_id = models.CharField('소셜아이디', max_length=50, blank=True, null=True)

    objects = CustomUserManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['profile_image', ]

    is_verified = models.BooleanField('인증여부', default=False)

    profile_image = models.ImageField(
        '프로필 사진', default='accounts/profile_basic.png', upload_to=url)
    profile_image_resize = ImageSpecField(source='profile_image', processors=[
                                          ResizeToFill(100, 100)], format='JPEG', options={'quality': 60})

    def __str__(self):
        return self.username

    def following_count(self):
        return self.following.count()

    def follower_count(self):
        return self.followers.count()


class Following(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='following')
    following_user = models.ForeignKey(
        User, related_name='followers', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'following'
        constraints = [
            models.UniqueConstraint(
                fields=['user', 'following_user'],  name="unique_followers")
        ]

    def __str__(self):
        return f"{self.user.nickname}님이 {self.following_user.nickname}님을 팔로우합니다."
