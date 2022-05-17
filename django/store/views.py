from django.shortcuts import render

# to build API
from rest_framework import generics

from . import models
from .models import Category, Product
from .serializers import CategorySerializer, ProductSerializer

# ListAPIView Used for read-only endpoints to represent a collection of model instances.Provides a get method handler.
class ProductListView(generics.ListAPIView):
    queryset = Product.objects.all()
    #make date formatted to be utilize and send it across the next js 
    serializer_class = ProductSerializer

#Used for read-only endpoints to represent a single model instance. Provides a get method handler.
class Product(generics.RetrieveAPIView):
    lookup_field = "slug"
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class CategoryItemView(generics.ListAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        return models.Product.objects.filter(
            category__in=Category.objects.get(slug=self.kwargs["slug"]).get_descendants(include_self=True)
        )


class CategoryListView(generics.ListAPIView):
    queryset = Category.objects.filter(level=1)
    serializer_class = CategorySerializer

