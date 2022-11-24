from django.shortcuts import render

from .models import Task


def task(request):
    tasks = Task.objects.all()

    context = {
        'tasks': tasks,
    }
    return render(request, 'index.html', context)
