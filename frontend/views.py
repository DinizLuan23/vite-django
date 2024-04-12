from django.shortcuts import render

# Create your views here.
def front(req, *args, **kwarg):
   return render(req, 'new.html')