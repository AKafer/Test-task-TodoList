from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import FileViewSet, TaskViewSet

router = DefaultRouter()

router.register(r'tasks', TaskViewSet, basename='tasks')
router.register(r'files', FileViewSet, basename='files')

urlpatterns = [
    path('', include(router.urls)),
]
