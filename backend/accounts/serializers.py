from .models import User
from django.db import transaction
from rest_framework import serializers
from dj_rest_auth.registration.serializers import RegisterSerializer
from dj_rest_auth.serializers import LoginSerializer
from django.utils.translation import gettext_lazy as _
from rest_framework.exceptions import ValidationError
from rest_framework_simplejwt.exceptions import InvalidToken
from rest_framework_simplejwt.serializers import TokenRefreshSerializer


class CustomUserDetailSerializer(serializers.ModelSerializer):
    class Meta:
        extra_fields = []
        if hasattr(User, 'USERNAME_FIELD'):
            extra_fields.append(User.USERNAME_FIELD)
        if hasattr(User, 'EMAIL_FIELD'):
            extra_fields.append(User.EMAIL_FIELD)
        if hasattr(User, 'nickname'):
            extra_fields.append('nickname')
        if hasattr(User, 'profile_image'):
            extra_fields.append('profile_image')
        model = User
        fields = ('pk', *extra_fields)
        read_only_fields = ('email',)


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('pk', 'username', 'email', 'nickname', 'profile_image')


class CustomRegisterSerializer(RegisterSerializer):

    profile_image = serializers.ImageField(required=False)

    # Define transaction.atomic to rollback the save operation in case of error
    @transaction.atomic
    def save(self, request):
        user = super().save(request)
        user.profile_image = request.data.get('profile_image')
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


class CookieTokenRefreshSerializer(TokenRefreshSerializer):
    refresh = None

    def validate(self, attrs):
        attrs['refresh'] = self.context['request'].COOKIES.get('refresh_token')
        if attrs['refresh']:
            return super().validate(attrs)
        else:
            raise InvalidToken(
                'No valid token found in cookie \'refresh_token\'')
