from django.shortcuts import render

from rest_framework import viewsets
from .serializers import MovieSerializers, UserSerializer
from .models import MovieApp
from django.contrib.auth.models import User

class MovieAppView(viewsets.ModelViewSet):
    serializer_class = MovieSerializers
    queryset = MovieApp.objects.all()

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer