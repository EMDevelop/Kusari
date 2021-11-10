def set_storage_value(request, dictionary):
    print('Saving to Storage STARTING..')
    request.session['price_list'] = dictionary
    print('..Saving to Storage COMPLETE')

def add_wallets_to_storage(request, array_of_dictionaries):
    print('Saving to Storage STARTING..')
    request.session['wallet_list'] = array_of_dictionaries
    print('..Saving to Storage COMPLETE')
