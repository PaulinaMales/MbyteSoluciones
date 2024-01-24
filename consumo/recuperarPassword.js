/*-------------------------------------------------------- */
/*--------------- Enviar Email Recuperación ---------------*/
/*-------------------------------------------------------- */
function recuperarPassword() {
    // Obtener los valores del formulario
    var email = document.getElementById('email').value;

    // Objeto que contiene los datos a enviar
    var datosParaEnviar = {
        correo: email,
    };

    // URL de la API para crear un nuevo producto
    var consumo_api = 'https://mbytesolucionesapi.onrender.com/api/recuperar-password';

        // Realizar la solicitud POST al servidor
        $.ajax({
            type: 'POST',
            contentType: 'application/json', // Corrección en el nombre del encabezado
            url: consumo_api,
            data: JSON.stringify(datosParaEnviar),  // Enviar los datos al servidor
            success: function (data) {
                // Manejar la respuesta exitosa del servidor
                console.log("Email enviado exitosamente:", data);
                // Modificar la clase de la alerta para cambiar el estilo
                $('#mensajeAlerta').removeClass('alert-danger').addClass('alert-info');
                $('#mensajeAlerta').html('Revise su correo electrónico para la recuperación de contraseña.');
                mostrarMensajeError();
                limpiarCampos();
            },
            error: function (error) {
                // Manejar los errores
                console.error("Error al enviar email:", error);
                // Modificar la clase de la alerta para cambiar el estilo
                $('#mensajeAlerta').removeClass('alert-info').addClass('alert-danger');
                if(error.responseJSON.msg!=""){
                    $('#mensajeAlerta').html(error.responseJSON.msg);
                }else{
                    $('#mensajeAlerta').html('Ocurrio un error al envíar el email.');
                }
                
                mostrarMensajeError();
            }
        });
}

function mostrarMensajeError() {
    var mensaje = document.getElementById('mensajeAlerta');
    mensaje.style.display = 'block';

    // Ocultar el mensaje después de 5 segundos (5000 milisegundos)
    setTimeout(function () {
        mensaje.style.display = 'none';
    }, 7000);
}

function limpiarCampos() {
    // Limpiar los campos de correo y contraseña
    // Devolver el enfoque al campo de correo
    document.getElementById('email').value = '';
    document.getElementById('email').focus();
}

function limpiarCamposContrasenia() {
    // Limpiar los campos de correo y contraseña
    // Devolver el enfoque al campo de correo
    document.getElementById('contraseniaNueva').value = '';
    document.getElementById('contraseniaConfirmar').value = '';
}
/*-------------------------------------------------------- */
/*------------------- Nueva Contraseña --------------------*/
/*-------------------------------------------------------- */

function nuevoPassword(token) {
    //event.preventDefault(); // Detener el comportamiento predeterminado del formulario

    // Obtener los valores del formulario
    var newPassword = document.getElementById('contraseniaNueva').value;
    var confirmPassword = document.getElementById('contraseniaConfirmar').value;

    // Validar la contraseña
    if (!validarContrasenia(newPassword) || !validarContrasenia(confirmPassword)) {
        // Mostrar un mensaje de error si la contraseña no cumple con los requisitos
        $('#mensajeAlerta').removeClass('alert-info').addClass('alert-danger');
        $('#mensajeAlerta').html('La contraseña debe tener al menos 10 caracteres, un número, un símbolo y una letra mayúscula.');
        mostrarMensajeError();
        return;
    }  

    // Verificar que la nueva contraseña  sea igual a la confirmación
    if (newPassword != confirmPassword) {
        // Mostrar mensaje de error
        $('#mensajeAlerta').removeClass('alert-info').addClass('alert-danger');
        $('#mensajeAlerta').html('La nueva contraseña no es igual a la confirmación de la contraseña.');
        mostrarMensajeError();
        limpiarCamposContrasenia();
        return; // Detener la ejecución de la función si hay un error
    }


    // Objeto que contiene los datos a enviar
    var datosParaEnviar = {
        password: newPassword,
        confirmpassword:confirmPassword
    };

    // URL de la API para crear un nuevo producto
    var consumo_api = 'https://mbytesolucionesapi.onrender.com/api/nuevo-password/'+token;

        // Realizar la solicitud POST al servidor
        $.ajax({
            type: 'POST',
            contentType: 'application/json', // Corrección en el nombre del encabezado
            url: consumo_api,
            data: JSON.stringify(datosParaEnviar),  // Enviar los datos al servidor
            success: function (data) {
                // Manejar la respuesta exitosa del servidor
                console.log("Contraseña creada exitosamente:", data);
                $('#mensaje').html('Contraseña creada exitosamente! Ya puede inciar sesión');
                // Abrir el modal de éxito
                $('#successModal').modal('show');

                // Retraso de 1 segundo antes de recargar la página
                setTimeout(function () {
                    window.location.href="https://mbytesoluciones.com/login.php";
                },4000);
            },
            error: function (error) {
                // Manejar los errores
                console.error("Error al enviar email:", error);
                // Modificar la clase de la alerta para cambiar el estilo
                $('#mensajeAlerta').removeClass('alert-info').addClass('alert-danger');
                $('#mensajeAlerta').html('Error al envíar los datos. Intentelo de Nuevo.');
                mostrarMensajeError();
            }
        });
}

function validarContrasenia(contrasenia) {
    // Validar la contraseña con los requisitos especificados
    var regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z])(?=.{10,})/;
    return regex.test(contrasenia);
}