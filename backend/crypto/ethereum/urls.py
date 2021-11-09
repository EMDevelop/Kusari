from django.urls import path
from . import views

urlpatterns = [
    path('wallet-balance/<address>/', views.get_ethereum_and_erc20_wallet_balance)
]