from django.urls import path
from . import views

urlpatterns = [
    path('wallet-balance/<address>/<request_type>', views.get_btc_balance)
]

