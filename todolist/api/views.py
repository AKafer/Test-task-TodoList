from rest_framework import viewsets

from task.models import Task
from .serializers import TaskSerializer


class TaskViewSet(viewsets.ModelViewSet):
    """Класс представления задач"""
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    # permission_classes = (IsAdminOrReadOnly, )
    # filter_backends = (filters.SearchFilter, DjangoFilterBackend)
    # search_fields = ('name',)
    # filterset_fields = ('slug',)
    # lookup_field = ('slug')
    # ordering = ('slug',)
