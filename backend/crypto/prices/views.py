from django.http.response import JsonResponse
from django.http import JsonResponse
import requests
import json
from helper.get_crypto_prices import *
from rest_framework.decorators import api_view
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
    if not 'price_list' in request.session or check_if_longer_than_30_seconds(request):
        get_covalent_all_crypto_prices(request)
    else :
        print('Using pre-cached data')
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
