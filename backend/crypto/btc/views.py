from django.shortcuts import render
from django.http import JsonResponse
import requests
import json
from crypto.helper.get_from_session_storage import append_price_and_image
from crypto.helper.get_token_current_value import get_token_current_value_in_USD
import blockcypher

# Create your views here.

def get_btc_from_blockcypher(address):
	balance_in_satoshi = blockcypher.get_total_balance(address)
	balance_in_btc = blockcypher.from_base_unit(balance_in_satoshi, 'btc')
	btc = {
			'token': 'BTC',
			'name': 'Bitcoin',
			'quantity': balance_in_btc,
			'contract_address': '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599'
		}

	return btc

def get_btc_balance(request, address):
	btc_balance = get_btc_from_blockcypher(address)
	btc_balance_price_image = append_price_and_image(request, btc_balance)
	btc_balance_price_balance = get_token_current_value_in_USD(btc_balance_price_image)
	return JsonResponse(btc_balance_price_balance, safe=False)
