from django.urls import path
from . import views

urlpatterns = [
    path('', views.walletsOverview, name='wallets-overview'),
    path('wallet-list/', views.walletList, name='wallet-list'),
    path('user-wallet-list/<user_id>/', views.userWalletList, name='user-wallet-list'),
    path('wallet-detail/<str:pk>/', views.walletDetail, name='wallet-detail'),
    path('wallet-create/', views.walletCreate, name='wallet-create'),
    path('wallet-update/<str:pk>/', views.walletUpdate, name='wallet-update'),
    path('wallet-delete/<str:pk>/', views.walletDelete, name='wallet-delete'),

    path('get-prices/<user_id>', views.get_all_wallet_prices)
]