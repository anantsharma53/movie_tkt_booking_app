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
from rest_framework.response import Response
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
                'is_staff':user.is_staff,
                'is_superuser':user.is_superuser
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

class AddMovieAPIView(APIView):
    permission_classes=[IsAuthenticated]
    def post(self, request):
        serializer = MovieSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class GetMovieViews(APIView):
    permission_classes=[IsAuthenticated]    
    def get(self, request):
        page_number =request.GET.get('page',1)
        movies=Movie.objects.all().order_by("id")
        paginator = Paginator(movies, 5)
        page = paginator.get_page(page_number)
        users_on_page = page.object_list
        user_serialized = MovieSerializer(users_on_page, many=True).data
        return JsonResponse({
        'results': user_serialized, 
        'num_pages': paginator.num_pages, 
        "total_user": movies.count()})
    
# class GetMovieDetailsViews(APIView):    
#     def get(self, request, id):
#         movies = Movie.objects.all()
#         movies = movies.filter(id=id)  # Use the correct model name
#         movie_serialized = MovieSerializer(movies, many=True).data
#         return JsonResponse(movie_serialized, status=200, safe=False)
class GetMovieDetailsViews(APIView):
    def get(self, request, id):
        try:
            product = Movie.objects.get(id=id)
            serializer = MovieSerializer(product)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Movie.DoesNotExist:
            return Response({"detail": "Product not found"}, status=status.HTTP_404_NOT_FOUND)
            
class MoviesAPI(View):
    def get(self, request):
        # Implement fetching all movies with optional filtering based on genre, language, location, and rating
        genre = request.GET.get('genre')
        language = request.GET.get('language')
        location = request.GET.get('location')
        title = request.GET.get('title')
        rating=request.GET.get('rating')

        movies = Movie.objects.all()
       
        if title:
            movies = movies.filter(title__icontains=title)

        if genre:
            movies = movies.filter(genre=genre)

        if language:
            movies = movies.filter(language=language)

        if location:
            # Apply location filtering logic here if you have it as a field in the Movie model
            pass

        if rating:
            movies = movies.filter(rating=rating)
        movie_serialized = MovieSerializer(movies, many=True).data

        return JsonResponse( movie_serialized, status=200, safe=False)
    
class GenreList(APIView):
    def get(self, request, format=None):
        # Query unique genres from the Movie model
        unique_genres = Movie.objects.values_list('genre', flat=True).distinct()
        # Convert the QuerySet to a list
        genre_list = list(unique_genres)
        return JsonResponse(genre_list, status=status.HTTP_200_OK, safe=False) 
     
class UniqueLanguagesAPI(APIView):
    def get(self, request):
        languages = Movie.objects.values_list('language', flat=True).distinct()
        language_list=list(languages)
        return JsonResponse(language_list, status=status.HTTP_200_OK,safe=False)

class AddMovieToTheaterAPIView(APIView):
    def post(self, request, *args, **kwargs):
        movie_serializer = MovieSerializer(data=request.data.get('movie'))
        theater_serializer = TheaterSerializer(data=request.data.get('theater'))

        if movie_serializer.is_valid() and theater_serializer.is_valid():
            movie = movie_serializer.save()
            theater = theater_serializer.save(movie=movie)
            return Response({
                "movie": movie_serializer.data,
                "theater": theater_serializer.data
            }, status=status.HTTP_201_CREATED)

        errors = {}
        if not movie_serializer.is_valid():
            errors['movie'] = movie_serializer.errors
        if not theater_serializer.is_valid():
            errors['theater'] = theater_serializer.errors

        return Response(errors, status=status.HTTP_400_BAD_REQUEST)

class AddMovieToTheaterAPIView(APIView):
    def post(self, request, *args, **kwargs):
        movie_id = request.data.get('movie_id')
        theater_id = request.data.get('theater_id')
        
        try:
            movie = Movie.objects.get(id=movie_id)
            theater = Theater.objects.get(id=theater_id)
        except Movie.DoesNotExist:
            return Response({"error": "Movie not found"}, status=status.HTTP_404_NOT_FOUND)
        except Theater.DoesNotExist:
            return Response({"error": "Theater not found"}, status=status.HTTP_404_NOT_FOUND)
        
        theater.movie = movie
        theater.save()
        
        return Response({
            "message": f"Movie '{movie.title}' added to theater '{theater.name}'"
        }, status=status.HTTP_201_CREATED)



class SeatSelectionAndBookingAPIView(APIView):
    def post(self, request, *args, **kwargs):
        movie_serializer = MovieSerializer(data=request.data.get('movie'))
        theater_serializer = TheaterSerializer(data=request.data.get('theater'))
        seat_serializer = SeatSerializer(data=request.data.get('seats'))
        
        if movie_serializer.is_valid() and theater_serializer.is_valid() and seat_serializer.is_valid():
            movie = movie_serializer.save()
            theater = theater_serializer.save(movie=movie)
            seats = seat_serializer.save(theater=theater, movie=movie)
            total_cost = sum(seat.price for seat in seats)
            
            booking_data = {
                "user": request.user.id,  # You need to replace this with the actual user ID
                "movie": movie.id,
                "seats": [seat.id for seat in seats],
                "total_cost": total_cost
            }
            
            booking_serializer = BookingSerializer(data=booking_data)
            if booking_serializer.is_valid():
                booking_serializer.save()
                return Response(booking_serializer.data, status=status.HTTP_201_CREATED)
            
            return Response(booking_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        errors = {}
        if not movie_serializer.is_valid():
            errors['movie'] = movie_serializer.errors
        if not theater_serializer.is_valid():
            errors['theater'] = theater_serializer.errors
        if not seat_serializer.is_valid():
            errors['seats'] = seat_serializer.errors
        
        return Response(errors, status=status.HTTP_400_BAD_REQUEST)
