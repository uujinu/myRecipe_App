from allauth.socialaccount.adapter import DefaultSocialAccountAdapter


class SocialAccountAdapter(DefaultSocialAccountAdapter):

    def is_auto_signup_allowed(self, request, sociallogin):
        return True

    def save_user(self, request, sociallogin, form):
        user = super().save_user(request, sociallogin, form=form)
        user.is_verified = True
        user.platform = sociallogin.account.provider
        user.social_id = sociallogin.account.uid

        if sociallogin.account.provider == 'naver':
            username = sociallogin.account.extra_data.get('name')
            email = sociallogin.account.extra_data.get('email')
            user.username = username
            user.email = email

        user.save()
        return user
