from django.db import models

# Create your models here.


class Artist(models.Model):
    artist_api_id = models.IntegerField()
    artist_name = models.CharField(max_length=255)
    upvotes = models.IntegerField(default=0)