# Generated by Django 4.2.6 on 2023-10-19 03:01

from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Product",
            fields=[
                ("product_id", models.AutoField(primary_key=True, serialize=False)),
                ("product_name", models.CharField(max_length=255)),
                ("price", models.DecimalField(decimal_places=2, max_digits=10)),
                ("description", models.TextField()),
                ("image", models.ImageField(upload_to="products/images/")),
            ],
        ),
    ]
