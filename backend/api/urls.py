from django.urls import path
from .views import CategoryList, ProductList, ProductsByCategory

urlpatterns = [
    path('api/categories/', CategoryList.as_view(), name='category-list'),
    path('api/products/', ProductList.as_view(), name='product-list'),
    path('api/products/category/<int:category_id>/', ProductsByCategory.as_view(), name='products-by-category'),

]
