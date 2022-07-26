from django.db import models
from django.utils import timezone
import uuid

class Post(models.Model):

    post_id = models.UUIDField(verbose_name='投稿者id', primary_key=True, default=uuid.uuid4, editable=False)
    sender_name = models.CharField(verbose_name='投稿者名(匿名)', max_length=40)
    text = models.TextField(verbose_name='本文')
    created_at = models.DateTimeField(verbose_name='作成日時', default=timezone.now)

    def __str__(self):
        return self.name