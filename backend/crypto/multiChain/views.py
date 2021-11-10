from django.http import response
from django.http.response import JsonResponse
from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import WalletSerializer
from .models import Wallet
from .models import User
import json
from crypto.helper.add_dictionary_to_session import *
from crypto.bsc.views import get_bep20_wallet_balance
from crypto.ethereum.views import get_ethereum_and_erc20_wallet_balance

# Create your views here.

@api_view(['GET'])
def walletsOverview(request):
    wallet_urls = {
        'List':'/wallet-list/',
        'Detail View':'/wallet-detail/<str:pk>/',
        'Create':'/wallet-create/',
        'Update':'/wallet-update/<str:pk>',
        'Delete':'wallet-delete/<str:pk>',
    }
    return Response(wallet_urls)

@api_view(['GET'])
def walletList(request):
    wallets = Wallet.objects.all()
    serializer = WalletSerializer(wallets, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def walletDetail(request, pk):
    wallets = Wallet.objects.get(id=pk)
    serializer = WalletSerializer(wallets, many=False)
    return Response(serializer.data)

@api_view(['POST'])
def walletCreate(request):
    serializer = WalletSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    
    return Response(serializer.data)

@api_view(['POST'])
def walletUpdate(request, pk):
    wallet = Wallet.objects.get(id=pk)
    serializer = WalletSerializer(instance=wallet, data=request.data)
    if serializer.is_valid():
        serializer.save()
    
    return Response(serializer.data)

@api_view(['DELETE'])
def walletDelete(request, pk):
    wallet = Wallet.objects.get(id=pk)
    wallet.delete()
    return Response('Item deleted')

# There will still be an empty saved walled which needs updating - this could cause problems later
@api_view(['GET'])
def userWalletList(request, user_id):
    wallets = Wallet.objects.filter(user=user_id)
    serializer = WalletSerializer(wallets, many=True)
    arrayOfWallets = serializer.data
    if len(arrayOfWallets) == 0:
        singleWallet = Wallet.objects.create(user = request.user, wallet_type = "", wallet_address = "")
        add_wallets_to_storage(request, singleWallet)
        return Response(json.load(singleWallet))
    else:   
        add_wallets_to_storage(request, arrayOfWallets)    
        return Response(arrayOfWallets)

def get_all_wallet_prices(request, user_id):
    # Go into model, get the wallets for that user
    # for each address, get prices feturned from each app and append do dictionary
    # Get prices as usual from storage
    # Return the token info  and the prices to the client.
    user_wallets = request.session['wallet_list']
    print(user_wallets)
    for wallet in user_wallets:
        if wallet.wallet_type == 'Ethereum':
            get_ethereum_and_erc20_wallet_balance(request, wallet.wallet_address, "multi")
        elif wallet.wallet_type == 'BSC':
            get_bep20_wallet_balance(request, wallet.wallet_address, "multi")
    
    return render(request, 'multiChain/wallet_prices.html')
