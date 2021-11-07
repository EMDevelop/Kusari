from django.http.response import JsonResponse
from django.shortcuts import render
from django.http import JsonResponse
import requests
import json
import os
from helper.get_crypto_prices import *
from helper.date_parser import *

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

def check_if_longer_than_30_seconds(request):
  current_time = get_date_from_string(request.session['price_list']['last_updated'])
  if (datetime.now() - current_time).seconds > 30:
    return True
  else:
    return False

def say_hello(request):
    print('here:')
    print(request.GET['tokens'])
    # for token in request.GET['tokens[]']:
    #   print(token)
    print('^')
    return JsonResponse({'hello': 'world'})