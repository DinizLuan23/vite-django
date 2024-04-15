from django.urls import path
from . import views

app_name = 'frontend'

urlpatterns = [
   path('', views.front, name = 'front'),
   path('get-rooms', views.get_rooms, name='get-rooms'),
]
