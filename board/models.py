from django.db import models
from django.utils import timezone
import uuid

class Post(models.Model):
    EMOTION = (
        (0, "非常事態(´•_•; )"),  # (DB値, 読みやすい値)
        (1, "じっくり(-ω-;)ｳｰﾝ"),
        (2, "助かった(*´▽`人)"),
        (3, "提案(^^)/~~~"),
        (4, "よしよし('ω')"),
        (5, "大丈夫？( *´艸｀)"),
    )

    post_id = models.UUIDField(verbose_name='投稿者id', primary_key=True, default=uuid.uuid4, editable=False)
    sender_name = models.CharField(verbose_name='投稿者名(匿名)', max_length=40)
    text = models.TextField(verbose_name='本文')
    created_at = models.DateTimeField(verbose_name='作成日時', default=timezone.now)
    emotion = models.IntegerField(choices=EMOTION, default=0)

    def __str__(self):
        return self.sender_name