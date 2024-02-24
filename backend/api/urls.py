from django.urls import path
from .views import CategoryList, ProductList

urlpatterns = [
    path('api/categories/', CategoryList.as_view(), name='category-list'),
    path('api/products/', ProductList.as_view(), name='product-list'),
]
