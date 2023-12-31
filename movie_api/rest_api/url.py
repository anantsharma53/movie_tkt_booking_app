from django.urls import path
from .import views
from .views import *
from django.views.decorators.csrf import csrf_exempt
urlpatterns=[
    path('user/signup/',csrf_exempt(SignUpView.as_view()),name='user-signup'),
    path('user/signin/',csrf_exempt(SignInView.as_view()),name='user-login'),
    path('movies/add',csrf_exempt(AddMovieAPIView.as_view()),name='add-movie'),
    path('movies/del/<int:movie_id>/',csrf_exempt(DeleteMovieAPIView.as_view()),name='delete-movie'),
    path('movies/list/',csrf_exempt(GetMovieViews.as_view()),name='list-movie'),
    path('movies/all/',csrf_exempt(MoviesAPI.as_view()),name='list-movie'),
    path('movies/genres/', GenreList.as_view(), name='genre-list'),
    path('movies/language/', UniqueLanguagesAPI.as_view(), name='unique-languages'),
    path('movie/<int:id>/', GetMovieDetailsViews.as_view(), name='movie-detail'),
    path('movies/showtime/<int:movie_id>/', AvailableShowTimes.as_view(), name='Avilable-show-time'),
    path('movies/<int:movie_id>/add_theater/', TheaterCreateView.as_view(), name='add-theater-to-movie'),
    path('movie/the/<int:id>/', GetTheaterDetailsViews.as_view(), name='Theater-Details'),
    path('movies/book-seat/', csrf_exempt(SeatBookingView.as_view()), name='book-seat'),
    path('delete-seat/', csrf_exempt(DeleteSeatView.as_view()), name='Delete-seat'),
    path('reserved-seats/<int:theater_id>/<int:movie_id>/<str:date>/<str:movie_timing>/', BookedSeatView.as_view(), name='reserved-seats-list'),
    path('movies/tickets/', csrf_exempt(BookingDetailsView.as_view()), name='book-Tickets-details'),
    
]