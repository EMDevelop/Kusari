# from django.shortcuts import render
from django.http import JsonResponse
import requests
import json
import os
from web3 import Web3
from helper.add_decimals_to_number import *
from helper.get_symbols_from_dictionary import *
from helper.get_crypto_prices import *
from helper.get_token_current_value import *
from helper.get_from_session_storage import *

def get_moralis_eth(address):

    url = f"https://speedy-nodes-nyc.moralis.io/{os.environ['MORALIS_NODE_KEY']}/eth/mainnet"

    w3 = Web3(Web3.HTTPProvider(url))

    eth_balance = w3.eth.get_balance(address)
    
    return {'token': 'ETH', 'name': 'Ethereum', 'quantity': create_decimal_from_number(eth_balance, 18)}


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
    # What does this method do?

    # Check if storage is empty OR if data is older than 30 seconds
    if not 'price_list' in request.session or check_if_longer_than_30_seconds(request):
        get_coingecko_all_crypto_prices(request)

    eth_quantity = get_moralis_eth(address)
    token_symbol_name_quantity = get_moralis_erc20(address) #refactor into next line
    token_symbol_name_quantity.insert(0, eth_quantity)
    print(token_symbol_name_quantity)
    token_symbol_name_quantity_price_image = append_price_and_image(request, token_symbol_name_quantity)
    token_symbol_name_quantity_price_balance = get_token_current_value_in_USD(token_symbol_name_quantity_price_image) 
    return JsonResponse(token_symbol_name_quantity_price_balance, safe=False)
