from django.urls import path
from . import views

urlpatterns = [
    path('', views.get_coin_gecko_prices),
    path('read/<symbol>', views.get_price_from_session_by_symbol)
]