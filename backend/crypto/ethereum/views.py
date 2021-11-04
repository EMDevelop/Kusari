from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
import requests
import json
import os
# from dotenv import load_dotenv

# localhost:8000/ethereum/wallet-balance/0xdB3c617cDd2fBf0bb4309C325F47678e37F096D9

# Create your views here.

# First Param is a number, e.g. 123456789
# Second Param is a number, relating to how many decimals your number should resolve to, e.g. 5
# Return Value = 1234.56789
def create_decimal_from_number(number, decimals):
    return float(number) / pow(10, int(decimals))

def get_moralis_erc20(address):
    url = f"https://deep-index.moralis.io/api/v2/{address}/erc20?chain=eth"
        
    headers = {
    'x-api-key': os.environ['MORALIS_API_KEY']
    }

    response = requests.request("GET", url, headers=headers)        
    tokens = json.loads(response.text)
    token_list = []

    for token in tokens:
        token_dict = {}
        token_dict['token'] = token['symbol']
        token_dict['quantity'] = create_decimal_from_number(token['balance'], token['decimals'])
        token_dict['name'] = token['name']
        token_list.append(token_dict)

    return token_list

def get_list_of_symbols(array_of_token_dictionaries):
    array_of_symbols = []
    separator = ','
    for token in array_of_token_dictionaries:
        array_of_symbols.append(token['token'])
    return separator.join(array_of_symbols)

def get_cryptocompare_token_price_by_id(token_data):
    url = "https://min-api.cryptocompare.com/data/pricemulti?fsyms=" + get_list_of_symbols(token_data) + "&tsyms=USD"
    response = requests.request("GET", url)
    token_prices = json.loads(response.text)
    for token in token_data:
        try: 
            token['USDperUnit'] = token_prices[token['token']]['USD']
        except:
            token['USDperUnit'] = "N/A"
    print(token_data)
    return token_data

def get_token_current_value_in_USD(token_list):
    for token in token_list:
        try:
            token['BalanceInUSD'] = token['quantity'] * token['USDperUnit']
        except:
            token['BalanceInUSD'] = "N/A"
    return token_list

def get_wallet_balance(request, address):
    tokens = get_moralis_erc20(address) #refactor into next line
    tokens = get_cryptocompare_token_price_by_id(tokens)
    tokens = get_token_current_value_in_USD(tokens)
    return JsonResponse(tokens, safe=False)