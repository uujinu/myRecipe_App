from allauth.account.adapter import DefaultAccountAdapter
from django.http import HttpRequest
from django.conf import settings
from .models import User


class AccountAdapter(DefaultAccountAdapter):

    def send_mail(self, template_prefix, email, context):
        return super(AccountAdapter, self).send_mail(template_prefix, email, context)

    def is_open_for_signup(self, request: HttpRequest):
        return getattr(settings, "ACCOUNT_ALLOW_REGISTRATION", True)

    def confirm_email(self, request, email_address):
        super().confirm_email(request, email_address)
        user = User.objects.get(email=email_address)
        user.is_verified = True
        user.save()
