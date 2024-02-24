from django.urls import path
from .views import CategoryList, ProductList, ProductsByCategory, CountyList, SubCountyList, SubCountyByCounty

urlpatterns = [
    path('api/categories/', CategoryList.as_view(), name='category-list'),
    path('api/products/', ProductList.as_view(), name='product-list'),
    path('api/products/category/<int:category_id>/', ProductsByCategory.as_view(), name='products-by-category'),
    path('api/counties/', CountyList.as_view(), name='county-list'),
    path('api/subcounties/', SubCountyList.as_view(), name='subcounty-list'),
    path('api/subcounties/county/<int:county_id>/', SubCountyByCounty.as_view(), name='subcounty-by-county'),
]
