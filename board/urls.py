from django.urls import path

from . import views
from . import apis

urlpatterns = [
    path('', views.Index.as_view(), name='index'),
    path('threads/<int:thread_id>/', views.ThreadView.as_view(), name='threads'),
    path('create_threads/', views.CreateThreadView.as_view(), name='create_threads'),
    path('api/', apis.api.as_view(), name = "api"),
]