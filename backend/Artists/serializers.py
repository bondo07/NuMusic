from rest_framework import serializers
from .models import Artist


class ArtistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Artist
        fields = ['id', 'artist_api_id', 'artist_name', 'upvotes']
        depth = 1
