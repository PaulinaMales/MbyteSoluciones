	
    // Obtener el token almacenado en localStorage
    var token = localStorage.getItem('token');
    function verificarToken(){

        // Verificar si el token está presente
        if (!token) {
        
            $('#mensaje').html('Token no encontrado. Inicia sesión para obtener uno.');	
            $('#successModal').modal('show');
            console.error('Token no encontrado. Inicia sesión para obtener uno.');
            // Manejar el caso en el que el token no esté presente
            return;
        }	
    }

/*-------------------------------------------------------- */
/*--------------- Consumir Api Perfil ---------------------*/
/*-------------------------------------------------------- */
    $(document).ready(function () {
        //Mostrar datos perfil
        var consumo_api = 'https://mbytesolucionesapi.onrender.com/api/cliente/perfil';
        verificarToken();
        $.ajax({
            type: 'GET',
            dataType: 'json',
            url: consumo_api,
            headers: {
                'Authorization': 'Bearer ' + token, // Incluir el token en el encabezado de autorización
            },				
            success: function (data) {
                mostrarDatosPerfil(data);
            },
            error: function (error) {
                console.error("Error al obtener detalles del cliente:", error);
            }
        });
		
    });
/*-------------------------------------------------------- */
/*--------------- Mostrar Perfil  -------------------------*/
/*-------------------------------------------------------- */
    function mostrarDatosPerfil(datos) {

            //console.log(datos);
            cliente = datos.clienteBD; 
  
            // Llenar los campos del perfil
            $("#nombre").val(cliente.nombre);
            $("#nombrePerfil").html(cliente.nombre+" "+cliente.apellido+" <i class='fa fa-user'></i>");
            $("#apellido").val(cliente.apellido);
            $("#inputEmail").val(cliente.correo);
            $("#direccion").val(cliente.direccion);
            $("#telefono").val(cliente.telefono);

            $("#nombreCliente").html(cliente.nombre+" "+cliente.apellido);
    }

function actualizarDatos(event){
    event.preventDefault(); // Detener el comportamiento predeterminado del formulario

            // Obtener los valores actualizados del formulario de actualización
            var nombre = document.getElementById('nombre').value;
			var apellido = document.getElementById('apellido').value;
			//var email = document.getElementById('inputEmail').value;
			var direccion = document.getElementById('direccion').value;
			var telefono = document.getElementById('telefono').value;

			// Objeto que contiene los datos a enviar
			var datosParaEnviar = {
                nombre: nombre,
				apellido: apellido,
				direccion: direccion,
                telefono: telefono,
			};

			// URL de la API para editar el producto actual
			var editar_api = 'https://mbytesolucionesapi.onrender.com/api/cliente/actualizar';
			verificarToken();
			// Realizar la solicitud PUT al servidor
			$.ajax({
				type: 'PUT',
				contentType: 'application/json',
				url: editar_api,
				data: JSON.stringify(datosParaEnviar),
				headers: {
					'Authorization': 'Bearer ' + token, // Incluir el token en el encabezado de autorización
				},					
				success: function (data) {
					console.log("Perfil actualizado exitosamente:", data);
                    // Modificar la clase de la alerta para cambiar el estilo
                    $('#mensajeAlerta').removeClass('alert-danger').addClass('alert-info');
                    $('#mensajeAlerta').html('Datos actualizados correctamente');
                    mostrarMensaje();
					
				   // Retraso de 1 segundo antes de recargar la página
					setTimeout(function () {
						window.location.reload();
					}, 2000);
	
				},
				error: function (error) {
					console.error("Error al actualizar el perfil", error);
                    // Modificar la clase de la alerta para cambiar el estilo
                    $('#mensajeAlerta').removeClass('alert-info').addClass('alert-danger');
                    $('#mensajeAlerta').html('No existen datos nuevos que actualizar.');
                    if(error.responseJSON.msg!=""){
                        $('#mensajeAlerta').html(error.responseJSON.msg);
                        mostrarMensaje();
                    }else{
                        $('#mensajeAlerta').html('No existen datos nuevos que actualizar.');
                        mostrarMensaje();  
                    }                      
                
				}
			});

}

function actualizarPassword(event){
            event.preventDefault(); // Detener el comportamiento predeterminado del formulario

            // Obtener los valores actualizados del formulario de actualización
            var lastPassword = document.getElementById('contraseniaAntigua').value;
			var newPassword = document.getElementById('contraseniaNueva').value;
			var confirmPassword = document.getElementById('contraseniaConfirmar').value;
            // Verificar que la nueva contraseña no sea igual a la antigua
            if (newPassword === lastPassword) {
                // Mostrar mensaje de error
                $('#mensajeAlertaContraseña').removeClass('alert-info').addClass('alert-danger');
                $('#mensajeAlertaContraseña').html('La nueva contraseña no puede ser igual a la contraseña antigua.');
                mostrarMensajeContraseña();
                limpiarCampos();
                return; // Detener la ejecución de la función si hay un error
            }
            // Validar la contraseña
            if (!validarContrasenia(newPassword) || !validarContrasenia(confirmPassword)) {
                // Mostrar un mensaje de error si la contraseña no cumple con los requisitos
                $('#mensajeAlertaContraseña').removeClass('alert-info').addClass('alert-danger');
                $('#mensajeAlertaContraseña').html('La contraseña debe tener al menos 10 caracteres, un número, un símbolo y una letra mayúscula.');
                mostrarMensajeContraseña();
                return;
            }              
             // Verificar que la nueva contraseña  sea igual a la confirmación
             if (newPassword != confirmPassword) {
                // Mostrar mensaje de error
                $('#mensajeAlertaContraseña').removeClass('alert-info').addClass('alert-danger');
                $('#mensajeAlertaContraseña').html('La nueva contraseña no es igual a la confirmación de la contraseña.');
                mostrarMensajeContraseña();
                limpiarCampos();
                return; // Detener la ejecución de la función si hay un error
            }           
			// Objeto que contiene los datos a enviar
			var datosParaEnviar = {
                oldercontrasenia:lastPassword,
                nuevaContrasenia:newPassword,
                confirmcontrasenia:confirmPassword

			};

			// URL de la API para editar el producto actual
			var editar_api = 'https://mbytesolucionesapi.onrender.com/api/cliente/actualizarPassword';
			verificarToken();
			// Realizar la solicitud PUT al servidor
			$.ajax({
				type: 'PUT',
				contentType: 'application/json',
				url: editar_api,
				data: JSON.stringify(datosParaEnviar),
				headers: {
					'Authorization': 'Bearer ' + token, // Incluir el token en el encabezado de autorización
				},					
				success: function (data) {
					console.log("Contraseña actualizado exitosamente:", data);
                    // Modificar la clase de la alerta para cambiar el estilo
                    $('#mensajeAlertaContraseña').removeClass('alert-danger').addClass('alert-info');
                    $('#mensajeAlertaContraseña').html('Contraseña actualizada correctamente');
                    mostrarMensajeContraseña();
                    limpiarCampos();
	
				},
				error: function (error) {
					console.error("Error al actualizar el perfil", error);
                    // Modificar la clase de la alerta para cambiar el estilo
                    $('#mensajeAlertaContraseña').removeClass('alert-info').addClass('alert-danger');
                    if(error.responseJSON.msg!=""){
                        $('#mensajeAlertaContraseña').html(error.responseJSON.msg);
                        mostrarMensajeContraseña();
                    }else{
                        $('#mensajeAlertaContraseña').html('No existen datos nuevos que actualizar.');
                        mostrarMensajeContraseña();  
                    }                    
                 
				}
			});

}
//Mensajes de Aviso
function mostrarMensaje() {
    var mensaje = document.getElementById('mensajeAlerta');
    mensaje.style.display = 'block';

    // Ocultar el mensaje después de 5 segundos (5000 milisegundos)
    setTimeout(function () {
        mensaje.style.display = 'none';
    }, 9000);
}
function mostrarMensajeContraseña() {
    var mensaje = document.getElementById('mensajeAlertaContraseña');
    mensaje.style.display = 'block';

    // Ocultar el mensaje después de 5 segundos (5000 milisegundos)
    setTimeout(function () {
        mensaje.style.display = 'none';
    }, 9000);
}

function limpiarCampos() {
    // Limpiar los campos 
    document.getElementById('contraseniaAntigua').value = '';
    document.getElementById('contraseniaNueva').value = '';
    document.getElementById('contraseniaConfirmar').value = '';

    // Devolver el enfoque al campo 
    document.getElementById('contraseniaAntigua').focus();
}

function validarContrasenia(contrasenia) {
    // Validar la contraseña con los requisitos especificados
    var regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z])(?=.{10,})/;
    return regex.test(contrasenia);
}