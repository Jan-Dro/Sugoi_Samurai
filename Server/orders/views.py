from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Order
from .serializers import OrderSerializer
from django.http import Http404


class OrderDetail(APIView):
    def get_object(self, order_id):
        try:
            return Order.objects.get(pk=order_id)
        except Order.DoesNotExist:
            raise Http404

    def get(self, request, order_id):
        order = self.get_object(order_id)
        serializer = OrderSerializer(order)
        return Response(serializer.data)

    def put(self, request, order_id):
        order = self.get_object(order_id)
        serializer = OrderSerializer(order, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, order_id):
        order = self.get_object(order_id)
        order.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
