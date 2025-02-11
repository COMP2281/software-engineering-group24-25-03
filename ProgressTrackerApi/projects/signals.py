from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import List, ListMember, Project, ProjectMember

@receiver(post_save, sender=List)
def create_list_member(sender, instance, created, **kwargs):
    if created:
        ListMember.objects.create(list=instance, user=instance.owner)

@receiver(post_save, sender=Project)
def create_list_member(sender, instance, created, **kwargs):
    if created:
        ProjectMember.objects.create(project=instance, user=instance.owner)
