from rest_framework.generics import ListAPIView    # API
from .serializers import PostSerializer, ReplySerializer 
from .models import Post, Thread, Reply

class get_subthreads(ListAPIView):
    serializer_class = PostSerializer

    def get_queryset(self):
        thread_id = self.request.query_params.get("thread_id")
        return Post.objects.filter(thread_id = thread_id).order_by('-created_at')

class get_replies(ListAPIView):
    serializer_class = ReplySerializer

    def get_queryset(self):
        post_id = self.request.query_params.get("post_id")
        return Reply.objects.filter(post_id = post_id).order_by('created_at')
