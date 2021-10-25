from django import forms

from apps.tarjeta.models import Tarjeta


class TarjetaForm(forms.ModelForm):
    class Meta:
        model = Tarjeta
        fields = ['codigo', 'invitado', 'descripcion', 'telefono', 'pases']
        widgets = {
            "descripcion": forms.Textarea(attrs={"rows": 3, "style": "height: 100px"})
        }

    def __init__(self, *args, **kwargs):
        super(TarjetaForm, self).__init__(*args, **kwargs)
        for field in self.fields:
            self.fields[field].widget.attrs['class'] = "form-control"
            self.fields[field].widget.attrs['placeholder'] = self.fields[field].label
