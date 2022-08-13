from rest_framework import serializers
from .models import Post, Reply

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post                   
        fields = ["post_id","sender_name","text","created_at","emotion"]  


class ReplySerializer(serializers.ModelSerializer):
    class Meta:
        model = Reply                   
        fields = ["reply_id","sender_name","text","created_at","emotion"]  
