from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Customer
from .serializers import CustomerSerializer
from django.http import Http404
from django.contrib.auth import get_user_model, authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.shortcuts import render, redirect

class CustomerDetail(APIView):
    def get_object(self, customer_id):
        try:
            return Customer.objects.get(pk=customer_id)
        except Customer.DoesNotExist:
            raise Http404

    def get(self, request, customer_id):
        customer = self.get_object(customer_id)
        serializer = CustomerSerializer(customer)
        return Response(serializer.data)

    def put(self, request, customer_id):
        customer = self.get_object(customer_id)
        serializer = CustomerSerializer(customer, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, customer_id):
        customer = self.get_object(customer_id)
        customer.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


def user_login(request):
	if request.method == 'POST':
		user_email = request.POST['user_email']
		user_pswd = request.POST['user_pass']
		try:
			user_auth = authenticate(username=user_email, password=user_pswd)
			login(request, user_auth)
			return redirect('home')
		except:
			messages.error(request, 'Something is wrong.')
			return render(request, 'app_users/login.html')
	else:
		return render(request, 'app_users/login.html')


def user_logout(request):
	try:
		logout(request)
	except:
		messages.error(request, 'Something is wrong.')
	return redirect('login')
