from django.http.response import JsonResponse
from django.shortcuts import render
from django.http import JsonResponse
import requests
import json
import os
from helper.get_crypto_prices import *
from django.http import HttpResponseRedirect
from django.contrib.auth.models import User
from rest_framework import permissions, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserSerializer, UserSerializerWithToken
from helper.get_from_session_storage import *

# Create your views here.
def get_top_100_tokens(request): 
    url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
    headers = {"Content-Type": "application/json"}
    response = requests.request("GET", url, headers=headers)
    tokens = json.loads(response.text)
    return JsonResponse({'tokens': tokens})

@api_view(['GET'])
def get_coin_info(request, symbol): 
    url = "https://min-api.cryptocompare.com/data/pricemultifull?fsyms=" + symbol + "&tsyms=USD"
    headers = {"Content-Type": "application/json"}
    response = requests.request("GET", url, headers=headers)
    tokens = json.loads(response.text)
    return JsonResponse({'tokens': tokens})


def get_covalent_prices(request):
    if not 'price_list' in request.session or check_if_longer_than_30_seconds(request):
        get_covalent_all_crypto_prices(request)
    else :
        print('Using pre-cached data')
    return JsonResponse({'status': 'Fetched prices'})

def update_wallet_balance(request):
    # This is a repeat request triggered every 30 seconds to update the `lookup wallet` screen
    # We fetch the most up to date prices froms storage and return them to the screen. 
    get_covalent_all_crypto_prices(request)
    current_wallet = json.loads(request.GET['tokens'])

    for token in current_wallet:
        try:
            token['USDperUnit'] = get_item_from_storage(request, token['contract_address'].lower(), 'current_price')
        except:
            token['USDperUnit'] = "N/A"

        if not token['USDperUnit'] == "N/A":
            try:
                token['BalanceInUSD'] = token['USDperUnit'] * token['quantity']
            except:
                token['BalanceInUSD'] = "N/A"
    
    return JsonResponse({'updated_tokens': current_wallet})

# Hope to refactor this into a Users app. 
@api_view(['GET'])
def current_user(request):
    """
    Determine the current user by their token, and return their data
    """
    serializer = UserSerializer(request.user)
    return Response(serializer.data)


class UserList(APIView):
    """
    Create a new user. It's called 'UserList' because normally we'd have a get
    method here too, for retrieving a list of all User objects.
    """

    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = UserSerializerWithToken(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)