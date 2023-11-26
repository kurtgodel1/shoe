from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework.responses import Response
from django.contrib.auth.models import User
from .serializers import UserSerializer
from django.contrib.auth import login
from django.contrib.auth forms import AuthenticationForm


# Login View
class LoginView(APIView):
    def post(self, request):
        form = AuthenticationForm(request.data)
        if form.is_valid():
            user = form.get_user()
            authenticate(request, user)
            serializer = UserSerializer(user)
            return Response(serializer.data)
        return Response(form.errors, 200)