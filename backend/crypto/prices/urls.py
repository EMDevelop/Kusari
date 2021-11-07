from django.urls import path
from . import views

urlpatterns = [
    path('', views.get_coin_gecko_prices),
    path('update-wallet-prices/', views.say_hello)
]