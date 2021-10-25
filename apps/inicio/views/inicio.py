from django.http import JsonResponse
from django.views import View


class SuccessView(View):
    def get(self, request, pk):
        return JsonResponse({
            "success": True,
            "mensaje": "Guardado Correctamente",
            "pk": pk
        })
