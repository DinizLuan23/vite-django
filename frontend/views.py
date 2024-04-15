import json
from django.shortcuts import render
from django.http import JsonResponse
from django.core import serializers

from .models import Message, Room

# Create your views here.
def front(req, *args, **kwarg):
   return render(req, 'new.html')

def get_rooms(req):
   rooms = Room.objects.all().order_by('-created_at')
   # rooms_data = serializers.serialize('json', rooms)

   rooms_data = [{
      'room_id': room.pk, 
      "title": room.title, 
      "created_at": room.created_at.strftime('%d/%m/%Y')
   } for room in rooms]
   
   return JsonResponse(rooms_data, safe=False)

def send_message(req, room_id):
   data = json.loads(req.body)
   room = Room.objects.get(id=room_id)
   new_message = Message.objects.create(username = data['username'], text=data['message'])
   room.messages.add(new_message)
   
   return render(req, 'chat/message.html', { 'message': new_message, 'username': data['username'] })