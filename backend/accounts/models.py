from django.db import models
from django.contrib.auth.models import AbstractUser



# class User(AbstractUser):
#     email = models.EmailField(unique=True, max_length=254)
#     USERNAME_FIELD = "email"

#     def __str__(self):
#         return self.email
    
# class ContactMessage(models.Model):
#     name = models.CharField(max_length=100)
#     email = models.EmailField()
#     subject = models.CharField(max_length=100)
#     message = models.TextField()
#     created_at = models.DateTimeField(auto_now_add=True)

