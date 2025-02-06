from django.urls import path
from .views import DirectoryList, ListMembers, ProjectMembers, TaskView, ProjectsView

urlpatterns = [
    path('list/', DirectoryList.as_view()),
    path('listMembers/<int:list_id>', ListMembers.as_view()),
    path('projectMembers/<int:project_id>', ProjectMembers.as_view()),
    path('project/<int:project_id>/', TaskView.as_view()),
    path('projectInfo/<int:list_id>/', ProjectsView.as_view())
]