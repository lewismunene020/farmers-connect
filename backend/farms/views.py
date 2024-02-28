from rest_framework import generics
from .models import Farm
from .serializers import FarmSerializer, FarmCreateSerializer
from rest_framework.permissions import IsAuthenticated

class FarmCreateAPIView(generics.CreateAPIView):
    queryset = Farm.objects.all()
    serializer_class = FarmCreateSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(farmer=self.request.user)

class FarmDetailAPIView(generics.RetrieveAPIView):
    queryset = Farm.objects.all()
    serializer_class = FarmSerializer
    permission_classes = []

class FarmerFarmsAPIView(generics.ListAPIView):
    serializer_class = FarmSerializer
    permission_classes = []

    def get_queryset(self):
        farmer_id = self.kwargs.get('farmer_id')
        return Farm.objects.filter(farmer_id=farmer_id)

class FarmUpdateAPIView(generics.UpdateAPIView):
    queryset = Farm.objects.all()
    serializer_class = FarmSerializer
    permission_classes = []

class FarmDeleteAPIView(generics.DestroyAPIView):
    queryset = Farm.objects.all()
    serializer_class = FarmSerializer
    permission_classes = []

class FarmListAPIView(generics.ListAPIView):
    serializer_class = FarmSerializer
    permission_classes = []

    def get_queryset(self):
        queryset = Farm.objects.all()
        product_id = self.request.query_params.get('product_id')
        county_id = self.request.query_params.get('county_id')
        quantity_available = self.request.query_params.get('quantity_available')

        if product_id:
            queryset = queryset.filter(product_id=product_id)
        if county_id:
            queryset = queryset.filter(location_county_id=county_id)
        if quantity_available:
            queryset = queryset.filter(quantity_available__gt=quantity_available)

        return queryset
