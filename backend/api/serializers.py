from rest_framework import serializers
from .models import Category, Product, County, SubCounty

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['product_id', 'category', 'product_name', 'unit']

class CategorySerializer(serializers.ModelSerializer):
    products = ProductSerializer(many=True, read_only=True)

    class Meta:
        model = Category
        fields = ['category_id', 'category_name', 'products']

class CountySerializer(serializers.ModelSerializer):
    class Meta:
        model = County
        fields = ['county_id', 'county_name']

class SubCountySerializer(serializers.ModelSerializer):
    class Meta:
        model = SubCounty
        fields = ['subcounty_id', 'county', 'subcounty_name']