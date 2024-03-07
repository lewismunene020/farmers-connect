from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.models import BaseUserManager
from uuid import uuid4
from django.db.models  import Q
from rest_framework.request import Request

# Create models for the application.
def  generate_unique_id():
    return uuid4().hex

class UserManager(BaseUserManager):
    def create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError("Users must have an email address")
        if User.objects.filter(email=email).exists():
            raise ValueError("Email Already Exists")
        if not password:
            raise ValueError("Users must have a password")
        user: User = User.objects.create(
            email=email, password=password, **extra_fields)
        user.save()
        return user

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        if not email:
            raise ValueError("Users must have an email address")
        if not password:
            raise ValueError("Users must have a password")
        user: User = self.create_user(email, password, **extra_fields)

        return user


class User(AbstractUser):
    id = models.AutoField(primary_key=True)
    email = models.EmailField(unique=True , null=True , blank=True)
    profile_picture = models.ImageField(upload_to="profile_pictures", null=True, blank=True)
    verification_code = models.CharField(max_length=255, null=True, blank=True)
    verification_token = models.CharField(
        max_length=255, null=True, blank=True)
    is_farmer = models.BooleanField(default=False)
    is_customer = models.BooleanField(default=True)
    
    groups = models.ManyToManyField(
        'auth.Group',
        related_name='custom_user_groups',
        blank=True
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='custom_user_permissions',
        blank=True
    )

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["password"]

    objects = UserManager()

    class Meta:
        db_table = "user"
        verbose_name = "User"
        verbose_name_plural = "Users"

    def get_profile_picture(self, request: Request):
        if self.profile_picture:
            return request.build_absolute_uri(self.profile_picture.url)
        return None 
    
    def save(self, *args, **kwargs):

        if not self.__class__.objects.filter(email=self.email).exists():
            if self.username:
                # use django Q to check  if username  or  email exists
                username_exists = self.__class__.objects.filter(Q(username=self.username) | Q(email=self.email)).last()
                if username_exists:
                    new_username= f"{self.username}{username_exists.pk + 1}"
                    print(f"===========> New  Username  is {new_username}")
                    self.username = new_username
            else:
                self.username = self.email.split("@")[0]
                username_exists = self.__class__.objects.filter(Q(username=self.username) | Q(email=self.email)).last()
                if username_exists:
                    new_username= f"{self.username}{username_exists.pk + 1}"
                    print(f"===========> New  Username  is {new_username}")
                    self.username = new_username
            

        # if the  password is  not   encrypted we encrypt it before saving
        if self.password and not self.password.startswith("pbkdf2_sha256"):
            self.set_password(self.password)
        if  not  self.password:
            self.set_password(generate_unique_id())
        return super().save(*args, **kwargs)

    
class ContactMessage(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    subject = models.CharField(max_length=100)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

