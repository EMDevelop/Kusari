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