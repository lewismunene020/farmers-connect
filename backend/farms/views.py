from rest_framework import generics
from .models import Farm
from .serializers import FarmSerializer

class FarmCreateAPIView(generics.CreateAPIView):
    queryset = Farm.objects.all()
    serializer_class = FarmSerializer
    permission_classes = []

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
    queryset = Farm.objects.all()
    serializer_class = FarmSerializer
    permission_classes = []
