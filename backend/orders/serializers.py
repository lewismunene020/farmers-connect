from rest_framework import serializers
from .models import Order
from api.models import Product, County, SubCounty
from accounts.models import User

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

class FarmerSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class OrderSerializer(serializers.ModelSerializer):
    customer = CustomerSerializer()
    product_id = ProductSerializer()
    county_id = CountySerializer()
    subcounty_id = SubCountySerializer()
    farmer = FarmerSerializer()

    class Meta:
        model = Order
        fields = '__all__'
        read_only_fields = ['customer']

class CreateOrderSerializer(serializers.ModelSerializer):

    class Meta:
        model = Order
        fields = '__all__'
        read_only_fields = ['customer']
