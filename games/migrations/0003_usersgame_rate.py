# Generated by Django 3.0.5 on 2020-07-23 05:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('games', '0002_auto_20200424_2358'),
    ]

    operations = [
        migrations.AddField(
            model_name='usersgame',
            name='rate',
            field=models.CharField(max_length=100, null=True),
        ),
    ]
