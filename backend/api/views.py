import logging
import numpy as np
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from silk.profiling.profiler import silk_profile


# from django.core.cache import cache
# cache.set('my_key', 'Hello, World!', 30)  # Set a value in the cache
# print(cache.get('my_key'))  # Retrieve and print the value

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


@silk_profile(name='Calculate Power Function')
def calculate_power_function(request):
    logger.info("calculate_power_function called")
    n = request.GET.get('n', default=1)  # Default to 1 if not provided
    n = int(n)  # Convert to integer
    x_values = np.arange(-10, 11, 1)
    y_values = np.power(x_values, n)
    data = {"x": x_values.tolist(), "y": y_values.tolist()}
    return JsonResponse(data)

# api/views.py


class SurfaceGraphDataView(APIView):

    @silk_profile(name='Surface Graph Data View')
    def get(self, request, format=None):
        logger.info("SurfaceGraphDataView get called")
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
