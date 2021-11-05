def get_token_current_value_in_USD(token_list):
    # What does this method do?

    # It takes in a list of dictionaries, each dictionary represents a token and its balances
    # Example Data, token_list: [{'token': 'BONDLY', 'name': 'Bondly Token', 'quantity': 993.3971165225804, 'USDperUnit': 0.07563}, {'token': 'BSJ', 'name': 'BASENJI', 'quantity': 50.0, 'USDperUnit': 'N/A'}]      
    

    for token in token_list:
        try:
            token['BalanceInUSD'] = token['quantity'] * token['USDperUnit']
        except:
            token['BalanceInUSD'] = "N/A"
    
    # Example Data, token_list: [{'token': 'BONDLY', 'name': 'Bondly Token', 'quantity': 993.3971165225804, 'USDperUnit': 0.0753, 'BalanceInUSD': 74.80280287415032}, {'token': 'BSJ', 'name': 'BASENJI', 'quantity': 50.0, 'USDperUnit': 'N/A', 'BalanceInUSD': 'N/A'}]
    return token_list