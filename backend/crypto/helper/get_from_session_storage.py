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
            token['image'] = "https://www.seekpng.com/png/full/13-136272_question-mark-in-a-circle-comments-circle-question.png"
    
    return existing_dictionary

def get_item_from_storage(request, symbol, return_key):
  return request.session['price_list']['tokens'][symbol][return_key]


