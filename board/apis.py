from rest_framework.generics import ListAPIView    # API
from .serializers import PostSerializer 
from .models import Post, Thread

class api(ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer