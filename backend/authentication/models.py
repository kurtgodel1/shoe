#from django.contrib.auth.models import User
from django.db import models


# Create your models here.
class Profile(models.Model):
    user = models.OneToOneField('auth.User', on_delete=models.CASC D, related_name='profile')
    bio = models.TextField(blank=True, null=True)
    # Add more fields as needed.

def __str__(self):
    return self.user.get_full_name()