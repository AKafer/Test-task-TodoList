from datetime import datetime

import pytz
from django.shortcuts import get_object_or_404
from rest_framework import serializers

from task.models import File, Task

utc = pytz.UTC


class FileSerializer(serializers.ModelSerializer):
    """Класс сериализатора файлов."""

    class Meta:
        fields = '__all__'
        model = File


class TaskSerializer(serializers.ModelSerializer):
    """Класс сериализатора задач."""
    status = serializers.SerializerMethodField()
    link_to_file = serializers.SerializerMethodField()

    class Meta:
        fields = '__all__'
        model = Task

    def get_status(self, obj):
        """Функция определения статуса задачи."""
        now_date = datetime.now()
        if not obj.is_done:
            if ((obj.stop_date).replace(tzinfo=utc)
                    >= now_date.replace(tzinfo=utc)):
                return 'В процессе'
            return 'Просрочена'
        return 'Выполнена'

    def get_link_to_file(self, obj):
        """Функция определения ссылки для файла."""
        if obj.files:
            file = get_object_or_404(File, id=obj.files.id)
            print(file.file)
            return str(
                f'<a style="color:#FF0000" href="media/{file.file}">Файлик</a>'
            )
        return ''
