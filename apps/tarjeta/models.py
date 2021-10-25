from django.db import models

from django.urls import reverse


# Create your models here.


class Tarjeta(models.Model):
    codigo = models.CharField(max_length=5)
    descripcion = models.TextField(blank=True, null=True)
    invitado = models.CharField(max_length=150)
    telefono = models.CharField(max_length=9, blank=True, null=True)
    pases = models.IntegerField()
    confimado = models.BooleanField(default=False)

    def get_absolute_url(self):
        return reverse('inicio:success', kwargs={'pk': self.pk})
