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




class GoogleOAuth2View(View):
    def get(self, request):

        code = request.GET.get('code')
        if code:
            redirect_url = "http://127.0.0.1:8000/oauth"
            client_id = os.environ.get('CLIENT_ID')
            client_secret = os.environ.get('CLIENT_SECRET')

            token_url = "https://oauth2.googleapis.com/token/"
            token_data = {
                'code': code,
                'client_id': client_id,
                'client_secret': client_secret,
                'redirect_uri': redirect_url,
                'grant_type': 'authorization_code',
            }

            token_response = requests.post(token_url, data=token_data)
            token_json = token_response.json()

            if 'access_token' in token_json:
                access_token = token_json['access_token']


                user_data_url = f"https://www.googleapis.com/oauth2/v3/userinfo?access_token={access_token}"
                user_data_response = requests.get(user_data_url)
                user_data = user_data_response.json()

                print('User Data:', user_data)

        return HttpResponseRedirect('http://localhost:5173/')

    def post(self, request):
        client_id = os.environ.get('CLIENT_ID')
        redirect_url = 'http://127.0.0.1:8000/oauth/'


        auth_url = 'https://accounts.google.com/o/oauth2/auth/'
        auth_params = {
            'client_id': client_id,
            'redirect_uri': redirect_url,
            'scope': 'https://www.googleapis.com/auth/userinfo.profile openid',
            'response_type': 'code',
            'access_type': 'offline',
            'prompt': 'consent',
        }
        auth_url = f'{auth_url}?{urlencode(auth_params)}'

        response = JsonResponse({'url': auth_url})

        response['Access-Control-Allow-Origin'] = 'http://localhost:5173'

        return response