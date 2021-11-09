from django.urls import path
from . import views

urlpatterns = [
    path('', views.walletsOverview, name='wallets-overview'),
    path('wallet-list/', views.walletList, name='wallet-list'),
    path('wallet-detail/<str:pk>/', views.walletDetail, name='wallet-detail'),
    path('wallet-create/', views.walletCreate, name='wallet-create'),
    path('wallet-update/<str:pk>/', views.walletUpdate, name='wallet-update'),
    path('get-prices/<username>', views.get_all_wallet_prices)
]