from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    # Add any additional fields here
    # Example: Adding a bio field
    bio = models.TextField(null=True, blank=True)

    # You can also override methods or add new methods if needed
