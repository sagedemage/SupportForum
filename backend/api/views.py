import json

from django.http import HttpResponse
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt;
from rest_framework.decorators import api_view
from .serializers import UserSerializer, PostSerializer
from .models import User, Post
from django.contrib.auth.hashers import make_password, check_password
# Create your views here.


@api_view(['GET'])
def index(request):
    return HttpResponse("Hello, world. You are at the api index")


@csrf_exempt
@api_view(['POST'])
def register(request):
    if request.method == 'POST':
        contains_email = User.objects.filter(email__contains=request.data.get("email"))
        contains_username = User.objects.filter(username__contains=request.data.get("username"))
        password = request.data.get("password")
        confirm = request.data.get("confirm")
        if contains_email.exists() is True:
            return HttpResponse("Email Already exists")
        elif contains_username.exists() is True:
            return HttpResponse("User Already exists")
        elif password != confirm:
            return HttpResponse("Passwords Do Not Match")
        else:
            hashed_password = make_password(password)
            user = User(email=request.data.get("email"), username=request.data.get("username"),
                        password=hashed_password)
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


