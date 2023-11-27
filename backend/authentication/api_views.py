from django.contrib.auth import authenticate, logout
from rest_framework.views import APIView
from rest_framework.responses import Response
from django.contrib.auth.models import User
from .api_views import UserSerializer


# Logout View
class LogoutView(APIView):
    def post(self, request):
        logout(request)
        return Response(status=204)
