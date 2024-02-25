from django.urls import path
from .views import (
    FarmDetailAPIView,
    FarmerFarmsAPIView,
    FarmUpdateAPIView,
    FarmDeleteAPIView,
    FarmListAPIView,
)

urlpatterns = [
    path('api/farm/<int:pk>/', FarmDetailAPIView.as_view(), name='farm-detail'),
    path('api/farms/farmer/<int:farmer_id>/', FarmerFarmsAPIView.as_view(), name='farmer-farms'),
    path('api/farm/<int:pk>/update/', FarmUpdateAPIView.as_view(), name='farm-update'),
    path('api/farm/<int:pk>/delete/', FarmDeleteAPIView.as_view(), name='farm-delete'),
    path('api/farms/', FarmListAPIView.as_view(), name='farm-list'),
]
