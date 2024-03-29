from rest_framework import serializers
from .models import Category, Product, County, SubCounty



class CategorySerializer(serializers.ModelSerializer):
    # products = ProductSerializer(many=True, read_only=True)

    class Meta:
        model = Category
        # fields = ['category_id', 'category_name', 'products']
        fields = ['category_id', 'category_name']


class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer(many=False, read_only=True)
    class Meta:
        model = Product
        fields = ['product_id', 'category', 'product_name', 'unit']

class CountySerializer(serializers.ModelSerializer):
    subcounties = serializers.SerializerMethodField("get_subcounties")
    class Meta:
        model = County
        fields = ['county_id', 'county_name' ,"subcounties"]
    
    def get_subcounties(self, obj):
        subcounties = SubCounty.objects.filter(county=obj)
        return SubCountySerializer(subcounties, many=True).data

class SubCountySerializer(serializers.ModelSerializer):
    class Meta:
        model = SubCounty
        fields = ['subcounty_id', 'county', 'subcounty_name']