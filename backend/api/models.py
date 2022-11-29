from django.db import models

# Create your models here.


class User(models.Model):
    username = models.CharField(max_length=200)
    password = models.CharField(max_length=200)


class Post(models.Model):
    title = models.CharField(max_length=200)
    description = models.CharField(max_length=200)



