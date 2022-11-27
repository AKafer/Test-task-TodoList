from django_filters import rest_framework as dfilters
from rest_framework import viewsets

from task.models import File, Task

from .filters import StatusFilter
from .serializers import FileSerializer, TaskSerializer


class TaskViewSet(viewsets.ModelViewSet):
    """Класс представления задач"""
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    filter_backends = (dfilters.DjangoFilterBackend,)
    filterset_class = StatusFilter


class FileViewSet(viewsets.ModelViewSet):
    """Класс представления файлов"""
    queryset = File.objects.all()
    serializer_class = FileSerializer
