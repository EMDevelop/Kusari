from django.urls import path
from . import views
from .views import UserList
from .views import current_user
from rest_framework_jwt.views import obtain_jwt_token


urlpatterns = [
    path('current_user/', views.current_user),
    path('users/', UserList.as_view()),
    path('token-auth/', obtain_jwt_token),
]