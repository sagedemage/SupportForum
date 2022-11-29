import json

from django.http import HttpResponse
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt;
from rest_framework.decorators import api_view
from .serializers import UserSerializer
from .models import User
# Create your views here.

@api_view(['GET'])
def index(request):
    return HttpResponse("Hello, world. You are at the polls index")


@csrf_exempt
@api_view(['POST'])
def register(request):
    if request.method == 'POST':
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = User(username=serializer.data.get("username"), password=serializer.data.get("password"))
            user.save()
            return HttpResponse("User Registration Success")
def login(request):
    return "Hello"


