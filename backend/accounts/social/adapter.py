from allauth.socialaccount.adapter import DefaultSocialAccountAdapter
from allauth.account.utils import user_username


class SocialAccountAdapter(DefaultSocialAccountAdapter):

    def is_auto_signup_allowed(self, request, sociallogin):
        return True

    def save_user(self, request, sociallogin, form):
        user = super().save_user(request, sociallogin, form=form)
        user.is_verified = True
        user.platform = sociallogin.account.provider
        user.social_id = sociallogin.account.uid
        user.save()
        return user

    def populate_user(self, request, sociallogin, data):

        if sociallogin.account.provider == 'naver':
            username = sociallogin.account.extra_data.get('name')
            user = sociallogin.user
            user_username(user, username or "")
        return super().populate_user(request, sociallogin, data)
