from django.shortcuts import render
from rest_framework.generics import GenericAPIView
from .serializers import UserSerializer
# Create your views here.

class UserDetails(GenericAPIView):
    serializer_class = UserSerializer

    def get(self, request):
        user_data = self.get_serializer(self.request.user)
        return user_data.data
