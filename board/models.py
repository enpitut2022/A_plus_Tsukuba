from django.db import models
from django.utils import timezone
import uuid

class Thread(models.Model):
    title    = models.CharField(verbose_name='スレタイ',blank=False, null=False, max_length=150)
    created_at = models.DateTimeField(verbose_name='作成日時', default=timezone.now)
    def __str__(self):
        return self.title

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
    sender_name = models.CharField(verbose_name='投稿者名(匿名)', max_length=40, blank=False)
    text = models.TextField(verbose_name='本文', blank=False, max_length=500)
    created_at = models.DateTimeField(verbose_name='作成日時', default=timezone.now)
    thread  = models.ForeignKey(Thread, on_delete=models.CASCADE, default=0)
    emotion = models.IntegerField(choices=EMOTION, default=0)

    def __str__(self):
        return str(self.post_id)

class Reply(models.Model):
    EMOTION = (
        (0, "非常事態(´•_•; )"),  # (DB値, 読みやすい値)
        (1, "じっくり(-ω-;)ｳｰﾝ"),
        (2, "助かった(*´▽`人)"),
        (3, "提案(^^)/~~~"),
        (4, "よしよし('ω')"),
        (5, "大丈夫？( *´艸｀)"),
    )

    post_id = models.ForeignKey(Post, on_delete=models.CASCADE, to_field="post_id")
    reply_id = models.UUIDField(verbose_name='返信id', primary_key=True, default=uuid.uuid4, editable=False)
    sender_name = models.CharField(verbose_name='投稿者名(匿名)', max_length=40, blank=False)
    text = models.TextField(verbose_name='本文', blank=False, max_length=500)
    created_at = models.DateTimeField(verbose_name='作成日時', default=timezone.now)
    emotion = models.IntegerField(choices=EMOTION, default=0)

    def __str__(self):
        return str(self.reply_id)
