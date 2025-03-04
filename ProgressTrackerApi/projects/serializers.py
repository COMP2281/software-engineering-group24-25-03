from rest_framework.serializers import ModelSerializer, Serializer, IntegerField, CharField
from .models import List, Project, ListMember, Task

class ListSerializer(ModelSerializer):
    class Meta:
        model = List
        fields = '__all__'

class ProjectSerializer(ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'
        extra_kwargs = {'list': {'required': False, 'allow_null': True}}

class ListCreateSerializer(ModelSerializer):
    class Meta:
        model = List
        fields = ('id', 'name')

class ListMemberSerializer(ModelSerializer):
    class Meta:
        model = ListMember
        fields = '__all__'
        extra_kwargs = {'list': {'required': False, 'allow_null': True}}

class ProjectMemberSerializer(ModelSerializer):
    class Meta:
        model = ListMember
        fields = '__all__'
        extra_kwargs = {'list': {'required': False, 'allow_null': True}}

class TaskSerializer(ModelSerializer):
    class Meta:
        model = Task
        fields = ('id', 'name', 'description', 'project', 'status')
        extra_kwargs = {'project': {'required': False, 'allow_null': True}}

class TaskIdSeriailizer(Serializer):
    task_id = IntegerField()
    status = CharField(max_length=20)