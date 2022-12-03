import json

from django.http import HttpResponse
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt;
from rest_framework.decorators import api_view
from .serializers import UserSerializer, PostSerializer
from .models import User, Post
from django.contrib.auth.hashers import make_password, check_password
from django.shortcuts import render
# Create your views here.


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
def login(request):
    contains_email = User.objects.filter(email__exact=request.data.get("username"))
    contains_username = User.objects.filter(username__exact=request.data.get("username"))
    entered_password = request.data.get("password")
    if contains_email.exists():
        actual_password = contains_email.values_list('password', flat=True).get()
        password_match = check_password(entered_password, actual_password)
        if password_match:
            return HttpResponse("Successful Login")
        else:
            return HttpResponse("Failed to Login")
    elif contains_username.exists():
        actual_password = contains_username.values_list('password', flat=True).get()
        password_match = check_password(entered_password, actual_password)
        if password_match:
            return HttpResponse("Successful Login")
        else:
            return HttpResponse("Failed to Login")
    else:
        return HttpResponse("User does not exist")


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


@csrf_exempt
@api_view(['GET'])
def test(request):
    return JsonResponse({'response': 'test'})





