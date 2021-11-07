from django.http.response import JsonResponse
from django.shortcuts import render
from django.http import JsonResponse
import requests
import json
import os
from helper.get_crypto_prices import *


# Create your views here.
def get_coin_gecko_prices(request):
    get_coingecko_all_crypto_prices(request);
    return JsonResponse({'hello': 'world'})