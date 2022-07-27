from django.shortcuts import render
from django.http import HttpResponse
from .models import Post
from django.views.generic import TemplateView, ListView

class Index(ListView):
    template_name = "board/Chat.html"
    model = Post
    context_object_name = 'post_data'
    ordering = ['-created_at']

    def post(self, request, *args, **kwargs):
        name = self.request.POST.get("username", None)
        msg = self.request.POST.get("message", None)
        self.model.objects.create(sender_name=name, text=msg)
        return self.get(request, *args, **kwargs)