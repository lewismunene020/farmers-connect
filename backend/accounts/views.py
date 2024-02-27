from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.request import Request 
from rest_framework import status
from rest_framework.response import Response
from .models import User 
from .serializers import LoginSerializer ,SignUpSerializer
from rest_framework_simplejwt.tokens import RefreshToken ,OutstandingToken

from accounts import  logger

def get_tokens_for_user(user:User):
    refresh = RefreshToken.for_user(user)

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }
# def refresh_token(request):
#     token  = RefreshToken.


class SignUpView(viewsets.ViewSet):
    serializer_class = SignUpSerializer
    permission_classes = ()
    authentication_classes = ()

    def post(self, request: Request):
        serializer = self.serializer_class(data=request.data)
        logger.info(f"SINGUP DATA : {request.data} ")

        if serializer.is_valid():
            user: User = serializer.save()
            response = {"message": "User Created Successfully"}
            # lets merge the response with the serializer data
            response.update(serializer.data)
            logger.info(
                f"User {user.username} created successfully ==== Response : {response}")
            return Response(response, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(viewsets.ViewSet):
    serializer_class = LoginSerializer
    permission_classes = ()
    authentication_classes = ()




    def post(self, request: Request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            user: User = serializer.user  # user appended to serializer during validation
            user_tokens  = get_tokens_for_user(user)

            jwt_token = user_tokens["access"]
            refresh_token = user_tokens["refresh"]
            if not jwt_token:
                return Response({"message": "Unable to login please try again later"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            response = {
                "message": f"Welcome {user.username} you have logged in successfully",
                "token": jwt_token,
                "refresh" : refresh_token,
                "username": user.username,
                "first_name" : user.first_name,
                "last_name" : user.last_name,
                "is_superuser": user.is_superuser,
                "is_staff": user.is_staff,
                "is_farmer" : user.is_farmer,
                "is_active": user.is_active,
                "email": user.email,
                "id": user.id,
                "profile": {
                    "image": user.get_profile_picture(request),
                }
            }
            return Response(response, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# contact message  route
class ContactMessageView(viewsets.ViewSet):
    permission_classes = []
    def list(self, request:Request):
        pass

    def create(self , request:Request):
        data = request.data 

        name = data.get("name")
        email = data.get("email")
        subject = data.get("subject")
        message = data.get("message")

        print(f"""
            name : {name}
            email : {email}
            subject : {subject}
            message : {message}
         """)

        return Response({
            "message" : "Your message has been received we will get back to you shortly"
        })
    

