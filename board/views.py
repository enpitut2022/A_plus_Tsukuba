from django.shortcuts import render
from django.http import HttpResponse


def index(request):
    return HttpResponse("Hello, world.\nチーム名: 半分、青い。\nプロダクト名: A+つくば")