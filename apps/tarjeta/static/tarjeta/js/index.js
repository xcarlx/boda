class VistaTarjeta {
    constructor(modelo) {
        this.btnAlert = document.getElementById('btnAlert');
        const modal = document.getElementById('modalForm');
        const formulario = document.getElementById('formModal');
        const urls = JSON.parse(document.getElementById("urlsTarjeta").innerText);
        this.btnAlert.onclick = ev => {
            modelo.openModal(modal, formulario, urls.crear, "Crear Tarjeta", {}, () => {

            });
        }
        formulario.onsubmit = ev => {
            modelo.submit_event(ev, modal.querySelector(".modal-content"), formulario, resultado => {
                let modal_instance = bootstrap.Modal.getInstance(modal)
                try {
                    resultado = JSON.parse(resultado);
                    modal_instance.hide();
                    modelo.toastShow(document.getElementById("toastBoda"), resultado.mensaje, {
                        ms: 3000,
                        bg: "bg-success"
                    });
                } catch (err) {
                    modelo.toastShow(document.getElementById("toastBoda"), "Error", {
                        ms: 3000,
                        bg: "bg-danger"
                    });
                }
            });
        }
    }
}

export default VistaTarjeta;