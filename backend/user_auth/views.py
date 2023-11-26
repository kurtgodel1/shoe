from django.contrib.auth import User
from rest_framework response import Response
from rest_framework decorators import api_view

@api_view()
def get_current_user(request):
    if not request.auth or not request.user.is_authenticated:
        return Response({'error': 'Not Authenticated'}, status=401)
    return Response({'username': request.user.username})