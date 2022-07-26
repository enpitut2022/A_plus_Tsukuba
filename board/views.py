from django.shortcuts import render
from django.http import HttpResponse
from .models import Post
from django.views.generic import TemplateView

class Index(TemplateView):
    template_name = "board/Chat.html"
    model = Post
    context_object_name = 'Posts'