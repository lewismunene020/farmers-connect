from django.urls import path
from .views import (
    OrderDetailAPIView,
    CustomerOrdersAPIView,
    FarmerOrdersAPIView,
    OrderUpdateAPIView,
    OrderDeleteAPIView,
    OrderCreateAPIView,
    OrderListAPIView,
)

urlpatterns = [
    path('api/order/<int:pk>/', OrderDetailAPIView.as_view(), name='order-detail'),
    path('api/orders/customer/<int:customer_id>/', CustomerOrdersAPIView.as_view(), name='customer-orders'),
    path('api/orders/farmer/<int:farmer_id>/', FarmerOrdersAPIView.as_view(), name='farmer-orders'),
    path('api/order/<int:pk>/update/', OrderUpdateAPIView.as_view(), name='order-update'),
    path('api/order/<int:pk>/delete/', OrderDeleteAPIView.as_view(), name='order-delete'),
    path('api/order/create/', OrderCreateAPIView.as_view(), name='order-create'),
    path('api/orders/', OrderListAPIView.as_view(), name='order-list'),
]
