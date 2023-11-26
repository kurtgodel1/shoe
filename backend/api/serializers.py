# api/serializers.py
from rest_framework import serializers

class GraphDataSerializer(serializers.Serializer):
    x = serializers.ListField(
        child=serializers.ListField(
            child=serializers.FloatField()
        )
    )
    y = serializers.ListField(
        child=serializers.ListField(
            child=serializers.FloatField()
        )
    )
    z = serializers.ListField(
        child=serializers.ListField(
            child=serializers.FloatField()
        )
    )
