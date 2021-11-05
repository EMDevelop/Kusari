from django.test import TestCase
from .views import *
import requests
import unittest
from unittest import mock

# Create your tests here.

# class GetMoralisTest(TestCase):
# 	def set_up(self):
# 		self.token_list = [
# 			{
# 				'token': 'TEST',
# 			}
# 		]
# class URLTests(TestCase):
# 	def test_testhomepage(self):
# 		response = self.client.get('/')
# 		self.assertEqual(response.status_code, 200)

def mocked_requests_get(*args, **kwargs):
    class MockResponse:
        def __init__(self, json_object, status_code):
            # self.text = "{'symbol': 'TEST', 'balance': '1', 'name': 'TestCoin'}"
            self.text = json_object
            self.status_code = status_code

        def json(self):
            return self.json_data

    if args[1] == 'https://deep-index.moralis.io/api/v2/test/erc20?chain=eth':
        return MockResponse('{"symbol": "TEST", "balance": "10", "name": "TestCoin", "decimals": "1"}', 200)

    return MockResponse(None, 404)


        # We can even assert that our mocked method was called with the right parameters
        # self.assertIn(mock.call('http://someurl.com/test.json'), mock_get.call_args_list)
        # self.assertIn(mock.call('http://someotherurl.com/anothertest.json'), mock_get.call_args_list)

        # self.assertEqual(len(mock_get.call_args_list), 3)

class Get_Moralis_Test(TestCase):
	@mock.patch('requests.request', side_effect=mocked_requests_get)
	def test_moralis(self, mock_get):
		array_of_tokens = get_moralis_erc20("test")
		self.assertEqual(array_of_tokens, [{"token": "TEST", "quantity": 1, "name": "TestCoin"}])



if __name__ == '__main__':
    unittest.main()