from django.shortcuts import render
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import IsAuthenticated

from .serializers import UserSerializer
from rest_framework.response import Response


# Create your views here.

class UserDetails(GenericAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user_data = self.get_serializer(self.request.user)
        return Response(user_data.data)

