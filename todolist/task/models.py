from django.db import models


class Task(models.Model):
    """
    Класс таски.
    """
    title = models.CharField(max_length=150)
    text = models.TextField()
    start_date = models.DateTimeField('Дата создания', auto_now_add=True)
    stop_date = models.DateTimeField('Дедлайн')
    files = models.FileField(
        upload_to='media/',
        max_length=100,
        null=True, blank=True
    )
    is_done = models.BooleanField(default=False)

    class Meta:
        ordering = ['-stop_date']

    def __str__(self):
        return self.title
