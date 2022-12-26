from django.db import models
from django.urls import path, include
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    pass
