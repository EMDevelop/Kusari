from django.test import TestCase
from crypto.helper.mock_creator import mocked_requests_get
from .views import *
import unittest
from unittest import mock

class Get_Bitquery_BEP_20_Test(TestCase):
	@mock.patch('requests.post', side_effect=mocked_requests_get)
	def test_bitquery_bep20(self, mock_get):
		array_of_tokens = get_bitquery_bep20("test")
		self.assertEqual(array_of_tokens, [{"token": "TEST1", "name": "TestCoin", "quantity": 1.0}])


if __name__ == '__main__':
    unittest.main()