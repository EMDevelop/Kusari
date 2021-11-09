from django.urls import path
from . import views

urlpatterns = [
    path('get-prices/<username>', views.get_all_wallet_prices)
]