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

def get_covalent_bep20(wallet_address):
	url = f"http://api.covalenthq.com/v1/56/address/{wallet_address}/balances_v2/?key={os.environ['COVALENT_API_KEY']}?"
	# url = f"http://api.covalenthq.com/v1/56/address/{wallet_address}/balances_v2/?key=ckey_b1edf0879e4d4ad5877c1f262db?"
	headers = {"Content-Type": "application/json",}

	response = requests.request("GET", url, headers=headers)
	print(response.text)
	tokens = json.loads(response.text)
	print(tokens)
	balances = tokens['data']['items']
	token_list = []
	for token in balances:
		token_dict = {}
		token_dict['token'] = token['contract_ticker_symbol']
		token_dict['name'] = token['contract_name']
		token_dict['quantity'] = create_decimal_from_number(token['balance'], token['contract_decimals'])
		token_dict['contract_address'] = token['contract_address']
		token_list.append(token_dict)

	return token_list

def get_bep20_wallet_balance(request, address):
    # What does this method do?

    # Check if storage is empty OR if data is older than 30 seconds
	if not 'price_list' in request.session or check_if_longer_than_30_seconds(request):
		get_coingecko_all_crypto_prices(request)

	token_symbol_name_quantity = get_covalent_bep20(address)
	token_symbol_name_quantity_price_image = append_price_and_image(request, token_symbol_name_quantity)
	token_symbol_name_quantity_price_balance = get_token_current_value_in_USD(token_symbol_name_quantity_price_image)
	return JsonResponse(token_symbol_name_quantity_price_balance, safe=False)
	