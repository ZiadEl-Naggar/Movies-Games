from django.db import models
from django.contrib.auth.models import User

class Usersmovie(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, primary_key=False)
    movieid = models.CharField(max_length=100)
    title = models.CharField(max_length=100)
    year = models.CharField(max_length=100)
    poster = models.CharField(max_length=1000)
    rate = models.CharField(max_length=100)

    def get_absolute_url(self):
        return reverse("user:profile")

    def __str__(self):
        return self.user.username