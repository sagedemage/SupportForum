import json

from django.http import HttpResponse
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt;
from rest_framework.decorators import api_view
from .serializers import UserSerializer, PostSerializer
from .models import User, Post
from django.contrib.auth.hashers import make_password, check_password
# Create your views here.


@csrf_exempt
@api_view(['POST'])
def register(request):
    if request.method == 'POST':
        email_match = User.objects.filter(email__exact=request.data.get("email"))
        username_match = User.objects.filter(username__exact=request.data.get("username"))
        password = request.data.get("password")
        confirm = request.data.get("confirm")
        if email_match.exists() is True:
            return HttpResponse("Email Already exists")
        elif username_match.exists() is True:
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
    email_match = User.objects.filter(email__exact=request.data.get("username"))
    username_match = User.objects.filter(username__exact=request.data.get("username"))
    entered_password = request.data.get("password")
    if email_match.exists():
        actual_password = email_match.values_list('password', flat=True).get()
        password_match = check_password(entered_password, actual_password)
        if password_match:
            return HttpResponse("Successful Login")
        else:
            return HttpResponse("Failed to Login")
    elif username_match.exists():
        actual_password = username_match.values_list('password', flat=True).get()
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
            user = User.objects.filter(id=request.data.get("user_id"))
            if user.exists():
                post = Post(title=serializer.data.get("title"),
                            description=serializer.data.get("description"),
                            user_id=request.data.get("user_id"))
                post.save()
                return HttpResponse("Added Post")
            else:
                return HttpResponse("User Does Not Exist")
        else:
            return HttpResponse("Data not valid")



@csrf_exempt
@api_view(['POST'])
def view_posts(request):
    if request.method == 'POST':
        user_id = request.data.get("user_id")
        posts = Post.objects.filter(user_id__exact=user_id)
        serializer = PostSerializer(posts, many=True)
        return JsonResponse({'posts': serializer.data})


@csrf_exempt
@api_view(['GET'])
def test(request):
    return JsonResponse({'test_response': 'test'})





