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

def get_wallet_balance(request, address):

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
        token_dict['balance'] = create_decimal_from_number(token['balance'], token['decimals'])
        token_dict['name'] = token['name']
        token_list.append(token_dict)


    return JsonResponse(token_list,safe=False)


#     def token_prices(self,token_data):
#         # pass in token array for getting prices using cryptocompare
#         token = token_data['token']         
#         url = "https://min-api.cryptocompare.com/data/price?fsym=" + token + "&tsyms=USD,EUR,GBP&api_key=" + os.environ['CRYPTOCOMPARE_API_KEY']
#         response = requests.request("GET", url)
#         token_prices = json.loads(response.text)        
#         token_wallet_prices = {**token_data, **token_prices}
#         print('------')
#         print(token_wallet_prices)

#         return token_wallet_prices

#     def get_tokens_in_wallet(self):
#         # get the tokens in the wallet, pass the Symbol from token_list to token prices to add the prices to the dict wallet
#         token_list = self.get_tokens()
#         wallet = []
#         for token in token_list:            
#             wallet.append(self.token_prices(token))     
        
#         return wallet

