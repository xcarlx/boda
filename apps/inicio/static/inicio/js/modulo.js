export default class Modelo {

    constructor() {

        HTMLElement.prototype.showloader = function loadingShow() {
            let html = `<div style="width: 100%; height: 100%; background: #fff; position: absolute; top: 0; left: 0;" class=" text-center">
                        <div class="spinner-border text-primary position-absolute top-50 start-50" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </div>`;
            let createDiv = document.createElement("div");
            createDiv.classList.add('loading');
            createDiv.innerHTML = html;
            this.append(createDiv);
        }

        HTMLElement.prototype.hideloader = function loadingHiden() {
            let element = document.querySelector(".loading");
            if (element) {
                element.remove();
            }
        }
    }

    async onSubmit(ev, element, formulario, modal, f) {
        ev.preventDefault();
        element.showloader();
        const formdata = new FormData(formulario);
        try {
            let res = await fetch(formulario.getAttribute('action'), {
                method: "POST",
                body: formdata,
            })
            const resultado = await res.text();
            try {
                if (JSON.parse(resultado).success) {
                    this.toastShow(document.getElementById("toastBoda"), JSON.parse(resultado).mensaje, {
                        ms: 3000,
                        bg: "bg-success"
                    });
                    f(resultado);
                }
                if (modal) {
                    let modal_instance = bootstrap.Modal.getInstance(modal);
                    modal_instance.hide();

                }
            } catch (e) {
                if (modal) {
                    modal.querySelector(".modal-body").innerHTML = resultado;
                }
                this.toastShow(document.getElementById("toastBoda"), "Error", {
                    ms: 3000,
                    bg: "bg-danger"
                });
            }
            element.hideloader();
        } catch (err) {
            element.hideloader();
            this.toastShow(document.getElementById("toastBoda"), "Error", {
                ms: 3000,
                bg: "bg-danger"
            });
        }
    }

    async getUrlContenedor(url, element, funcion) {
        element.showloader();
        await fetch(url)
            .then(response => response.text())
            .catch((error) => {
                console.error('Error:', error)
            })
            .then((response) => {
                // console.log('Success:', response);
                element.innerHTML = response;
                element.hideloader();
            }).catch(() => {
                element.hideloader();
            });
        funcion();
    }

    async getPostObjectJson(url = '', data = {}) {
        const resultado = await fetch(url, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return resultado.json();
    }

    async getGetObjectJson(url = '') {
        const resultado = await fetch(url, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return await resultado.json();
    }

    async submit_event(ev, element, formulario, f) {
        ev.preventDefault();
        element.showloader();
        const formdata = new FormData(formulario);
        try {
            let res = await fetch(formulario.getAttribute('action'), {
                method: "POST",
                body: formdata,
            })
            if (res.ok) {
                const resultado = await res.text();
                f(resultado);
            }
            element.hideloader();
        } catch (err) {
            console.log(err)
            element.hideloader();
        }
    }

    toastShow(element, texto, options = {}) {
        let ms = options.ms !== undefined ? options.ms : 100;
        let bg = options.bg !== undefined ? options.bg : "bg-success"
        var toast = new bootstrap.Toast(element, {
            'animation': true,
            'delay': ms ? ms : 2000,
        });
        element.classList.remove("bg-success");
        element.classList.remove("bg-danger");
        element.classList.remove("bg-primary");
        element.classList.remove("bg-warning");
        element.classList.remove("bg-secondary");
        element.classList.add(bg);
        element.querySelector(".toast-body").innerHTML = texto;
        toast.show()
    }

    async openModal(element_modal, formulario, url = '', titulo = "", options = {}, f) {
        let modal = new bootstrap.Modal(element_modal, options);
        element_modal.querySelector('.modal-content').showloader();
        formulario.setAttribute("action", url);
        formulario.setAttribute("method", "post");
        element_modal.querySelector(".modal-title").innerHTML = titulo;
        let response = await fetch(url);
        if (response.ok) {
            element_modal.querySelector(".modal-body").innerHTML = await response.text();
            modal.show();
            f(element_modal);
        } else {
            f(null);
        }
        element_modal.querySelector('.modal-content').hideloader();
    }

    AlertView(element, message, type) {
        var wrapper = document.createElement('div')
        wrapper.innerHTML = '<div class="alert alert-' + type + ' alert-dismissible" role="alert">' + message + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'
        element.append(wrapper)
    }


}


