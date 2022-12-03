from django.db import models

# Create your models here.


class User(models.Model):
    email = models.EmailField(null=True)
    username = models.CharField(max_length=100)
    password = models.CharField(max_length=200)


class Post(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(max_length=15000)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)





