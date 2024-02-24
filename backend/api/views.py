from rest_framework import generics
from .models import Category, Product
from .serializers import CategorySerializer, ProductSerializer

class CategoryList(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = []

class ProductList(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = []

class ProductsByCategory(generics.ListAPIView):
    serializer_class = ProductSerializer
    permission_classes = []

    def get_queryset(self):
        category_id = self.kwargs['category_id']
        return Product.objects.filter(category_id=category_id)