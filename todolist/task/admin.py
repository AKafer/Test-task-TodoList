from django.contrib import admin

from .models import Task


class TaskAdmin(admin.ModelAdmin):
    """Класс отображения в админке задач"""
    list_display = ('id', 'title', 'text', 'start_date', 'stop_date', 'files')
    list_display_links = ('id', 'title')
    search_fields = ('title', 'stop_date')
    list_filter = ('title', 'stop_date',)
    empty_value_display = '-пусто-'


admin.site.register(Task, TaskAdmin)
