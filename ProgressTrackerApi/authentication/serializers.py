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
    

class RegisterUserSerializer(ModelSerializer):
    # recaptcha = CharField(max_length=1000, required=True)

    class Meta:
        model = User
        # fields = ('username', 'password', 'first_name', 'last_name', 'email', 'dob', 'recaptcha',)
        fields = ('username', 'password', 'first_name', 'last_name', 'email')
        extra_kwargs = {
            'email': {'required': True, 'allow_blank': False},
            'first_name': {'required': True, 'allow_blank': False},
            'last_name': {'required': True, 'allow_blank': False},
        }