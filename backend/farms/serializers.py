from rest_framework import serializers
from .models import Farm
from api.models import Product, County, SubCounty

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class CountySerializer(serializers.ModelSerializer):
    class Meta:
        model = County
        fields = '__all__'

class SubCountySerializer(serializers.ModelSerializer):
    class Meta:
        model = SubCounty
        fields = '__all__'

class FarmSerializer(serializers.ModelSerializer):
    product_id = ProductSerializer()
    location_county_id = CountySerializer()
    location_subcounty_id = SubCountySerializer()

    class Meta:
        model = Farm
        fields = '__all__'
        read_only_fields = ['farmer']

class FarmCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Farm
        fields = '__all__'
        read_only_fields = ['farmer']
