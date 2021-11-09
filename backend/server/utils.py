from prices.serializers import UserSerializer


def my_jwt_response_handler(token, user=None, request=None):
    return {
        'token': token,
        'user_id' : user.id,
        'user': UserSerializer(user, context={'request': request}).data
    }