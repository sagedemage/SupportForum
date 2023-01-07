from django.http import HttpResponse
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt;
from rest_framework.decorators import api_view
from .serializers import UserSerializer, PostSerializer
from .models import User, Post
from django.contrib.auth.hashers import make_password, check_password

from dotenv import load_dotenv
import jwt
import os
# Create your views here.

load_dotenv()  # take environment variables from .env.


@csrf_exempt
@api_view(['POST'])
def register(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        email_match = User.objects.filter(email__exact=serializer.data.get("email"))
        username_match = User.objects.filter(username__exact=serializer.data.get("username"))
        password = serializer.data.get("password")
        if email_match.exists() is True:
            return JsonResponse({'registered': False, 'err_msg': "Email Already exists"})
        elif username_match.exists() is True:
            return JsonResponse({'registered': False, 'err_msg': "Username Already exists"})
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
                user_id = email_match.values_list('id', flat=True).get()
                token = generate_token(user_id)
                return JsonResponse({'auth': True, 'token': token, 'success_msg': "Successful Login"})
            else:
                return JsonResponse({'auth': False, 'err_msg': "Failed to Login"})
        elif username_match.exists():
            actual_password = username_match.values_list('password', flat=True).get()
            password_match = check_password(entered_password, actual_password)
            if password_match:
                user_id = username_match.values_list('id', flat=True).get()
                token = generate_token(user_id)
                return JsonResponse({'auth': True, 'token': token, 'success_msg': "Successful Login"})
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
    user_id = request.data.get("user_id")
    posts = Post.objects.filter(user_id__exact=user_id)
    serializer = PostSerializer(posts, many=True)
    return JsonResponse({'posts': serializer.data})


@csrf_exempt
@api_view(['POST'])
def get_decoded_token(request):
    token = request.data.get("token")
    decoded_token = decode_token(token)
    auth = decoded_token.get('auth')
    user_id = decoded_token.get('user_id')
    return JsonResponse({'auth': auth, 'user_id': user_id})


def generate_token(user_id):
    secret = os.getenv("JWT_SECRET")
    encoded = jwt.encode({"auth": True, "user_id": user_id}, secret, algorithm="HS256")
    return encoded


def decode_token(encoded):
    secret = os.getenv("JWT_SECRET")
    decoded = jwt.decode(encoded, secret, algorithms=["HS256"])
    return decoded






