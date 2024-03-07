from rest_framework import generics, status
from rest_framework.exceptions import ValidationError
from rest_framework.views import APIView
from rest_framework.response import Response
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

class RejectBidView(APIView):
    permission_classes = []
    def post(self, request, bid_id):
        try:
            bid = Bid.objects.get(bid_id=bid_id)
            bid.status = 'rejected'
            bid.save()
            return Response({'message': 'Bid rejected successfully'}, status=status.HTTP_200_OK)
        except Bid.DoesNotExist:
            return Response({'error': 'Bid not found'}, status=status.HTTP_404_NOT_FOUND)

class AcceptBidView(APIView):
    permission_classes = []
    def post(self, request, bid_id):
        try:
            bid = Bid.objects.get(bid_id=bid_id)
            bid.status = 'accepted'
            bid.save()

            # Update the corresponding order
            order = bid.order
            order.status = 'assigned'
            order.farmer = bid.farmer
            order.save()

            return Response({'message': 'Bid accepted successfully'}, status=status.HTTP_200_OK)
        except Bid.DoesNotExist:
            return Response({'error': 'Bid not found'}, status=status.HTTP_404_NOT_FOUND)