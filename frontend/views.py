import json
from django.shortcuts import render
from django.http import JsonResponse

from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_POST
from .models import Message, Room
from django.middleware.csrf import get_token

# Create your views here.
def front(req, *args, **kwarg):
   return render(req, 'new.html')

def get_csrf_token(request):
   token = get_token(request)
   return JsonResponse({'csrfToken': token})

@require_POST
def chatLogin(req):
   data = json.loads(req.body)
   username = data.get('usuario')
   password = data.get('senha')

   usuario = authenticate(username=username, password=password)

   if usuario is not None:
      login(req, usuario)
      
      userInfo = {
         'id': usuario.id,
         'username': usuario.username,
      }

      return JsonResponse({ 'response': True, 'usuario': userInfo })
   else:
      return JsonResponse({ 'response': False })
   
def chatLogout(req):
   return JsonResponse({ 'logout': True }, status=403)

@login_required
def get_rooms(req):
   rooms = Room.objects.all().order_by('-created_at')

   rooms_data = [{
      'room_id': room.pk, 
      "title": room.title, 
      "created_at": room.created_at.strftime('%d/%m/%Y')
   } for room in rooms]
   
   return JsonResponse(rooms_data, safe=False)

# def send_message(req, room_id):
#    data = json.loads(req.body)
#    room = Room.objects.get(id=room_id)
#    new_message = Message.objects.create(username = data['username'], text=data['message'])
#    room.messages.add(new_message)
   
#    return render(req, 'api-chat/message.html', { 'message': new_message, 'username': data['username'] })