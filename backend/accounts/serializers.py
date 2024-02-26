from rest_framework import serializers
from rest_framework.authtoken.models import Token
from rest_framework.validators import ValidationError

from .models import User 
from django.db.models import  Q

class SignUpSerializer(serializers.ModelSerializer):
    # email = serializers.CharField(max_length=800)
    # username = serializers.CharField(max_length=45)
    password = serializers.CharField(min_length=1, write_only=True)


    class Meta:
        model = User
        fields = ["email", "username", "password"]
        

    def validate(self, attrs):
        if User.objects.filter(email=attrs["email"]).exists():
            raise ValidationError("Email has already been used")
       
        return super().validate(attrs) 
    
    def validate_username(self , username):
        if User.objects.filter(username=username).exists():
            raise ValidationError("Username has already been used")
        return username

    
    def create(self, validated_data):
        password = validated_data.pop("password")

        user = super().create(validated_data)
        print(user)
        user.set_password(password)
        user.save()
        return user


class LoginSerializer(serializers.Serializer):
    email = serializers.CharField(max_length=80)
    password = serializers.CharField(min_length=1, write_only=True)
    username = serializers.CharField(max_length=45, required=False)


    def __init__(self, *args, **kwargs):
        self.user = None
        super().__init__(*args, **kwargs)
     

    def validate(self, attrs):
        email = attrs.get("email")
        password = attrs.get("password")


        if email and password:

            user = User.objects.filter(Q(email=email) | Q(username=email)).first()
            # user = User.objects.filter(email=email).first()
            if user:
                if not user.check_password(password):
                    raise ValidationError("Invalid  email or password")
                self.user = user
                attrs["username"] = user.username
                return super().validate(attrs)
            
            raise ValidationError("Invalid  email or password")
        
        raise ValidationError("All inputs required")
    
