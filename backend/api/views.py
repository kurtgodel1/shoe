from django.shortcuts import render
from django.http import JsonResponse
import numpy as np

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

