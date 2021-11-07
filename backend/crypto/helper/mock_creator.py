def mocked_requests_get(*args, **kwargs):
    class MockResponse:
        def __init__(self, json_object, status_code):
            self.text = json_object
            self.status_code = status_code

        def json(self):
            return self.json_data

    primary_test_urls = [
        'https://deep-index.moralis.io/api/v2/test/erc20?chain=eth',
        'https://min-api.cryptocompare.com/data/pricemulti?fsyms=TEST1&tsyms=USD'
    ]
    secondary_test_urls = [
        'https://min-api.cryptocompare.com/data/pricemulti?fsyms=TEST2&tsyms=USD'
    ]

    if args[1] in primary_test_urls:
        return MockResponse('[{"symbol": "TEST1", "balance": "10", "name": "TestCoin", "decimals": "1"}]', 200)
    elif args[1] in secondary_test_urls:
        return MockResponse('{"TEST2": {"USD": 5.0}}', 200)

    return MockResponse(None, 404)