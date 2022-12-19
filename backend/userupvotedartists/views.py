from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from .models import UpvotedArtists
from Artists.models import Artist
from .serializers import UpvotedArtistSerializer


# Create your views here.
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_all_upvoted_artists(request, user):
    if request.method == 'GET':
        upvotedartist = UpvotedArtists.objects.filter(user=user)
        serializer = UpvotedArtistSerializer(upvotedartist, many=True)
        return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_upvotedartist(request):
    if request.method == 'POST':
        up_voted_artist = Artist.objects.get(pk = request.data.get('artist_id'))
        up_voted_artist.upvotes += 1
        up_voted_artist.save()
        serializer = UpvotedArtistSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(user=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
