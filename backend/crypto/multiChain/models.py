from django.db import models
from django.contrib.auth.models import User

# Create your models here.

# make a django model to store wallets associated to each user
class Wallet(models.Model):
    user = models.ForeignKey('auth.User', on_delete=models.CASCADE)
    wallet_type = models.CharField(max_length=200)
    wallet_address = models.CharField(max_length=200)

    def __str__(self):
        return self.wallet_address