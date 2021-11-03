from django.shortcuts import render
from django.http import JsonResponse
import requests
import json
import os

# localhost:8000/ethereum/wallet-balance/0xdB3c617cDd2fBf0bb4309C325F47678e37F096D9

# Create your views here.
# def get_wallet_balance(request):
#     return JsonResponse({'balance': '$100'})

def get_wallet_balance(request):
    url = "https://deep-index.moralis.io/api/v2/0xdB3c617cDd2fBf0bb4309C325F47678e37F096D9/erc20?chain=eth"
        
    headers = {
    'x-api-key': os.environ['MORALIS_API_KEY']
    }

    response = requests.request("GET", url, headers=headers)        
    tokens = json.loads(response.text)
    token_list = []

    for token in tokens:
        token_dict = {}
        token_dict['token'] = token['symbol']
        token_dict['balance'] = token['balance']
        token_dict['name'] = token['name']
        token_list.append(token_dict)    
    
    return JsonResponse(token_list,safe=False)


# def get_wallet_balance(request):
#     return render(request, "home.html")


# class Tokens: 
#     def __init__(self, wallet_address):
#         self.wallet_address = wallet_address   

#     def get_tokens(self):       

#         url = "https://deep-index.moralis.io/api/v2/0xdB3c617cDd2fBf0bb4309C325F47678e37F096D9/erc20?chain=eth"
        
#         headers = {
#         'x-api-key': os.environ['MORALIS_API_KEY']
#         }

#         response = requests.request("GET", url, headers=headers)        
#         tokens = json.loads(response.text)
#         token_list = []

#         for token in tokens:
#             token_dict = {}
#             token_dict['token'] = token['symbol']
#             token_dict['balance'] = token['balance']
#             token_dict['name'] = token['name']
#             token_list.append(token_dict)
       
#         return token_list

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

