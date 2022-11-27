from datetime import datetime

import pytz
from django_filters import rest_framework as dfilters

from task.models import Task

utc = pytz.UTC


class StatusFilter(dfilters.FilterSet):
    """Фильтр по статусу"""
    status = dfilters.CharFilter(field_name="status", method='get_status')

    def get_status(self, queryset, name, value):
        print(queryset)
        print(name)
        print(value)
        if value:
            now_date = datetime.now()
            if value == 'Просрочена':
                return Task.objects.filter(
                    stop_date__lt=now_date.replace(tzinfo=utc))
            elif value == 'В процессе':
                return Task.objects.filter(
                    stop_date__gte=now_date.replace(tzinfo=utc)
                ).filter(is_done=False)
            elif value == 'Выполнена':
                return Task.objects.filter(is_done=True)
            return queryset
        return queryset

    class Meta:
        model = Task
        fields = ('status', )
