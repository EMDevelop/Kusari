from django.urls import path
from . import views

urlpatterns = [
    path('wallet-balance/<address>/', views.get_wallet_balance)
]