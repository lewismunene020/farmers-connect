from rest_framework import generics, status
from rest_framework.exceptions import ValidationError
from .models import Bid
from .serializers import BidSerializer, CreateBidSerializer
from orders.models import Order
from farms.models import Farm

class BidDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Bid.objects.all()
    serializer_class = BidSerializer
    permission_classes = []
    lookup_url_kwarg = 'pk'

class BidCreateAPIView(generics.CreateAPIView):
    serializer_class = CreateBidSerializer
    permission_classes = []

    def perform_create(self, serializer):
        order_id = self.request.data.get('order')
        farmer = self.request.user

        # Check if the farmer has a farm producing the product in the order
        order = Order.objects.get(pk=order_id)
        product_id = order.product_id.product_id

        if not Farm.objects.filter(farmer=farmer, product_id=product_id).exists():
            raise ValidationError("You must have a farm producing this product to make a bid.")

        serializer.save(farmer=farmer)

class BidListAPIView(generics.ListAPIView):
    serializer_class = BidSerializer
    permission_classes = []

    def get_queryset(self):
        queryset = Bid.objects.all()
        order_id = self.request.query_params.get('order_id')
        farmer_id = self.request.query_params.get('farmer_id')

        if order_id:
            queryset = queryset.filter(order=order_id)
        if farmer_id:
            queryset = queryset.filter(farmer=farmer_id)

        return queryset
