import json

from django.http import HttpResponse
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt;
from rest_framework.decorators import api_view
from .serializers import UserSerializer, PostSerializer
from .models import User, Post
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


@csrf_exempt
@api_view(['POST'])
def add_post(request):
    if request.method == 'POST':
        serializer = PostSerializer(data=request.data)
        if serializer.is_valid():
            post = Post(title=serializer.data.get("title"), description=serializer.data.get("description"))
            post.save()
            return HttpResponse("Added Post")

@csrf_exempt
@api_view(['GET'])
def view_posts(request):
    posts = Post.objects.all()
    serializer = PostSerializer(posts, many=True)
    return JsonResponse({'posts': serializer.data})

def login(request):
    return "Hello"


