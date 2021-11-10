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
	headers = {"Content-Type": "application/json",}

	response = requests.request("GET", url, headers=headers) # Example Data: {"data":{"address":"0x4ad2b8dac6ca5e77030af4529d6eff12d3fff502","updated_at":"2021-11-09T15:09:16.662877504Z","next_update_at":"2021-11-09T15:14:16.662877944Z","quote_currency":"USD","chain_id":56,"items":[{"contract_decimals":9,"contract_name":"EverGrow Coin","contract_ticker_symbol":"EGC","contract_address":"0xc001bbe2b87079294c63ece98bdd0a88d761434e","supports_erc":["erc20"],"logo_url":"https://logos.covalenthq.com/tokens/56/0xc001bbe2b87079294c63ece98bdd0a88d761434e.png","last_transferred_at":"2021-10-31T00:46:24Z","type":"cryptocurrency","balance":"30994029436466735","balance_24h":null,"quote_rate":1.59E-6,"quote_rate_24h":1.3145403E-6,"quote":49.280506,"quote_24h":null,"nft_data":null},{"contract_decimals":18,"contract_name":"Binance Coin","contract_ticker_symbol":"BNB","contract_address":"0xb8c77482e45f1f44de1745f52c74426c631bdd52","supports_erc":null,"logo_url":"https://www.covalenthq.com/static/images/icons/display-icons/binance-coin-bnb-logo.png","last_transferred_at":null,"type":"cryptocurrency","balance":"0","balance_24h":null,"quote_rate":645.85,"quote_rate_24h":600.8414,"quote":0.0,"quote_24h":null,"nft_data":null}],"pagination":null},"error":false,"error_message":null,"error_code":null}
	tokens = json.loads(response.text)
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

def get_bep20_wallet_balance(request, address, request_type):
    # What does this method do?

    # Check if storage is empty OR if data is older than 30 seconds
	if not 'price_list' in request.session or check_if_longer_than_30_seconds(request):
		get_covalent_all_crypto_prices(request)

	token_symbol_name_quantity = get_covalent_bep20(address)
	token_symbol_name_quantity_price_image = append_price_and_image(request, token_symbol_name_quantity)
	token_symbol_name_quantity_price_balance = get_token_current_value_in_USD(token_symbol_name_quantity_price_image)
	return JsonResponse(token_symbol_name_quantity_price_balance, safe=False)
	