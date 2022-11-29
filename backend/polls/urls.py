from django.urls import path

from . import views

urlpatterns = [
        path('', views.index, name='index'),
        path('register', views.register, name='register'),
        path('login', views.login, name='login'),
        path('add-post', views.add_post, name='add_post'),
        path('view-posts', views.view_posts, name='view_posts')
        ]
