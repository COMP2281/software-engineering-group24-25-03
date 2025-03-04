from django.shortcuts import render
from rest_framework.generics import GenericAPIView
from .models import ListMember, ProjectMember, List, Project, Task
from .serializers import ListSerializer, ProjectSerializer, ListCreateSerializer, ListMemberSerializer, ProjectMemberSerializer, TaskSerializer, TaskIdSeriailizer
from authentication.serializers import ProfileSerializer
from authentication.models import UserProfile
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from django.http import HttpResponseNotAllowed
# Create your views here.

class DirectoryList(GenericAPIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):

        '''
        structure of dict
        {
        lists: *lists that user is part of format [id, name]*
        *list id*: [projectid, project name]
        }

        '''
        directory = {}
        user = self.request.user
        user_member_lists = ListMember.objects.filter(user=user)
        user_lists = [i.list for i in user_member_lists]

        user_member_projects = ProjectMember.objects.filter(user=user)
        user_projects = [i.project for i in user_member_projects]
        if len(user_lists) > 0:
            list_serializer = ListSerializer(user_lists, many=True)
            directory['lists'] = [{'listId':l['id'], 'listName':l['name']} for l in list_serializer.data]

            project_serializer = ProjectSerializer(user_projects, many=True)
            for project in project_serializer.data:
                if directory.get(project['list']) == None:
                    directory[project['list']] = []
                directory[project['list']].append({'projectId':project['id'], 'projectName':project['name']})
            return Response(directory)
        return Response({'error': 'No Lists'})
    
    def post(self, request):
        list_serializer = ListCreateSerializer(data=request.data)
        list_serializer.is_valid(raise_exception=True)
        list_serializer.save(owner=self.request.user)
        return Response(list_serializer.data)

class ProjectsView(GenericAPIView):
    def post(self, request, list_id):
        project_seriailzer = ProjectSerializer(data=request.data)
        project_list = get_object_or_404(List, id=list_id)
        project_seriailzer.is_valid(raise_exception=True)
        project_seriailzer.save(owner=self.request.user, list=project_list)
        return Response(project_seriailzer.data)

class ListMembers(GenericAPIView):

    def get(self, request, list_id):
        list_object = get_object_or_404(List, id=list_id)
        members = ListMember.objects.filter(list=list_object)
        if self.request.user not in members and list_object.owner != self.request.user:
            return Response({"error":"Not A List Member"})
        profiles = [UserProfile.objects.get(user=user.user.id) for user in members]
        profile_serializer = ProfileSerializer(profiles, many=True)
        return Response(profile_serializer.data)
    
    #  function to add a user to a list
    def post(self, request, list_id):
        list_member_serializer = ListMemberSerializer(data=request.data)
        list_member_serializer.is_valid(raise_exception=True)
        list_member_serializer.save(list=list_id)
        return list_member_serializer.data

class ProjectMembers(GenericAPIView):

    def get(self, request, project_id):
        project_object = get_object_or_404(Project, id=project_id)
        members = ProjectMember.objects.filter(list=project_object)
        if self.request.user not in members and project_object.owner != self.request.user:
            return Response({"error":"Not A List Member"})
        profiles = [UserProfile.objects.get(user=user.user.id) for user in members]
        profile_serializer = ProfileSerializer(profiles, many=True)
        return Response(profile_serializer.data)
    
    #  function to add a user to a list
    def post(self, request, list_id):
        project_member_serializer = ProjectMemberSerializer(data=request.data)
        project_member_serializer.is_valid(raise_exception=True)
        project_member_serializer.save(list=list_id)
        return project_member_serializer.data
    
class TaskView(GenericAPIView):
    # currently any user can make this api call change so only members of a projet can
    def get(self, request, project_id):
        tasks = Task.objects.filter(project=project_id)
        task_serializer = TaskSerializer(tasks, many=True)
        return Response(task_serializer.data)
    
    def post(self, request, project_id):
        project = get_object_or_404(Project, id=project_id)
        task_serializer = TaskSerializer(data=request.data)
        task_serializer.is_valid(raise_exception=True)
        task_serializer.save(project=project)
        return Response(task_serializer.data)
    
class TaskProgess(GenericAPIView):
    serializer_class = TaskIdSeriailizer
    permission_classes = [IsAuthenticated]

    def post(self, request, project_id):
        seriailizer = self.serializer_class(data=request.data)
        seriailizer.is_valid(raise_exception=True)
        task_id = seriailizer.validated_data['task_id']
        status = seriailizer.validated_data['status']
        task = get_object_or_404(Task, id=task_id)
        project = get_object_or_404(Project, id=project_id)
        if ProjectMember.objects.filter(user=request.user, project=project) == []:
            return Response({"error": "You are not a memeber of this project"})
        
        if status == 'complete':
            task.status = 2

        elif status == 'started':
            task.status = 1
        
        elif status == 'starting':
            task.status = 0
        
        else:
            return Response({"error": "invalid status provided"})
        
        task.save()
        return Response({"status": status})
        

