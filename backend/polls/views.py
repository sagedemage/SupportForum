from django.http import HttpResponse

# Create your views here.

from . import models

def index(request):
    return HttpResponse("Hello, world. You are at the polls index")

def login(request):
    user = models.User(username="test1000", password="test1000")
    user.save()
    return HttpResponse("New User added")

