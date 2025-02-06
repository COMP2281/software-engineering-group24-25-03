from django.contrib import admin
from .models import  Project, Task, List, ListMember, ProjectMember
# Register your models here.
admin.site.register(List)
admin.site.register(Project)
admin.site.register(Task)
admin.site.register(ListMember)
admin.site.register(ProjectMember)