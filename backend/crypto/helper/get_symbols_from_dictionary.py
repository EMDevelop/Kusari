def get_list_of_symbols(array_of_token_dictionaries):
    array_of_symbols = []
    separator = ','
    for token in array_of_token_dictionaries:
        array_of_symbols.append(token['token'])
    return separator.join(array_of_symbols)