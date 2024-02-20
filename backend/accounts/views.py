from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.request import Request
from rest_framework.response import Response


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
    

