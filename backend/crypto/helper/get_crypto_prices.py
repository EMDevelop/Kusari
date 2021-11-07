from crypto.helper.get_symbols_from_dictionary import *
import requests
import json

def get_cryptocompare_token_price_by_id(token_data):
    # What does this method do?

    # It takes in input of a list of dictionaries, one must be 'token': [{'token': 'BONDLY', 'name': 'Bondly Token', 'quantity': 993.3971165225804}, {'token': 'BSJ', 'name': 'BASENJI', 'quantity': 50.0}]
    # It returns the same data but with an additional field, USDperUnit

    url = "https://min-api.cryptocompare.com/data/pricemulti?fsyms=" + get_list_of_symbols(token_data) + "&tsyms=USD"
    response = requests.request("GET", url)
    print("hwn dir test" + response.text)
    token_prices = json.loads(response.text)
    print("this is token prices.....")
    print(token_prices)
    for token in token_data:
        try: 
            print("inside the for loop!!!!!")
            print(token['token'])
            print(token_prices[token['token']])
            token['USDperUnit'] = token_prices[token['token']]['USD']
        except:
            token['USDperUnit'] = "N/A"

    # Example Data, token_data: [{'token': 'BONDLY', 'name': 'Bondly Token', 'quantity': 993.3971165225804, 'USDperUnit': 0.07563}, {'token': 'BSJ', 'name': 'BASENJI', 'quantity': 50.0, 'USDperUnit': 'N/A'}]      
    return token_data