from rest_framework import viewsets
from django_filters import rest_framework as dfilters
from rest_framework.parsers import FormParser, MultiPartParser

from task.models import Task, File
from .serializers import TaskSerializer, FileSerializer

from .filters import StatusFilter


class TaskViewSet(viewsets.ModelViewSet):
    """Класс представления задач"""
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    filter_backends = (dfilters.DjangoFilterBackend,)
    filterset_class = StatusFilter


class FileViewSet(viewsets.ModelViewSet):
    """Класс представления задач"""
    queryset = File.objects.all()
    serializer_class = FileSerializer
    # parser_classes = (MultiPartParser, FormParser,)

    # def perform_create(self, serializer):
    #     serializer.save(file=self.request.data.get('file'))
