from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token
from .views import user_login

urlpatterns = [
    path('login/', user_login, name='login'),
    path('get-token/', obtain_auth_token, name='get_token'),
]