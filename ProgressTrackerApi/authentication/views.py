from django.shortcuts import render
from rest_framework.generics import GenericAPIView
from .serializers import UserSerializer
from rest_framework.response import Response
# Create your views here.

class UserDetails(GenericAPIView):
    serializer_class = UserSerializer

    def get(self, request):
        user_data = self.get_serializer(self.request.user)
        return Response(user_data.data)

