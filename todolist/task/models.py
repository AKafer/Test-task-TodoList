from django.db import models


class Task(models.Model):
    """
    Класс таски.
    """
    title = models.CharField(max_length=150)
    text = models.TextField()
    start_date = models.DateTimeField('Дата создания', auto_now_add=True)
    stop_date = models.DateTimeField('Дедлайн')
    files = models.ForeignKey(
        'File',
        on_delete=models.SET_NULL,
        null=True,
        default=None
    )
    is_done = models.BooleanField(default=False)

    class Meta:
        ordering = ['-stop_date']

    def __str__(self):
        return self.title


class File(models.Model):
    """
    Класс файла.
    """
    file = models.FileField(
        upload_to='files/',
        max_length=100,
        null=True, blank=True
    )
