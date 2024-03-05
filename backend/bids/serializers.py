from rest_framework import serializers
from .models import Bid
from accounts.models import User
from orders.models import Order


class FarmerSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'

class CreateBidSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bid
        fields = ['bid_id', 'order', 'farmer', 'price_per_unit', 'delivery_date', 'status']
        read_only_fields = ['farmer']

class BidSerializer(serializers.ModelSerializer):
    farmer = FarmerSerializer()
    order = OrderSerializer()

    class Meta:
        model = Bid
        fields = '__all__'
