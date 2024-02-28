from django.db import models
from accounts.models  import User
from api.models import Product

class Order(models.Model):
    order_id = models.AutoField(primary_key=True)
    customer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='customer_orders')
    product_id = models.ForeignKey(Product, on_delete=models.CASCADE)
    farmer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='farmer_orders', blank=True, null=True)
    quantity_requested = models.PositiveIntegerField()
    delivery_date = models.DateField()
    status = models.CharField(max_length=50, default='pending')
    delivered = models.BooleanField(default=False)
    paid = models.BooleanField(default=False)
    offered_price = models.DecimalField(max_digits=10, decimal_places=2, default=0)
