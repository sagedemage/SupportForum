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
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        email_match = User.objects.filter(email__exact=serializer.data.get("email"))
        username_match = User.objects.filter(username__exact=serializer.data.get("username"))
        password = serializer.data.get("password")
        confirm = request.data.get("confirm")
        if email_match.exists() is True:
            return JsonResponse({'registered': False, 'err_msg': "Email Already exists"})
        elif username_match.exists() is True:
            return JsonResponse({'registered': False, 'err_msg': "Username Already exists"})
        elif password != confirm:
            return JsonResponse({'registered': False, 'err_msg': "Passwords Do Not Match"})
        elif len(password) < 8:
            return JsonResponse({'registered': False, 'err_msg': "Password must be at least 8 characters"})
        else:
            hashed_password = make_password(password)
            user = User(email=serializer.data.get("email"), username=serializer.data.get("username"),
                        password=hashed_password)
            user.save()
            return JsonResponse({'registered': True, 'success_msg': "User Registration Success"})


@csrf_exempt
@api_view(['POST'])
def login(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        email_match = User.objects.filter(email__exact=serializer.data.get("username"))
        username_match = User.objects.filter(username__exact=serializer.data.get("username"))
        entered_password = serializer.data.get("password")
        if email_match.exists():
            actual_password = email_match.values_list('password', flat=True).get()
            password_match = check_password(entered_password, actual_password)
            if password_match:
                return JsonResponse({'auth': True, 'success_msg': "Successful Login"})
            else:
                return JsonResponse({'auth': False, 'err_msg': "Failed to Login"})
        elif username_match.exists():
            actual_password = username_match.values_list('password', flat=True).get()
            password_match = check_password(entered_password, actual_password)
            if password_match:
                return JsonResponse({'auth': True, 'success_msg': "Successful Login"})
            else:
                return JsonResponse({'auth': False, 'err_msg': "Failed to Login"})
        else:
            return JsonResponse({'auth': False, 'err_msg': "User does not exist"})
    else:
        return JsonResponse({'auth': False, 'err_msg': "Data is not valid"})


@csrf_exempt
@api_view(['POST'])
def add_post(request):
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





