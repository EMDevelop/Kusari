from django.urls import path
from . import views
from .views import current_user, UserList

urlpatterns = [
    path('', views.get_coin_gecko_prices),
    path('current_user/', views.current_user),
    path('users/', UserList.as_view())
]