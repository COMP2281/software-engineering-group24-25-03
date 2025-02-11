from rest_framework.serializers import ModelSerializer, SerializerMethodField
from django.contrib.auth.models import User
from .models import UserProfile

class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class ProfileSerializer(ModelSerializer):
    user = SerializerMethodField()

    class Meta:
        model = UserProfile
        fields = ['id', 'user', 'bio', 'profile_picture']  # Include relevant fields

    def get_user(self, obj):
        return {"id": obj.user.id, "username": obj.user.username}