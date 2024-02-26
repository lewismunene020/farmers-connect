from django.urls import path  
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from . import  views 

urlpatterns = [
    path('login/', views.LoginView.as_view({"post" : "post"})  ),
    path('register/', views.SignUpView.as_view({"post" : "post"})  ),

    path("contact/" ,views.ContactMessageView.as_view({"post" : "create"})),
    path("contact/list/" ,views.ContactMessageView.as_view({"post" : "list"})),
    # path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    # path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

]