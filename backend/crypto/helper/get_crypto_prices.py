from .get_symbols_from_dictionary import *
from .add_dictionary_to_session import *
from .date_parser import get_time_now_as_string
from pycoingecko import CoinGeckoAPI
import requests
import json
import os
from datetime import datetime
from helper.date_parser import *


# def get_cryptocompare_token_price_by_id(token_data):

#     # What does this method do?

#     # It takes in input of a list of dictionaries, one must be 'token': [{'token': 'BONDLY', 'name': 'Bondly Token', 'quantity': 993.3971165225804}, {'token': 'BSJ', 'name': 'BASENJI', 'quantity': 50.0}]
#     # It returns the same data but with an additional field, USDperUnit

#     url = "https://min-api.cryptocompare.com/data/pricemulti?fsyms=" + get_list_of_symbols(token_data) + "&tsyms=USD"
#     response = requests.request("GET", url)
#     token_prices = json.loads(response.text)
#     for token in token_data:
#         try: 
#             token['USDperUnit'] = token_prices[token['token']]['USD']
#         except:
#             token['USDperUnit'] = "N/A"

#     # Example Data, token_data: [{'token': 'BONDLY', 'name': 'Bondly Token', 'quantity': 993.3971165225804, 'USDperUnit': 0.07563}, {'token': 'BSJ', 'name': 'BASENJI', 'quantity': 50.0, 'USDperUnit': 'N/A'}]      
#     return token_data



# def get_coingecko_all_crypto_prices(request):
#     # What does this method do?
#     print('Fetching All 25 Pages of CoinGecko, This takes 10 Seconds')
#     # This fetches all of the below information from coingecko.com (see backend/crypto/helper/dummy_data/CoingeckoResponse.txt for full data structure)

#     page_number = 1
#     total_pages = 25
#     maximum_tokens_per_page = 250
#     tokenDictionary = {
#         "last_updated": "", 
#         "tokens": {
            
#         }
#     }

#     for page in range(total_pages):
#         coingeckoResult = CoinGeckoAPI().get_coins_markets('USD',per_page=maximum_tokens_per_page,page=page_number) 
#         for token in coingeckoResult:
            
#             tokenDictionary['tokens'][token['symbol']] = {
#                 "name": token['name'],
#                 "symbol": token['symbol'],
#                 "current_price": token['current_price'],
#                 "market_cap": token['market_cap'],
#                 "image": token['image']
#             }
#         page_number += 1

#     tokenDictionary['last_updated'] = get_time_now_as_string()
    
#     set_storage_value(request, tokenDictionary)

def get_covalent_all_crypto_prices(request):
    print('Fetching top 10,000 crypto tokens')

    page_size = 10000
    tokenDictionary = {
        "last_updated": "",
        "tokens": { 

        }
    }

    url = f"https://api.covalenthq.com/v1/pricing/tickers/?page-size={page_size}&key={os.environ['COVALENT_API_KEY']}"

    headers = {"Content-Type": "application/json"}

    response = requests.request("GET", url, headers=headers)
    tokens = json.loads(response.text)
    for token in tokens['data']['items']:
        tokenDictionary['tokens'][token['contract_address']] = {
            "name": token['contract_name'],
            "symbol": token['contract_ticker_symbol'],
            "current_price": token['quote_rate'],
            "image": token['logo_url']
        }
    print("---------------------------------------")
    print("THIS IS THE AMOUNT OF TOKENS IN SESSION")
    print(len(tokenDictionary['tokens']))
    tokenDictionary['last_updated'] = get_time_now_as_string()
    set_storage_value(request, tokenDictionary)



def check_if_longer_than_30_seconds(request):
  current_time = get_date_from_string(request.session['price_list']['last_updated'])
  if (datetime.now() - current_time).seconds > 30:
    return True
  else:
    return False