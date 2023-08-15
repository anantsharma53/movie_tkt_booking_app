from django.urls import path
from .import views
from .views import *
from django.views.decorators.csrf import csrf_exempt
urlpatterns=[
    path('user/signup/',csrf_exempt(SignUpView.as_view()),name='user-signup'),
]