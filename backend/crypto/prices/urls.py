from django.urls import path
from . import views
import requests

urlpatterns = [
    path('', views.get_coin_gecko_prices),
    path('update-wallet-prices/', views.updateSingleWalletBalance),
]
