from django.urls import path
from . import views

urlpatterns = [
    path('wallet-balance/', views.get_wallet_balance)
]