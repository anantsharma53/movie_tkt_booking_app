from django.shortcuts import render
from django.views import View
from .serializers import *
from django.http import HttpResponse, JsonResponse, HttpResponseBadRequest, Http404
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.pagination import PageNumberPagination
from django.core.paginator import Paginator
import json
import random
import copy
from .models import *
# Create your views here.
class SignUpView(APIView):
    def post(self,request):
        serializer=UserSerializer(data=request.data)
        if serializer.is_valid():
            user=serializer.save()
            refresh=RefreshToken.for_user(user)
            return JsonResponse({
                'refresh':str(refresh),
                'access':str(refresh.access_token)
            },
            status=status.HTTP_201_CREATED)
        return JsonResponse(serializer.error,status.HTTP_400_BAD_REQUEST,safe=False)
       
class SignInView(APIView):
    def post(self,request):
        serializer=LoginSerializer(data=request.data)
        user_data={}
        if serializer.is_valid():
            user=serializer.validated_data
            refresh=RefreshToken.for_user(user)
            user_data = {
                'id': user.id,
                'username': user.username,
                'email': user.email,
                'name':user.name,
                'mobile_number':user.mobile_number,
                'is_superuser':user.is_superuser
                # Add other user details you want to include
            }
            return JsonResponse({
                'user': user_data,
                'refresh':str(refresh),
                'access':str(refresh.access_token)
            },
            status=status.HTTP_201_CREATED)
        return JsonResponse(serializer.error,status.HTTP_400_BAD_REQUEST,safe=False)

class UserUpdatView(APIView):
    permission_classes=[IsAuthenticated]
    def put(self, request):        
        user = get_object_or_404(User, pk=request.user.id)
        try:
            data = json.loads(request.body)
            serializer = UserSerializer(user, data=data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return JsonResponse(serializer.data)
            return JsonResponse(serializer.errors, status=400)
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON"}, status=400)