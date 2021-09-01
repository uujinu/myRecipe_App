from allauth.account.models import EmailAddress
from dj_rest_auth.views import LoginView
from django.contrib import messages
from rest_framework.views import APIView
from .models import User
from rest_framework import generics, viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated
from .serializers import *
from rest_framework.response import Response
from rest_framework import status
from allauth.account.adapter import get_adapter
from rest_framework_simplejwt.token_blacklist.models import BlacklistedToken, OutstandingToken


class CustomLoginView(LoginView):
    serializer_class = CustomLoginSerializer


class ResendEmailView(generics.GenericAPIView):
    serializer_class = EmailResendSerializer
    permission_classes = [AllowAny, ]

    def _action_send(self, request, *args, **kwargs):
        email = request.POST["email"]
        email_address = EmailAddress.objects.get(email=email)
        get_adapter(request).add_message(
            request,
            messages.INFO,
            "account/messages/" "email_confirmation_sent.txt",
            {"email": email},
        )
        email_address.send_confirmation(request)

    def post(self, request):
        data = request.data
        serializer = self.serializer_class(data=data)
        serializer.is_valid(raise_exception=True)
        self._action_send(request)
        return Response({"success": "이메일이 전송되었습니다."}, status=status.HTTP_200_OK)


class LogoutAllView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        tokens = OutstandingToken.objects.filter(user_id=request.user.id)
        for token in tokens:
            t, _ = BlacklistedToken.objects.get_or_create(token=token)
        return Response(status=status.HTTP_205_RESET_CONTENT)


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (IsAuthenticated,)
