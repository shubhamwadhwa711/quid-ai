from django.urls import path
from . views import *
# from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView



urlpatterns = [
   
    path("home/", Home.as_view(), name="home"),
    # path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    # path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    # path('api/login', LoginView.as_view(), name='auth_login'),
    
]
