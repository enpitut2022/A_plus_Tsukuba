from django.urls import path

from . import views

urlpatterns = [
    path('', views.Index.as_view(), name='index'),
    path('threads/<int:thread_id>/', views.ThreadView.as_view(), name='threads'),
    path('create_threads/', views.CreateThreadView.as_view(), name='create_threads'),
    # path('Chat/', views.Chat, name='Chat'),
]