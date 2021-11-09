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
def get_coin_gecko_prices(request):
<<<<<<< HEAD
    if check_if_longer_than_30_seconds(request) == True: 
        get_coingecko_all_crypto_prices(request)
        return JsonResponse({'status': 'Fetched prices'})
    else:
        return JsonResponse({'status': 'has not been 30 seconds'})
=======
    get_coingecko_all_crypto_prices(request)
    return JsonResponse({'status': 'Fetched prices'})

>>>>>>> f9e93a2ceaef0abfe75526fc9449604211a62d77


def update_wallet_balance(request):
    # This is a repeat request triggered every 30 seconds to update the `lookup wallet` screen
    # We fetch the most up to date prices froms storage and return them to the screen. 
    get_coin_gecko_prices(request)
    current_wallet = json.loads(request.GET['tokens'])

    for token in current_wallet:
        try:
            token['USDperUnit'] = get_item_from_storage(request, token['token'].lower(), 'current_price')
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