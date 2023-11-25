from django.urls import path
from .views import calculate_power_function

urlpatterns = [
        path('calculate_power_function/', calculate_power_function, name='calculate_power_function'),
]