from django.urls import path 
from . import  views 

urlpatterns = [
    path("contact/" ,views.ContactMessageView.as_view({"post" : "create"})),
    path("contact/list/" ,views.ContactMessageView.as_view({"post" : "list"}))
    
]