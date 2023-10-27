from django.shortcuts import render
from rest_framework.generics import CreateAPIView
from rest_framework.views import APIView
from django.contrib.auth import get_user_model, authenticate
from .serializers import SignupSerializer
from rest_framework.permissions import AllowAny
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
import os
import json
import requests
from django.shortcuts import redirect
from django.http import JsonResponse, HttpResponseRedirect
from django.views import View
from urllib.parse import urlencode
import requests
from django.http import JsonResponse
import os
import dotenv

dotenv.load_dotenv()
User = get_user_model()

class SignupView(CreateAPIView):
    queryset = User.objects.all()
    serializer_class = SignupSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
            username = serializer.validated_data["username"]
            email = serializer.validated_data["email"]
            password = serializer.validated_data["password"]
            User.objects.create_user( username=username, email=email, password=password )





def get_states_by_country(request, country_code):
    api_key = os.environ.get('API_KEY')
    headers = {
        "X-CSCAPI-KEY": api_key
    }
    response = requests.get(f"https://api.countrystatecity.in/v1/countries/{country_code}/states", headers=headers)
    
    if response.status_code == 200:
        data = response.json()
        return JsonResponse(data, safe=False)
    else:
        return JsonResponse({"error": "Failed to fetch states"}, status=500)
    

def get_countries(request):
    api_key = os.environ.get('API_KEY')
    headers = {
        "X-CSCAPI-KEY": api_key
    }
    try:
        response = requests.get("https://api.countrystatecity.in/v1/countries", headers=headers)
        response.raise_for_status()

        data = response.json()
        return JsonResponse(data, safe=False)
    except requests.exceptions.RequestException as err:

        return JsonResponse({"error": f"Failed to fetch countries: {str(err)}"}, status=500)
    except Exception as err:
        return JsonResponse({"error": f"An error occurred while fetching countries: {str(err)}"}, status=500)