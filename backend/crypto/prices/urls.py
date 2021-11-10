from django.urls import path
from . import views
import requests
from .views import UserList
from .views import current_user


urlpatterns = [
    path('', views.get_covalent_prices),
    path('update-wallet-prices/', views.update_wallet_balance),
    path('startup-request-prices/', views.get_covalent_prices),

    path('current_user/', views.current_user),
    path('users/', UserList.as_view())
]
