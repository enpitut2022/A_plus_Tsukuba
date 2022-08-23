from urllib import response
from django.shortcuts import render
from django.http import HttpResponse
from .models import Post, Subject, Thread
from django.shortcuts import redirect
from django.views.generic import TemplateView, ListView

class Index(ListView):
    def get(self, request, *args, **kwargs):
        return redirect("search/")


class ThreadView(ListView):
    template_name = "board/Chat.html"
    model = Post
    #context_object_name = 'post_data'
    ordering = ['-created_at']

    def get_context_data(self, *args, **kwargs):
        context = super().get_context_data(*args, **kwargs)
        thread_id = self.kwargs['thread_id']
        thread_title = Thread.objects.filter(id = thread_id).values()[0]["title"]
        context['thread_title'] = thread_title
        context['thread_id'] = thread_id
        return context


class AboutView(TemplateView):
    template_name = "board/About.html"

class SearchView(ListView):
    """検索画面に新規投稿一覧を表示する"""
    template_name = "board/Search.html"
    model = Post

    def get_context_data(self, *args, **kwargs):
        context = super().get_context_data(*args, **kwargs)
        context['post_list'] = self.model.objects.all().order_by('-created_at')[:10]
        return context
