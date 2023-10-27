from rest_framework import serializers
from .models import Order, OrderItem
from products.serializers import ProductSerializer


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ["id", "customer", "order_date", "total_amount"]


class OrderItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer() 

    class Meta:
        model = OrderItem
        fields = ["id", "order", "product", "quantity"]
