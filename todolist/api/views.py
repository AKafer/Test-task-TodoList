from rest_framework import viewsets
from django_filters import rest_framework as dfilters

from task.models import Task
from .serializers import TaskSerializer
from .filters import StatusFilter


class TaskViewSet(viewsets.ModelViewSet):
    """Класс представления задач"""
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    filter_backends = (dfilters.DjangoFilterBackend,)
    filterset_class = StatusFilter
    # permission_classes = (IsAdminOrReadOnly, )
    # filter_backends = (filters.SearchFilter, DjangoFilterBackend)
    # search_fields = ('name',)
    # filterset_fields = ('slug',)
    # lookup_field = ('slug')
    # ordering = ('slug',)
