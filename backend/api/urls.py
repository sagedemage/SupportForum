from django.urls import path

from . import views

urlpatterns = [
        path('register', views.register, name='register'),
        path('login', views.login, name='login'),
        path('add-post', views.add_post, name='add_post'),
        path('view-posts', views.view_posts, name='view_posts'),
        path('test', views.test, name='test')
        ]
