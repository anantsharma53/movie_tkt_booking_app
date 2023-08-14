from django.db import models
from django.contrib.auth.models import BaseUserManager,AbstractBaseUser
# Create your views here.
class UserManager(BaseUserManager):
    def create_user(self,username,password,**extra_fields):
        if not username:
            raise ValueError("Username sholud be provided")
        extra_fields.setdefault('is_staff',False)
        extra_fields.setdefault('is_superuser',False)
        user=self.model(username=username,**extra_fields)
        user.set_password(password)
        user.save()
        return user
    def create_superuser(self,username,password,**extra_fields):
        extra_fields.setdefault('is_staff',True)
        extra_fields.setdefault('is_superuser',True)
        return self.create_user(username,password,**extra_fields)
    
class User(AbstractBaseUser):
    id=models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    username = models.CharField(max_length=30,unique=True)
    email= models.EmailField(max_length=100,unique=True)
    mobile_number = models.CharField(max_length=15)
    password=models.CharField(max_length=100)
    is_staff=models.BooleanField(default=False)
    is_superuser=models.BooleanField(default=False)

    
    USERNAME_FIELD='username'
    objects=UserManager()

