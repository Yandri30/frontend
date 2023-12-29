const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

const expresiones = {
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    apellido: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    cedula: /^\d{10}$/, // 10 numeros.
    password: /^.{4,12}$/, // 4 a 12 digitos.
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    telefono: /^\d{10}$/ // 10 numeros.
}

const campos = {
    nombres: false,
    apellidos: false,
    cedula: false,
    password: false,
    email: false,
    telefono: false,
}

const validarCampos = (e) => {
    switch (e.target.name) {
        case "nombres":
            validarForm(expresiones.nombre, e.target, 'nombres');
            break;
        case "apellidos":
            validarForm(expresiones.apellido, e.target, 'apellidos');
            break;
        case "cedula":
            validarForm(expresiones.cedula, e.target, 'cedula');
            break;
        case "password":
            validarForm(expresiones.password, e.target, 'password');
            break;
        case "email":
            validarForm(expresiones.email, e.target, 'email')
            break;
        case "telefono":
            validarForm(expresiones.telefono, e.target, 'telefono')
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