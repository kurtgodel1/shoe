from rest_framework.views import APIView
from rest_framework.responses import Response
from django.contrib.auth models import User
from rest_framework.authentication import token_authentication, token_authentication_classes
from django.contrib.auth forms import UserCreationForm

class UserRegistrationView(APIView):
    def post(self, request):
        form = UserCreationForm(request.data)
        if form.is_valid():
            user = form.save()
            return Response({'username': user.username, 'id': user.id}, status=201)
        return Response(form.errors, status=400)