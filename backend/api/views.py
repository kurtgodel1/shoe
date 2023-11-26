from django.shortcuts import render
from django.http import JsonResponse
import numpy as np
from rest_framework.views import APIView
from rest_framework.response import Response
import numpy as np
from .serializers import GraphDataSerializer


def calculate_power_function(request):
    # Get the 'n' parameter from the request
    n = request.GET.get('n', default=1)  # Default to 1 if not provided
    n = int(n)  # Convert to integer

    # Define a range of x values
    x_values = np.arange(-10, 11, 1)
    y_values = np.power(x_values, n)

    # Convert to list for JSON serialization
    data = {"x": x_values.tolist(), "y": y_values.tolist()}
    return JsonResponse(data)

# api/views.py


class SurfaceGraphDataView(APIView):
    def get(self, request, format=None):
        x = np.linspace(-5, 5, 100)
        y = np.linspace(-5, 5, 100)
        X, Y = np.meshgrid(x, y)
        Z = np.sin(np.sqrt(X**2 + Y**2))

        data = {
            'x': X.tolist(),
            'y': Y.tolist(),
            'z': Z.tolist(),
        }

        serializer = GraphDataSerializer(data)
        return Response(serializer.data)
