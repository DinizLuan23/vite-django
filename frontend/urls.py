from django.urls import path
from . import views

urlpatterns = [
   path('', views.front, name='front'),
   path('get-csrf-token', views.get_csrf_token, name='get_csrf_token'),
   path('chat-login', views.chatLogin, name='chat-login'),
   path('chat-logout', views.chatLogout, name='chat-logout'),
   path('get-rooms', views.get_rooms, name='get-rooms'),
]
