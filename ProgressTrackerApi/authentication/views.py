from django.shortcuts import render
from rest_framework.generics import GenericAPIView
from .serializers import ProfileSerializer, RegisterUserSerializer
from rest_framework.response import Response
from .models import UserProfile
# Create your views here.

class UserDetails(GenericAPIView):
    serializer_class = ProfileSerializer

    def get(self, request):
        profile = UserProfile.objects.get(user=self.request.user)
        user_data = self.get_serializer(profile)
        return Response(user_data.data)


class RegisterUser(GenericAPIView):
    serializer_class = RegisterUserSerializer

    def post(self, request):
        user_serializer = self.get_serializer(data=request.data)
        user_serializer.is_valid(raise_exception=True)
        user = user_serializer.save()
        return Response({
            'status': 'success'
        })