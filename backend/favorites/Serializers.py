from rest_framework import serializers
from .models import Favorite

class FavoriteSerializer(serializers.ModelSerializer):
    artist_id = serializers.CharField(write_only=True)
    user_id = serializers.IntegerField(write_only=True)
    class Meta:
        model = Favorite
        fields = ['id', 'artist', 'user', 'artist_id', 'user_id']
        depth = 1