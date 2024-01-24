

function registraUsuario() {
	//event.preventDefault(); // Detener el comportamiento predeterminado del formulario
    // Obtener los valores del formulario
    var nombre = document.getElementById('nombre').value;
    var apellido = document.getElementById('apellido').value;
    var direccion = document.getElementById('direccion').value;
    var telefono = document.getElementById('telefono').value;  
    var correo = document.getElementById('email').value;  
    var contrasenia = document.getElementById('password').value;

    // Validar la contraseña
    if (!validarContrasenia(contrasenia)) {
        // Mostrar un mensaje de error si la contraseña no cumple con los requisitos
        $('#mensajeAlerta').removeClass('alert-info').addClass('alert-danger');
        $('#mensajeAlerta').html('La contraseña debe tener al menos 10 caracteres, un número, un símbolo y una letra mayúscula.');
        mostrarMensajeError();
        return;
    }    
    // Objeto que contiene los datos a enviar
    var datosParaEnviar = {
        nombre: nombre,
        apellido: apellido,
        direccion: direccion,
        telefono: telefono,
        correo: correo,
        contrasenia: contrasenia
    };
    // URL de la API para registrar usuario
    var registro_api = 'https://mbytesolucionesapi.onrender.com/api/registro';

    // Realizar la solicitud POST al servidor
    $.ajax({
        type: 'POST',
        contentType: 'application/json',
        url: registro_api,
        data: JSON.stringify(datosParaEnviar),
        success: function (data) {
            // Modificar la clase de la alerta para cambiar el estilo
            $('#mensajeAlerta').removeClass('alert-danger').addClass('alert-info');
            $('#mensajeAlerta').html('Revise su correo electrónico para confirmar la cuenta');
            mostrarMensajeError();
            limpiarCampos();
        },
        error: function (error) {
            // Modificar la clase de la alerta para cambiar el estilo
            $('#mensajeAlerta').removeClass('alert-info').addClass('alert-danger');
            $('#mensajeAlerta').html(error.responseJSON.msg);
            mostrarMensajeError();
            //limpiarCampos();
        }
    });
}


function mostrarMensajeError() {
    var mensaje = document.getElementById('mensajeAlerta');
    mensaje.style.display = 'block';

    // Ocultar el mensaje después de 5 segundos (5000 milisegundos)
    setTimeout(function () {
        mensaje.style.display = 'none';
    }, 9000);
}

function limpiarCampos() {
    // Limpiar los campos de correo y contraseña
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
    document.getElementById('nombre').value = '';
    document.getElementById('apellido').value = '';
    document.getElementById('telefono').value = '';
    document.getElementById('direccion').value = '';
    // Devolver el enfoque al campo de correo
    document.getElementById('email').focus();
}

function validarNumeros(e) {
    // Obtiene el valor actual del campo de teléfono
    var telefono = e.value;
    // Elimina cualquier caracter que no sea un número
    var telefonoNumerico = telefono.replace(/\D/g, '');
    e.value = telefonoNumerico;
}

function validarContrasenia(contrasenia) {
    // Validar la contraseña con los requisitos especificados
    var regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z])(?=.{10,})/;
    return regex.test(contrasenia);
}
