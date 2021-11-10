def set_storage_value(request, dictionary):
    print('Saving to Storage STARTING..')
    request.session['price_list'] = dictionary
    print('..Saving to Storage COMPLETE')

