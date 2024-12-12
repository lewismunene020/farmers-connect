from rest_framework import generics
from .models import Category, Product, County, SubCounty
from .serializers import CategorySerializer, ProductSerializer, CountySerializer, SubCountySerializer

# Views for categories and products

class CategoryList(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = []

class ProductList(generics.ListAPIView):

    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = []
    authentication_classes = []

class ProductsByCategory(generics.ListAPIView):
    serializer_class = ProductSerializer
    permission_classes = []

    def get_queryset(self):
        category_id = self.kwargs['category_id']
        return Product.objects.filter(category_id=category_id)

# Views for counties and subcounties

class CountyList(generics.ListAPIView):
    queryset = County.objects.all()
    serializer_class = CountySerializer
    permission_classes = []

class SubCountyList(generics.ListAPIView):
    queryset = SubCounty.objects.all()
    serializer_class = SubCountySerializer
    permission_classes = []

class SubCountyByCounty(generics.ListAPIView):
    serializer_class = SubCountySerializer
    permission_classes = []

    def get_queryset(self):
        county_id = self.kwargs['county_id']
        return SubCounty.objects.filter(county_id=county_id)