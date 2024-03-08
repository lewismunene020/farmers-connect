from rest_framework import serializers
from .models import Order
from api.models import Product, County, SubCounty
from accounts.models import User
from api.serializers import CategorySerializer

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class MostSoughtProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer(many=False)
    count = serializers.SerializerMethodField()
    class Meta:
        model = Product
        fields = [
        "product_id",
        "product_name",
        "unit",
        "category",
        "count",
        ]

    def get_count(self, obj):
        return Order.objects.filter(product_id=obj.product_id).count()

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
