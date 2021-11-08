from django.http.response import JsonResponse
from django.shortcuts import render
import requests
import json
import os
from helper.add_decimals_to_number import *
from helper.get_symbols_from_dictionary import *
from helper.get_crypto_prices import *
from helper.get_token_current_value import *
from helper.get_from_session_storage import *

def get_bitquery_bep20(wallet_address):

	url = "https://graphql.bitquery.io"

	query = """query {
		ethereum(network: bsc) {
    		address(address: {is: "0x4ad2b8dAc6ca5e77030Af4529d6eFf12d3FFF502"}) {
      			balances {
        			value
        			currency {
          				name
          				symbol
						decimals
        			}
      			}
    		}
  		}
	}
	"""

	# query = 'query {\nethereum(network: bsc) {\naddress(address: {is: "' + wallet_address + '"}) {\nbalances {\nvalue\ncurrency {\nname\nsymbol\ndecimal\n}}}}}'

	response = requests.post(url, json={'query': query})
	tokens = json.loads(response.text)
	balances = tokens['data']['ethereum']['address'][0]['balances']
	return balances

def get_bep20_wallet_balance(request, address):
    # What does this method do?

    # Check if storage is empty OR if data is older than 30 seconds
	if not 'price_list' in request.session or check_if_longer_than_30_seconds(request):
		get_coingecko_all_crypto_prices(request)

	token_symbol_name_quantity = get_bitquery_bep20(address)
	token_symbol_name_quantity_price_image = append_price_and_image(request, token_symbol_name_quantity)
	token_symbol_name_quantity_price_balance = get_token_current_value_in_USD(token_symbol_name_quantity_price_image)
	return JsonResponse(token_symbol_name_quantity_price_balance, safe=False)
	