from django.db import models

# Create your models here.
class Service(models.Model):
    Service_title = models.CharField(max_length=50)
    Service_dec = models.TextField()