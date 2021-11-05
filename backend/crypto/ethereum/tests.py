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

    if args[1] == 'https://deep-index.moralis.io/api/v2/test/erc20?chain=eth':
        return MockResponse('[{"symbol": "TEST", "balance": "10", "name": "TestCoin", "decimals": "1"}]', 200)

    return MockResponse(None, 404)

class Get_Moralis_Test(TestCase):
	@mock.patch('requests.request', side_effect=mocked_requests_get)
	def test_moralis(self, mock_get):
		array_of_tokens = get_moralis_erc20("test")
		self.assertEqual(array_of_tokens, [{"token": "TEST", "quantity": 1, "name": "TestCoin"}])

if __name__ == '__main__':
    unittest.main()