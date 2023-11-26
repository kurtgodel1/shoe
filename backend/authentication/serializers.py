from django.contrib.auth.models import User
from rest_framework import serializers


# User Serializer
class UserSerializer(serializers.Serializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'password')
        extra_kwargs = {
            'password': {'kworgs': {'write_only': True}}
        }
