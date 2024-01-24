import $ from "jquery";

function iniciarSesion() {
        // Obtener los valores del formulario
        var correo = document.getElementById('email').value;
        var contrasenia = document.getElementById('password').value;
        var mensaje = document.getElementById('mensajeAlerta');


    // Objeto que contiene los datos a enviar 
    var datosParaEnviar = {
        correo: correo,
        contrasenia: contrasenia
    };

    // URL de la API para iniciar sesión
    var login_api = 'https://mbytesolucionesapi.onrender.com/api/login';

    // Realizar la solicitud POST al servidor
    $.ajax({
        type: 'POST',
        contentType: 'application/json',
        url: login_api,
        data: JSON.stringify(datosParaEnviar),
        success: function (data) {
            // Verificar el tipo de cuenta y redirigir
            if (data.tipo_cuenta === 'Cliente') {
                // Redirigir a la vista del cliente
                window.location = 'cliente/index.php';
                // Almacenar el token en localStorage
                localStorage.setItem('token', data.token);                
            } else if (data.tipo_cuenta === 'Admin') {
                // Redirigir a la vista del administrador
                window.location = 'admin/index.html';
                // Almacenar el token en localStorage
                localStorage.setItem('token', data.token);
            } else {
                // Tipo de cuenta desconocido
                console.error('Tipo de cuenta desconocido');

            }
        },
        error: function (error) {
            // Manejar los errores
            console.error("Error al iniciar sesión:", error);

        }
    });
}


// Exportar las funciones
export default iniciarSesion;