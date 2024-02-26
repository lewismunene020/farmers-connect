from django.db import models
from accounts.models  import User
from api.models import Product, County, SubCounty

class Farm(models.Model):
    farm_id = models.AutoField(primary_key=True)
    farmer = models.ForeignKey(User, on_delete=models.CASCADE)
    product_id = models.ForeignKey(Product, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    product_image1 = models.ImageField(upload_to='images/')
    product_image2 = models.ImageField(upload_to='images/')
    location_county_id = models.ForeignKey(County, on_delete=models.CASCADE)
    location_subcounty_id = models.ForeignKey(SubCounty, on_delete=models.CASCADE)
    quantity_available = models.PositiveIntegerField()
    price_per_unit = models.DecimalField(max_digits=10, decimal_places=2)
