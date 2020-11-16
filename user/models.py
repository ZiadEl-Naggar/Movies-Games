from django.db import models
from django.urls import reverse
from django.contrib.auth.models import User

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    firstname = models.CharField(max_length=100)
    lastname = models.CharField(max_length=100)
    birthdate = models.DateField(max_length=100)
    picture = models.FileField(max_length=1000)
    details = models.TextField(max_length=2000)

    def get_absolute_url(self):
        return reverse("user:profile")

    def __str__(self):
        return self.firstname + ' - ' + self.lastname