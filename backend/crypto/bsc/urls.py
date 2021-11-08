from django.urls import path
from . import views

urlpatterns = [
    path('wallet-balance/<address>/', views.get_bep20_wallet_balance)
]