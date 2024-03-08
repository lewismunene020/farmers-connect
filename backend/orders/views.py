from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.request import Request
from .models import Order
from api.models import Product
from farms.models import Farm
from .serializers import OrderSerializer, CreateOrderSerializer, ProductSerializer
from .serializers import MostSoughtProductSerializer
from .utils import get_most_ordered_product 
from rest_framework.views import APIView

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

class RecommendedOrdersView(generics.ListAPIView):
    serializer_class = OrderSerializer
    permission_classes = []

    def get_queryset(self):
        farmer_id = self.kwargs['farmer_id']
        farms = Farm.objects.filter(farmer_id=farmer_id)
        product_ids = [farm.product_id for farm in farms]
        recommended_orders = Order.objects.filter(status='unassigned', product_id__in=product_ids)
        return recommended_orders

class MostOrderedProductView(APIView):
    serializer_class = ProductSerializer
    permission_classes = []
    authentication_classes = []

    def get(self, request:Request, *args, **kwargs):
        try:
            num=request.query_params.get('num')
            if not num:
                num = 2
            num = int(num)
            products = []
            # Get the product with the most orders
            most_ordered_product_ids = get_most_ordered_product(num)
            for id in most_ordered_product_ids:
                pk = id[0]
                product = Product.objects.get(pk=pk)
                products.append(product)

            serializer= MostSoughtProductSerializer(products, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
            # else:
            #     return Response({'error': 'No product found.'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


