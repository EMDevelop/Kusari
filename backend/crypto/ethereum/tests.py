from django.test import TestCase
from crypto.helper.mock_creator import mocked_requests_get
from .views import *
import unittest
from unittest import mock

# class URLTests(TestCase):
# 	def test_testhomepage(self):
# 		response = self.client.get('/')
# 		self.assertEqual(response.status_code, 200)

class Get_Moralis_ERC_20_Test(TestCase):
	@mock.patch('requests.request', side_effect=mocked_requests_get)
	def test_moralis(self, mock_get):
		array_of_tokens = get_moralis_erc20("test")
		self.assertEqual(array_of_tokens, [{"token": "TEST1", "name": "TestCoin", "quantity": 1.0}])


if __name__ == '__main__':
    unittest.main()