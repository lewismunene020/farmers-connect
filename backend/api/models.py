from django.db import models

class Category(models.Model):
    category_id = models.AutoField(primary_key=True)
    category_name = models.CharField(max_length=100)

    def __str__(self):
        return self.category_name
    def products(self):
        return Product.objects.filter(category=self)

class Product(models.Model):
    product_id = models.AutoField(primary_key=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    product_name = models.CharField(max_length=100)
    unit = models.CharField(max_length=20)

    def __str__(self):
        return self.product_name

class County(models.Model):
    county_id = models.AutoField(primary_key=True)
    county_name = models.CharField(max_length=100)

    def __str__(self):
        return self.county_name

class SubCounty(models.Model):
    subcounty_id = models.AutoField(primary_key=True)
    county = models.ForeignKey(County, on_delete=models.CASCADE)
    subcounty_name = models.CharField(max_length=100)

    def __str__(self):
        return self.subcounty_name