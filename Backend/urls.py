"""
URL configuration for Backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from products.views import ProductDetail, ProductList
from users.views import GoogleOAuth2View
urlpatterns = [
    path("admin/", admin.site.urls),
    path('users/', include('users.urls')),
    path('api/products/', ProductList.as_view(), name='get_all_products'),  # New pattern for listing all products
    path('api/products/<int:product_id>/', ProductDetail.as_view(), name='get_product_by_id'),
    path('oauth/', GoogleOAuth2View.as_view(), name='google-oauth2'),
    path('customers/', include('customers.urls')),
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
