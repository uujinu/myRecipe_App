from .models import User
from django.db import transaction
from rest_framework import serializers
from dj_rest_auth.registration.serializers import RegisterSerializer
from dj_rest_auth.serializers import LoginSerializer
from django.utils.translation import gettext_lazy as _
from rest_framework.exceptions import ValidationError


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('pk', 'username', 'email')


class CustomRegisterSerializer(RegisterSerializer):
    profile_image = serializers.ImageField(required=False, use_url=True)

    # Define transaction.atomic to rollback the save operation in case of error
    @transaction.atomic
    def save(self, request):
        user = super().save(request)
        user.profile_image = self.data.get('profile_image')
        user.save()
        return user


class CustomLoginSerializer(LoginSerializer):
    username = None

    @staticmethod
    def validate_email_verification_status(user):
        email_address = user.emailaddress_set.get(email=user.email)
        if not email_address.verified:
            raise serializers.ValidationError(_('E-mail is not verified.'))

    def validate(self, attrs):
        super(CustomLoginSerializer, self).validate(attrs)
        email = attrs.get('email', '')
        password = attrs.get('password', '')
        user = self.get_auth_user(None, email, password)

        if not user:
            msg = _('Unable to log in with provided credentials.')
            raise serializers.ValidationError(msg)

        self.validate_auth_user_status(user)
        self.validate_email_verification_status(user)

        attrs['user'] = user
        return attrs


class EmailResendSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length=100, min_length=3)

    class Meta:
        model = User
        fields = ['email', ]

    def validate(self, attrs):
        email = attrs.get('email', '')
        try:
            User.objects.get(email=email)
            pass
        except:
            raise ValidationError(detail='해당 이메일로 가입된 계정이 존재하지 않습니다.')
        return super().validate(attrs)
