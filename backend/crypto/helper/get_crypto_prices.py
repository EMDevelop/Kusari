from .get_symbols_from_dictionary import *
from pycoingecko import CoinGeckoAPI
import requests
import json
from datetime import datetime


def get_cryptocompare_token_price_by_id(token_data):

    # What does this method do?

    # It takes in input of a list of dictionaries, one must be 'token': [{'token': 'BONDLY', 'name': 'Bondly Token', 'quantity': 993.3971165225804}, {'token': 'BSJ', 'name': 'BASENJI', 'quantity': 50.0}]
    # It returns the same data but with an additional field, USDperUnit

    url = "https://min-api.cryptocompare.com/data/pricemulti?fsyms=" + get_list_of_symbols(token_data) + "&tsyms=USD"
    response = requests.request("GET", url)
    token_prices = json.loads(response.text)
    for token in token_data:
        try: 
            token['USDperUnit'] = token_prices[token['token']]['USD']
        except:
            token['USDperUnit'] = "N/A"

    # Example Data, token_data: [{'token': 'BONDLY', 'name': 'Bondly Token', 'quantity': 993.3971165225804, 'USDperUnit': 0.07563}, {'token': 'BSJ', 'name': 'BASENJI', 'quantity': 50.0, 'USDperUnit': 'N/A'}]      
    return token_data



def get_coingecko_all_crypto_prices():
    # What does this method do?

    # This fetches all of the below information from coingecko.com (see backend/crypto/helper/dummy_data/CoingeckoResponse.txt for full data structure)
        # "id": "ethereum",
        # "symbol": "eth",
        # "name": "Ethereum",
        # "image": "https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880",
        # "current_price": 4489.6,
        # "market_cap": 530759746078,

    # Looping 25 pages takes 10.399292 seconds, second time: 10.934964

    page_number = 1
    total_pages = 25
    maximum_tokens_per_page = 250
    tokenDictionary = {
        "last_updated": "", 
        "tokens": {
            
        }
    }

    for page in range(total_pages):
        coingeckoResult = CoinGeckoAPI().get_coins_markets('USD',per_page=maximum_tokens_per_page,page=page_number) 
        for token in coingeckoResult:
            
            tokenDictionary['tokens'][token['symbol']] = {
                "name": token['name'],
                "symbol": token['symbol'],
                "current_price": token['current_price'],
                "market_cap": token['market_cap'],
                "image": token['image']
            }
        page_number += 1
    tokenDictionary['last_updated'] = datetime.now()

    return tokenDictionary