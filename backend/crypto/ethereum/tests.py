from django.test import TestCase
from .views import *
import requests
import unittest
from unittest import mock

# class URLTests(TestCase):
# 	def test_testhomepage(self):
# 		response = self.client.get('/')
# 		self.assertEqual(response.status_code, 200)

def mocked_requests_get(*args, **kwargs):
    class MockResponse:
        def __init__(self, json_object, status_code):
            self.text = json_object
            self.status_code = status_code

        def json(self):
            return self.json_data

    array_of_test_urls = [
        'https://deep-index.moralis.io/api/v2/test/erc20?chain=eth',
        'https://min-api.cryptocompare.com/data/pricemulti?fsyms=TEST&tsyms=USD'
    ]

    if args[1] in array_of_test_urls:
        return MockResponse('[{"symbol": "TEST", "balance": "10", "name": "TestCoin", "decimals": "1", "USD": "5"}]', 200)

    return MockResponse(None, 404)

class Get_Moralis_Test(TestCase):
	@mock.patch('requests.request', side_effect=mocked_requests_get)
	def test_moralis(self, mock_get):
		array_of_tokens = get_moralis_erc20("test")
		self.assertEqual(array_of_tokens, [{"token": "TEST", "quantity": 1, "name": "TestCoin"}])

class Get_Cryptocompare_Token_Price_By_Id_Test(TestCase):
	@mock.patch('requests.request', side_effect=mocked_requests_get)
	def test_cryptocompare_USD_is_NA(self, mock_get):
		array_of_tokens = get_cryptocompare_token_price_by_id([{"token": "TEST", "quantity": 1, "name": "TestCoin"}])
		self.assertEqual(array_of_tokens, [{"USDperUnit": "N/A", "token": "TEST", "quantity": 1, "name": "TestCoin"}])
    # def test_cryptocompare_USD_is_(self, mock_get):
	# 	array_of_tokens = get_cryptocompare_token_price_by_id([{"token": "TEST", "quantity": 1, "name": "TestCoin"}])
	# 	self.assertEqual(array_of_tokens, [{"USDperUnit": "N/A", "token": "TEST", "quantity": 1, "name": "TestCoin"}])

class Get_Token_Current_Value_In_USD_Test(TestCase):
	@mock.patch('requests.request', side_effect=mocked_requests_get)
	def test_USD_calculation(self, mock_get):
		array_of_tokens = get_token_current_value_in_USD([{"USDperUnit": "N/A", "token": "TEST", "quantity": 1, "name": "TestCoin"}])
		self.assertEqual(array_of_tokens, [{"BalanceInUSD": "N/A", "USDperUnit": "N/A", "token": "TEST", "quantity": 1, "name": "TestCoin"}])

if __name__ == '__main__':
    unittest.main()