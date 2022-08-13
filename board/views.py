from urllib import response
from django.shortcuts import render
from django.http import HttpResponse
from .models import Post, Thread
from django.shortcuts import redirect
from django.views.generic import TemplateView, ListView

class Index(ListView):
    def get(self, request, *args, **kwargs):
        return redirect("threads/1/")


class ThreadView(ListView):
    template_name = "board/Chat.html"
    model = Post
    #context_object_name = 'post_data'
    ordering = ['-created_at']

    def post(self, request, *args, **kwargs):
        name = self.request.POST.get("username", None)
        msg = self.request.POST.get("message", None)
        emo = self.request.POST.get("emotion_type", "0")
        self.model.objects.create(sender_name=name, text=msg, emotion=emo, thread_id = self.kwargs['thread_id'])
        return redirect(f"/threads/{self.kwargs['thread_id']}/")

    def get_context_data(self, *args, **kwargs):
        context = super().get_context_data(*args, **kwargs)
        thread_id = self.kwargs['thread_id']
        thread_title = Thread.objects.filter(id = thread_id).values()[0]["title"]
        context['thread_title'] = thread_title
        context['thread_id'] = thread_id
        return context
