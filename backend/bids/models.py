from django.db import models
from accounts.models import User
from orders.models import Order

class Bid(models.Model):
    bid_id = models.AutoField(primary_key=True)
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    farmer = models.ForeignKey(User, on_delete=models.CASCADE, editable=False)
    price_per_unit = models.DecimalField(max_digits=10, decimal_places=2)
    delivery_date = models.DateField()
    status = models.CharField(max_length=10, default='pending')
