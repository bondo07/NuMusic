from django.db import models
from Artists.models import Artist
from authentication.models import User

# Create your models here.

class Favorite(models.Model):
    artist = models.ForeignKey(Artist, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=None)
    