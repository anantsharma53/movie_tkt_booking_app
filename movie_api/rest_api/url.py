from django.urls import path
from .import views
from .views import *
from django.views.decorators.csrf import csrf_exempt
urlpatterns=[
    path('user/signup/',csrf_exempt(SignUpView.as_view()),name='user-signup'),
    path('user/signin/',csrf_exempt(SignInView.as_view()),name='user-login'),
    path('movies/add',csrf_exempt(AddMovieAPIView.as_view()),name='add-movie'),
    path('movies/list/',csrf_exempt(GetMovieViews.as_view()),name='list-movie'),
    path('movies/all/',csrf_exempt(MoviesAPI.as_view()),name='list-movie'),
]