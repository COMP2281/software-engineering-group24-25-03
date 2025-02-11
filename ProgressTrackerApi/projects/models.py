from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class List(models.Model):
    name = models.CharField(max_length=50, blank=False)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

class ListMember(models.Model):
    list = models.ForeignKey(List, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.list.name} -> {self.user.username}'
# remove null and defualt in prod
class Project(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    list = models.ForeignKey(List, on_delete=models.CASCADE, null=True)
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name
    
class ProjectMember(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.project.name} -> {self.user.username}'
    
class Task(models.Model):
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=500)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    status = models.IntegerField(default=0)
