from django.db import models

class Category(models.Model):
    category_id = models.AutoField(primary_key=True)
    category_name = models.CharField(max_length=100)

    def __str__(self):
        return self.category_name

class Product(models.Model):
    product_id = models.AutoField(primary_key=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    product_name = models.CharField(max_length=100)
    unit = models.CharField(max_length=20)

    def __str__(self):
        return self.product_name
