from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from .models import Favorite
from .Serializers import FavoriteSerializer
# Create your views here.


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_all_favorites(request, user):
    if request.method == 'GET':
        favorite = Favorite.objects.filter(user=user)
        serializer = FavoriteSerializer(favorite, many=True)
        return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_favorite(request):
    if request.method == 'POST':
        serializer = FavoriteSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(user=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

@api_view(['PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def update_user_artist(request, pk):
    favorite= get_object_or_404(Favorite, pk=pk)
    if request.method == 'PUT':
        serializer = FavoriteSerializer(favorite, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(user=request.user)
        return Response(serializer.data)
    elif request.method == 'DELETE':
        favorite.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)