from django.db import models

class Customer(models.Model):
    customer_id = models.AutoField(primary_key=True)
    email = models.EmailField(unique=True, verbose_name="Email Address")
    full_name = models.CharField(max_length=255)
    address = models.TextField()

    def __str__(self):
        return self.full_name
