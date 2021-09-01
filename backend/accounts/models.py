from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.base_user import BaseUserManager
from django.utils.translation import ugettext_lazy as _


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
    platform = models.CharField(
        '소셜플랫폼', max_length=10, choices=PLATFORM_CHOICES, blank=True, null=True)
    social_id = models.CharField('소셜아이디', max_length=50, blank=True, null=True)

    objects = CustomUserManager()

    USERNAME_FIELD = 'username'

    is_verified = models.BooleanField('인증여부', default=False)

    def __str__(self):
        return self.username
