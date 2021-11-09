from unittest.mock import Mock
import os


def mocked_requests_get(*args, **kwargs):
    class MockResponse:
        def __init__(self, json_object, status_code):
            self.text = json_object
            self.status_code = status_code

        def json(self):
            return self.json_data

    primary_test_urls = [
        'https://deep-index.moralis.io/api/v2/test/erc20?chain=eth',
        'https://min-api.cryptocompare.com/data/pricemulti?fsyms=TEST1&tsyms=USD',
        'test',
    ]
    secondary_test_urls = [
        'https://min-api.cryptocompare.com/data/pricemulti?fsyms=TEST2&tsyms=USD'
    ]
    bsc_test_url = f"http://api.covalenthq.com/v1/56/address/TEST/balances_v2/?key={os.environ['COVALENT_API_KEY']}?"
    

    if args[1] in primary_test_urls:
        return MockResponse('[{"symbol": "TEST1", "balance": "10", "name": "TestCoin", "decimals": "1", "token_address": "0x0"}]', 200)
    elif args[1] in secondary_test_urls:
        return MockResponse('{"TEST2": {"USD": 5.0}}', 200)
    elif args[1] == bsc_test_url:
        return MockResponse('{"data":{"address":"TEST","items":[{"contract_decimals":1,"contract_name":"TestCoin","contract_ticker_symbol":"TEST1","contract_address":"0x0","balance":"100"}]}}', 200)

    return MockResponse(None, 404)