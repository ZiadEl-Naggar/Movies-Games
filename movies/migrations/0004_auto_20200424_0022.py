# Generated by Django 3.0.5 on 2020-04-23 22:22

from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('movies', '0003_auto_20200424_0022'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Usersmovies',
            new_name='Usersmovie',
        ),
    ]
