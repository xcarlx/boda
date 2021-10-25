from django.views.generic import TemplateView, CreateView, ListView

from apps.tarjeta.forms.tarjeta import TarjetaForm
from apps.tarjeta.models import Tarjeta


class Home(TemplateView):
    template_name = "tarjeta/view.html"


class CrearTarjetaView(CreateView):
    model = Tarjeta
    template_name = "tarjeta/formulario.html"
    form_class = TarjetaForm


class ListaTarjetaView(ListView):
    model = Tarjeta
    template_name = "tarjeta/lista.html"
    paginate_by = 10