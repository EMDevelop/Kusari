from django.test import TestCase
from crypto.helper.get_symbols_from_dictionary import get_list_of_symbols
from crypto.helper.mock_creator import mocked_requests_get
from unittest import mock
from crypto.helper.get_crypto_prices import get_cryptocompare_token_price_by_id
from crypto.helper.get_token_current_value import get_token_current_value_in_USD

class Get_Cryptocompare_Token_Price_By_Id_Test(TestCase):
	@mock.patch('requests.request', side_effect=mocked_requests_get)
	def test_cryptocompare_USD_is_NA(self, mock_get):
		array_of_tokens = get_cryptocompare_token_price_by_id([{"token": "TEST1", "quantity": 1, "name": "TestCoin"}])
		self.assertEqual(array_of_tokens, [{"USDperUnit": "N/A", "token": "TEST1", "quantity": 1, "name": "TestCoin"}])

	@mock.patch('requests.request', side_effect=mocked_requests_get)
	def test_cryptocompare_USD_is_int(self, mock_get):
		array_of_tokens = get_cryptocompare_token_price_by_id([{"token": "TEST2", "quantity": 1, "name": "TestCoin"}])
		self.assertEqual(array_of_tokens, [{"USDperUnit": 5, "token": "TEST2", "quantity": 1, "name": "TestCoin"}])


class Get_Token_Current_Value_In_USD_Test(TestCase):
	def test_USD_calculation_when_NA(self):
		array_of_tokens = get_token_current_value_in_USD([{"USDperUnit": "N/A", "token": "TEST1", "quantity": 1, "name": "TestCoin"}])
		self.assertEqual(array_of_tokens, [{"BalanceInUSD": "N/A", "USDperUnit": "N/A", "token": "TEST1", "quantity": 1, "name": "TestCoin"}])
	def test_USD_calculation_when_int(self):
		array_of_tokens = get_token_current_value_in_USD([{"USDperUnit": 5, "token": "TEST2", "quantity": 2, "name": "TestCoin"}])
		self.assertEqual(array_of_tokens, [{"BalanceInUSD": 10, "USDperUnit": 5, "token": "TEST2", "quantity": 2, "name": "TestCoin"}])
	def test_USD_calculation_when_float(self):
		array_of_tokens = get_token_current_value_in_USD([{"USDperUnit": 5.1, "token": "TEST2", "quantity": 2, "name": "TestCoin"}])
		self.assertEqual(array_of_tokens, [{"BalanceInUSD": 10.2, "USDperUnit": 5.1, "token": "TEST2", "quantity": 2, "name": "TestCoin"}])

class Get_Symbols_From_Dictionary(TestCase):
	def test_get_list_of_symbols_single(self):
		symbol_in_string = get_list_of_symbols([{"token": "TEST1"}])
		self.assertEqual(symbol_in_string, "TEST1")
	def test_get_list_of_symbols_multi(self):
		string_of_symbols = get_list_of_symbols([{"token": "TEST1"}, {"token": "TEST2"}, {"token": "TEST3"}])
		self.assertEqual(string_of_symbols, "TEST1,TEST2,TEST3")