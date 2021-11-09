from django.urls import path
from . import views

urlpatterns = [
    path('', views.walletsOverview, name='wallets-overview'),
    path('get-prices/<username>', views.get_all_wallet_prices)
]