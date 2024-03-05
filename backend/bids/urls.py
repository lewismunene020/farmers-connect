from django.urls import path
from .views import BidDetailAPIView, BidCreateAPIView, BidListAPIView

urlpatterns = [
    path('api/bid/<int:pk>/', BidDetailAPIView.as_view(), name='bid-detail'),
    path('api/bid/<int:pk>/update/', BidDetailAPIView.as_view(), name='bid-update'),
    path('api/bid/<int:pk>/delete/', BidDetailAPIView.as_view(), name='bid-delete'),
    path('api/bid/create/', BidCreateAPIView.as_view(), name='bid-create'),
    path('api/bids/', BidListAPIView.as_view(), name='bid-list'),
]
