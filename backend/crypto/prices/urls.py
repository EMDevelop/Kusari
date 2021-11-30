from django.urls import path
from . import views
from .views import UserList
from .views import current_user


urlpatterns = [
    path('', views.get_covalent_prices),
    path('update-wallet-prices/', views.update_wallet_balance),
    path('startup-request-prices/', views.get_covalent_prices),
    path('top-coins/', views.get_top_100_tokens),
    path('coin-info/<symbol>/', views.get_coin_info),
    # Ideally re-factor into a general App for users / models
    path('current_user/', views.current_user),
    path('users/', UserList.as_view())


]
