from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from .models import Artist
from .serializers import ArtistSerializer

# Create your views here.

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_all_artists(request):
    if request.method == 'GET':
        artist = Artist.objects.all()
        serializer = ArtistSerializer(artist, many=True)
        return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_user_artist(request):
    if request.method == 'POST':
        if Artist.objects.filter(artist_name=request.data.get('artist_name')).exists():
            artist_object = get_object_or_404(Artist, artist_name = request.data.get('artist_name'))
            serializer = ArtistSerializer(artist_object)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            serializer = ArtistSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

@api_view(['PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def update_user_artist(request, pk):
    artist= get_object_or_404(Artist, pk=pk)
    if request.method == 'PUT':
        serializer = ArtistSerializer(artist, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(user=request.user)
        return Response(serializer.data)
    elif request.method == 'DELETE':
        artist.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)