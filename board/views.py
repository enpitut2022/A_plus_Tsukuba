from urllib import response
from django.shortcuts import render
from django.http import HttpResponse
from .models import Post
from django.shortcuts import redirect
from django.views.generic import TemplateView, ListView

class Index(ListView):
    template_name = "board/Chat.html"
    model = Post
    context_object_name = 'post_data'
    ordering = ['-created_at']

    def post(self, request, *args, **kwargs):
        name = self.request.POST.get("username", None)
        msg = self.request.POST.get("message", None)
        emo = self.request.POST.get("emotion_type", "0")
        self.model.objects.create(sender_name=name, text=msg, emotion=emo)
        return redirect("index")

    def get_context_data(self, *args, **kwargs):
        context = super().get_context_data(*args, **kwargs)
        em_count = self.model.objects.filter(emotion=0).count()
        context["em_count"] = em_count
        return context