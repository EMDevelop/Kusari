from django.http.response import JsonResponse
from django.shortcuts import render
from django.http import JsonResponse

from helper.get_crypto_prices import *

# Create your views here.
def get_coin_gecko_prices(request):
    if check_if_longer_than_30_seconds(request) == True: 
        get_coingecko_all_crypto_prices(request);
        return JsonResponse({'status': 'Fetched prices'})
    else:
        return JsonResponse({'status': 'has not been 30 seconds'})

def get_price_from_session_by_symbol(request, symbol):
    print(request.session['price_list']['tokens'][symbol]['current_price'])
    return JsonResponse({'getting': 'stuff'})



# This is a repeat request.
# It should check if new prices are needed
# If they are, go get them and then return the Json
# Otherwise do not. 
def updateSingleWalletBalance(request):
  # if it hasn't been 30 seconds, return json: not been 30 seconds
    # get_coin_gecko_prices(request)
    # current_wallet = request.GET['tokens']
    # for token in current_wallet:
    #     # check storage using token as key
    #     if token in request.session['price_list']['tokens']:
    #         # set current_wallet token to the storage token
    #         current_wallet[token] = request.session['price_list']['tokens'][token]['current_price']
    return JsonResponse({'tokens': 'current_wallet'})
