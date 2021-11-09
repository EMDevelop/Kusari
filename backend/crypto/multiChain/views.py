from django.http.response import JsonResponse
from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response

# Create your views here.


def get_all_wallet_prices(request, username):
    # Go into model, get the wallets for that user
    # for each address, get prices feturned from each app and append do dictionary
    # Get prices as usual from storage
    # Return the token info  and the prices to the client.
    return render(request, 'multiChain/wallet_prices.html')

def walletsOverview(request):
    return JsonResponse('Wallets base point', safe=False)