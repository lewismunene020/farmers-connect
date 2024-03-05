from django.urls import path
from .views import BidDetailAPIView, BidCreateAPIView, BidListAPIView

urlpatterns = [
    path('bid/<int:pk>/', BidDetailAPIView.as_view(), name='bid-detail'),
    path('bid/<int:pk>/update/', BidDetailAPIView.as_view(), name='bid-update'),
    path('bid/<int:pk>/delete/', BidDetailAPIView.as_view(), name='bid-delete'),
    path('bid/create/', BidCreateAPIView.as_view(), name='bid-create'),
    path('bids/', BidListAPIView.as_view(), name='bid-list'),
]
