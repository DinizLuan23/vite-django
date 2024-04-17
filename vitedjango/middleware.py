# middleware.py

from django.http import HttpResponseRedirect
from django.urls import reverse

class RedirectToDefaultPageMiddleware:
   def __init__(self, get_response):
      self.get_response = get_response

   def __call__(self, request):
      response = self.get_response(request)

      # Se a resposta for um erro 404 (Página não encontrada)
      if response.status_code == 404:
         # Redireciona para a página padrão
         return HttpResponseRedirect(reverse('front'))

      return response