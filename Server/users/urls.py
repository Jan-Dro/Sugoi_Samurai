from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token
from .views import SignupView, get_states_by_country, get_countries

urlpatterns = [
    path('get-token/', obtain_auth_token),
    path('signup/', SignupView.as_view()),
    path('api/get_states/<str:country_code>/', get_states_by_country, name='get_states_by_country'),
    path('api/get_countries/', get_countries, name='get_countries'),
]