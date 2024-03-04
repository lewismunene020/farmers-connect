from rest_framework import generics, status
from rest_framework.response import Response
from .models import Order
from .serializers import OrderSerializer, CreateOrderSerializer

class OrderDetailAPIView(generics.RetrieveAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = []

class OrderCreateAPIView(generics.CreateAPIView):
    serializer_class = CreateOrderSerializer
    permission_classes = []

    def perform_create(self, serializer):
        serializer.save(customer=self.request.user)

class OrderListAPIView(generics.ListAPIView):
    serializer_class = OrderSerializer
    permission_classes = []

    def get_queryset(self):
        queryset = Order.objects.all()
        status_param = self.request.query_params.get('status', None)
        if status_param:
            queryset = queryset.filter(status=status_param)
        return queryset

class CustomerOrdersAPIView(generics.ListCreateAPIView):
    serializer_class = OrderSerializer
    permission_classes = []

    def get_queryset(self):
        customer_id = self.kwargs.get('customer_id')
        return Order.objects.filter(customer_id=customer_id)

class FarmerOrdersAPIView(generics.ListAPIView):
    serializer_class = OrderSerializer
    permission_classes = []

    def get_queryset(self):
        farmer_id = self.kwargs.get('farmer_id')
        return Order.objects.filter(farmer_id=farmer_id)

class OrderUpdateAPIView(generics.UpdateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = []

class OrderDeleteAPIView(generics.DestroyAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = []
