from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
import requests
import json
import os
from helper.add_decimals_to_number import *
# from helper.get_symbols_from_dictionary import *
from helper.get_crypto_prices import *
from helper.get_token_current_value import *


def get_moralis_erc20(address):
    # What does this method do?

    # It takes in an address from the front end (if "ethereum") is selected
    # it returns a list of dictionaries, each dictionary represents an ERC token and its balances

    url = f"https://deep-index.moralis.io/api/v2/{address}/erc20?chain=eth"
        
    headers = {
        'x-api-key': os.environ['MORALIS_API_KEY']
    }

    response = requests.request("GET", url, headers=headers)        
    tokens = json.loads(response.text) #Example Data, tokens: [{'token_address': '0xd2dda223b2617cb616c1580db421e4cfae6a8a85', 'name': 'Bondly Token', 'symbol': 'BONDLY', 'logo': 'https://cdn.moralis.io/eth/0xd2dda223b2617cb616c1580db421e4cfae6a8a85.png', 'thumbnail': 'https://cdn.moralis.io/eth/0xd2dda223b2617cb616c1580db421e4cfae6a8a85_thumb.png', 'decimals': '18', 'balance': '993397116522580432404'}, {'token_address': '0x43901e05f08f48546fff8d6f8df108f60570498b', 'name': 'BASENJI', 'symbol': 'BSJ', 'logo': None, 'thumbnail': None, 'decimals': '18', 'balance': '50000000000000000000'}]
    token_list = []

    for token in tokens:
        token_dict = {}
        token_dict['token'] = token['symbol']
        token_dict['name'] = token['name']
        token_dict['quantity'] = create_decimal_from_number(token['balance'], token['decimals'])
        token_list.append(token_dict)

    # Example Data, token_list: [{'token': 'BONDLY', 'name': 'Bondly Token', 'quantity': 993.3971165225804}, {'token': 'BSJ', 'name': 'BASENJI', 'quantity': 50.0}]
    return token_list


def get_ethereum_and_erc20_wallet_balance(request, address):
    tokens = get_moralis_erc20(address) #refactor into next line
    tokens = get_cryptocompare_token_price_by_id(tokens)
    tokens = get_token_current_value_in_USD(tokens)
    return JsonResponse(tokens, safe=False)