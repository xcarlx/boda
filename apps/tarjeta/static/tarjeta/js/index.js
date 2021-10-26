class VistaTarjeta {
    constructor(modelo) {
        this.modelo = modelo;
        this.contentTabla = document.getElementById('contentTabla');
        this.btnAlert = document.getElementById('btnAlert');
        const modal = document.getElementById('modalForm');
        const formulario = document.getElementById('formModal');
        const urls = JSON.parse(document.getElementById("urlsTarjeta").innerText);
        this.btnAlert.onclick = ev => {
            modelo.openModal(modal, formulario, urls.crear, "Crear Tarjeta", {}, () => {

            });
        }
        this.cargar_tabla(urls.lista);
        formulario.onsubmit = ev => {
            modelo.onSubmit(ev, modal.querySelector(".modal-content"), formulario, modal, resultado => {
                this.cargar_tabla(urls.lista);
            });
        }
    }

    cargar_tabla(url) {
        this.modelo.getUrlContenedor(url, this.contentTabla, () => {
        })

    }
}

export default VistaTarjeta;