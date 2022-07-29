from urllib import response
from django.shortcuts import render
from django.http import HttpResponse
from .models import Post, Thread
from django.shortcuts import redirect
from django.views.generic import TemplateView, ListView

class Index(ListView):
    def get(self, request, *args, **kwargs):
        return redirect("threads/1/")

class CreateThreadView(ListView):
    model = Thread
    def post(self, request, *args, **kwargs):
        title = self.request.POST.get("title", None)

        # 同名のスレタイがなければ
        t = self.model.objects.filter(title=title).values()
        if not t:
            self.model.objects.create(title=title)
            t = self.model.objects.filter(title=title).values()
        # 同名のスレがあればそこへ移動        
        return redirect(f"/threads/{t[0]['id']}/")

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
        em_count = Post.objects.filter(emotion=0, thread_id = self.kwargs['thread_id']).count()
        context["em_count"] = em_count
        thread_posts = Post.objects.filter(thread_id = self.kwargs['thread_id']).order_by('-created_at').values()
        for post in thread_posts:
            post['emotion'] = Post.EMOTION[post['emotion']][1]
        context['post_data'] = thread_posts
        threads = Thread.objects.all()
        context['thread_data'] = threads.order_by('-created_at')
        context['thread_id'] = self.kwargs['thread_id']
        
        # self.kwargs['thread_id']
        return context