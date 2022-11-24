from django.urls import path

from . import views

app_name = 'space_tasks'

urlpatterns = [
    path('', views.task, name='index'),
]
