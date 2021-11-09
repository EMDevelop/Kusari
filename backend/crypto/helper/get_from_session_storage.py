import requests
import json
import os

def append_price_and_image(request, existing_dictionary): 
    # For each token within the existing_dictionary, fetch price from local storage for that token
    # and append it to the existing_dictionary
    for token in existing_dictionary:
        try:
            token['USDperUnit'] = get_item_from_storage(request, token['token'].lower(), 'current_price')
        except:
            token['USDperUnit'] = "N/A"
    
    for token in existing_dictionary:
        try: 
            token['image'] = get_item_from_storage(request, token['token'].lower(), 'image')
        except:
            token['image'] = "https://www.cryptocurrencymarket.uk/coins_images/shitcoin-token/large.png"
    
    return existing_dictionary

def get_item_from_storage(request, symbol, return_key):
  return request.session['price_list']['tokens'][symbol][return_key]
  

# def get_price_from_session_by_symbol(request, symbol):
#     print(request.session['price_list']['tokens'][symbol]['current_price'])
#     return JsonResponse({'getting': 'stuff'})
