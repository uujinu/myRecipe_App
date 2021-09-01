from .models import User
from django.db import transaction
from rest_framework import serializers
from dj_rest_auth.registration.serializers import RegisterSerializer
from django.utils.translation import gettext_lazy as _


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
