# Generated by Django 3.0.5 on 2020-07-23 05:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('games', '0003_usersgame_rate'),
    ]

    operations = [
        migrations.AlterField(
            model_name='usersgame',
            name='rate',
            field=models.CharField(max_length=100),
        ),
    ]
