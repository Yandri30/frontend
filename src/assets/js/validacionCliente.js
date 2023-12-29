const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

const expresiones = {
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    cedula: /^\d{10}$/, // 10 numeros.
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    direccion: /^[a-zA-ZÀ-ÿ-Z0-9\s\_\-]{1,50}$/, // Letras y espacios, pueden llevar acentos.
    telefono: /^\d{10}$/ // 10 numeros.
}

const campos = {
    nombres: false,
    cedula: false,
    direccion: false,
    correo: false,
    telefono: false,
}

const validarCampos = (e) => {
    switch (e.target.name) {
        case "nombres":
            validarForm(expresiones.nombre, e.target, 'nombres');
            break;
        case "cedula":
            validarForm(expresiones.cedula, e.target, 'cedula');
            break;
        case "direccion":
            validarForm(expresiones.direccion, e.target, 'direccion');
            break;
        case "correo":
            validarForm(expresiones.correo, e.target, 'correo');
            break;
        case "telefono":
            validarForm(expresiones.telefono, e.target, 'telefono');
            break;
    }
}

const validarForm = (expresion, input, campo) => {
    if (expresion.test(input.value)) {
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
        document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
        campos[campo] = true;
    } else {
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
        document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
        campos[campo] = false;
    }
}

inputs.forEach((input) => {
    input.addEventListener('keyup', validarCampos);
    input.addEventListener('blur', validarCampos);
});