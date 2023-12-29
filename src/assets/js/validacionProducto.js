const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');
const textarea = document.querySelectorAll('#formulario textarea');

const expresiones = {
    titulo: /^[a-zA-ZÀ-ÿ-Z0-9\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    descripcion: /^[\w\u00C0-\u017F\s,\u0027-/]{1,200}$/, // Letras y espacios, pueden llevar acentos.
}

const campos = {
    titulo: false,
    descripcion: false,
}

const validarCampos = (e) => {
    switch (e.target.name) {
        case "titulo":
            validarForm(expresiones.titulo, e.target, 'titulo');
            break;
        case "descripcion":
            validarForm(expresiones.descripcion, e.target, 'descripcion');
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

const validarFormText = (expresion, textarea, campo) => {
    if (expresion.test(textarea.value)) {
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

textarea.forEach((input) => {
    input.addEventListener('keyup', validarCampos);
    input.addEventListener('blur', validarCampos);
});
