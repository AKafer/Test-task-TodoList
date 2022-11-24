from rest_framework import serializers
from task.models import Task
from datetime import datetime
import pytz

utc=pytz.UTC


class TaskSerializer(serializers.ModelSerializer):
    """Класс сериализатора задач."""
    status = serializers.SerializerMethodField()

    class Meta:
        fields = '__all__'
        model = Task

    def get_status(self, obj):
        """Функция определения статуса задачи."""
        now_date = datetime.now()
        if not obj.is_done:
            if (obj.stop_date).replace(tzinfo=utc) >= now_date.replace(tzinfo=utc):
                return 'srok'
            return 'pros'
        return 'done'
