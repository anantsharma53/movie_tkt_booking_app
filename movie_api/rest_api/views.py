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
from django.shortcuts import get_object_or_404
from datetime import datetime
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
    
class TheaterCreateView(APIView):
    def post(self, request, movie_id):
        print(request.data)
        try:
            movie = Movie.objects.get(id=movie_id)
            request.data['movie'] = movie_id
        except Movie.DoesNotExist:
            return Response({"message": "Movie not found"}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = TheaterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(movie=movie)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    


class GetTheaterDetailsViews(APIView):
    def get(self, request, id):
        try:
            product = Theater.objects.get(movie=id)
            serializer = TheaterSerializer(product)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Movie.DoesNotExist:
            return Response({"detail": "Theater not found"}, status=status.HTTP_404_NOT_FOUND)
          

class SeatBookingView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request, format=None):
        data = request.data
        theater_id = data.get('theater')
        seats_data = data.get('seats')
        category = data.get('category')
        movie_id = data.get('movie')
        price = data.get('price')
        movie_timing=data.get('movie_timing')
        date=data.get('date')
        
        # Create the Booking object
        booking = Booking(user=request.user, movie_id=movie_id,total_cost=len(seats_data)*price)
        booking.save()

        # Create Seat objects for each seat in the list
        for seat_number in seats_data:
            seat = Seat(
                theater_id=theater_id,
                movie_id=movie_id,
                seat_number=seat_number,
                category=category,
                price=price,
                is_reserved=True,
                movie_timing= movie_timing,
                date=date,
                user=request.user
            )
            seat.save()
            booking.seats.add(seat)

        return Response({'message': 'Booking created successfully'}, status=status.HTTP_201_CREATED)


class BookedSeatView(APIView):
    def get(self, request, theater_id, movie_id, date, movie_timing):

        queryset = Seat.objects.filter(
            theater_id=theater_id,
            movie_id=movie_id,
            date=date,
            movie_timing=movie_timing,
            is_reserved=True  # Filter only reserved seats
        )
        
        # serializer = SeatSerializer(queryset, many=True)
        seat_numbers = [seat.seat_number for seat in queryset]
        # You can customize the response data here if needed
        response_data = {
            # 'reserved_seats': serializer.data
            'reserved_seat_numbers': seat_numbers
        }

        return Response(response_data)
    
# class BookingDetailsView(APIView):
#     permission_classes = [IsAuthenticated]
#     def get(self, request):
        
#         currdate=datetime.now().date()
#         date= request.GET.get('date',currdate)
#         user=request.user
#         userDetail=User.objects.filter(id=user)
#         ticketDetails=Seat.objects.filter(user_id=user,date=date)
#         theaterDetails=Theater.objects.filter(theater_id=ticketDetails.theater_id)

class BookingDetailsView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        user = request.user
        date_param = request.GET.get('date', None)
        if date_param is None:
            seats = Seat.objects.filter(user_id=user)
        else:
            seats = Seat.objects.filter(user_id=user, date=date_param).values(
                    'id','theater_id','movie_id','seat_number','is_reserved','category','price','date','movie_timing','user_id')
        user_serializer = UserSerializer(user).data
        seat_serializer = SeatSerializer(seats, many=True).data
        theater_ids = seats.values_list('theater_id',flat=True).distinct()
        theater_id_list = list(theater_ids)
        print(theater_ids)
        theaters = Theater.objects.filter(id=theater_ids[0])
        theater_serializer = TheaterSerializer(theaters, many=True).data
        # booking=Booking.objects.filter(user_id=user,movie_id=)
        # print(booking)
        response_data = {
            'user_details': user_serializer,
            'seat_details': seat_serializer,
            'theater_details': theater_serializer,
        }
        return Response(response_data)
    




