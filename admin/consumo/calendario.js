/*-------------------------------------------------------- */
/*-------------  Mensaje de Alerta        ---------------- */
/*-------------------------------------------------------* */ 
function mostrarMensaje() {
    var mensaje = document.getElementById('mensajeAlerta');
    mensaje.style.display = 'block';

    // Ocultar el mensaje después de 5 segundos (5000 milisegundos)
    setTimeout(function () {
        mensaje.style.display = 'none';
    }, 4000);
}

/*-------------------------------------------------------- */
/*-------------   Verificar Token------------  ---------- */
/*-------------------------------------------------------* */ 
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
/*----------------    Crear Evento     ------------------- */
/*-------------------------------------------------------* */
function crearCategoria() {
    // Obtener los valores del formulario
    var titulo = document.getElementById('evenTitle').value;
    var nota = document.getElementById('eventNote').value;
    var fecha_inicio = document.getElementById('drgpicker-start').value;
    var fecha_fin = document.getElementById('drgpicker-end').value;
    var hora_incio = document.getElementById('start-time').value;
    var hora_fin = document.getElementById('end-time').value;
	verificarToken();

    // Objeto que contiene los datos a enviar
    var datosParaEnviar = {
        titulo: titulo,
        descripcion: nota,
        fecha_inicio:fecha_inicio,
        fecha_fin:fecha_fin,
        hora_incio:hora_incio,
        hora_fin:hora_fin
    };

    // URL de la API para crear una nueva categoría
    var crear_api = 'https://mbytesolucionesapi.onrender.com/api/calendario/crear-evento';

    // Realizar la solicitud POST al servidor
    $.ajax({
        type: 'POST',
        contentType: 'application/json',
        url: crear_api,
        data: JSON.stringify(datosParaEnviar),
        headers: {
            'Authorization': 'Bearer ' + token, // Incluir el token en el encabezado de autorización
        },
        success: function (data) {
            // Manejar la respuesta exitosa del servidor
            console.log("Evento creado exitosamente:", data);
            // Opcional: Puedes cerrar el modal después de crear la categoría
            $('#eventModal').modal('hide');
            $('#titulo').html('¡Éxito!');
            $('#mensaje').html('Evento creada exitosamente!');
            // Abrir el modal de éxito
            $('#successModal').modal('show');

            // Retraso de 1 segundo antes de recargar la página
            setTimeout(function () {
                window.location.reload();
            }, 2000);
        },
        error: function (error) {
            // Manejar los errores
            console.error("Error al crear el evento:", error);
        }
    });
}

/*-------------------------------------------------------- */
/*----------------    Crear Evento     ------------------- */
/*-------------------------------------------------------* */