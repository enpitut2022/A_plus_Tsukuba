from django.db import models
from django.utils import timezone
import uuid

class Post(models.Model):

    post_id = models.UUIDField(verbose_name='投稿者id', primary_key=True, default=uuid.uuid4, editable=False)
    date = models.DateField(verbose_name='日付', default=timezone.now)
    sender_name = models.CharField(verbose_name='投稿者名(匿名)', max_length=40)
    text = models.TimeField(verbose_name='本文')
    created_at = models.DateTimeField(verbose_name='作成日時', default=timezone.now)