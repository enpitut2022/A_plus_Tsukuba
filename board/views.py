from django.shortcuts import render
from django.http import HttpResponse


def index(request):
    # return HttpResponse("index")
    # return render(request, 'board/index.html')
    return render( request, 'board/Chat.html' )
    # return HttpResponse("Hello, world.\nチーム名: 半分、青い。\nプロダクト名: A+つくば")
    # # change to /Chat/
    # return render(request, 'board/Chat.html')

# def Chat(request):
#     return render(request, 'board/Chat.html')
#     # return HttpResponse("chat")