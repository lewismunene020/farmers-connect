from django.urls import path
from .views import (
    OrderDetailAPIView,
    CustomerOrdersAPIView,
    FarmerOrdersAPIView,
    OrderUpdateAPIView,
    OrderDeleteAPIView,
    OrderCreateAPIView,
    OrderListAPIView,
    RecommendedOrdersByCountyView,
    RecommendedOrdersView,
)

urlpatterns = [
    path('api/order/<int:pk>/', OrderDetailAPIView.as_view(), name='order-detail'),
    path('api/orders/customer/<int:customer_id>/', CustomerOrdersAPIView.as_view(), name='customer-orders'),
    path('api/orders/farmer/<int:farmer_id>/', FarmerOrdersAPIView.as_view(), name='farmer-orders'),
    path('api/order/<int:pk>/update/', OrderUpdateAPIView.as_view(), name='order-update'),
    path('api/order/<int:pk>/delete/', OrderDeleteAPIView.as_view(), name='order-delete'),
    path('api/order/create/', OrderCreateAPIView.as_view(), name='order-create'),
    path('api/orders/', OrderListAPIView.as_view(), name='order-list'),
    path('api/orders/recommended/all/<int:farmer_id>', RecommendedOrdersView.as_view(), name='recommended_orders'),
    path('api/orders/recommended/county/<int:farmer_id>/', RecommendedOrdersByCountyView.as_view(), name='recommended_orders_by_county'),
]
