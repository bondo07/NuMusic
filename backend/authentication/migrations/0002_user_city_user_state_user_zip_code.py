# Generated by Django 4.1.4 on 2022-12-06 22:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='city',
            field=models.CharField(default=None, max_length=255),
        ),
        migrations.AddField(
            model_name='user',
            name='state',
            field=models.CharField(default=None, max_length=255),
        ),
        migrations.AddField(
            model_name='user',
            name='zip_code',
            field=models.IntegerField(default=None),
        ),
    ]
