from django.urls import path
from .views import SurfaceGraphDataView, calculate_power_function

urlpatterns = [
        path('calculate_power_function/', calculate_power_function, name='calculate_power_function'),
        path('surface-graph-data/', SurfaceGraphDataView.as_view(), name='surface-graph-data'),

]