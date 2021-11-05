# First Param is a number, e.g. 123456789
# Second Param is a number, relating to how many decimals your number should resolve to, e.g. 5
# Return Value = 1234.56789
def create_decimal_from_number(number, decimals):
    return float(number) / pow(10, int(decimals))