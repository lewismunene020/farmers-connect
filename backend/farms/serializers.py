from rest_framework import serializers
from .models import Farm

class FarmSerializer(serializers.ModelSerializer):
    # farmer = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Farm
        fields = '__all__'
        read_only_fields = ['farmer']
