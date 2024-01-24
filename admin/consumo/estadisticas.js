
  
/*-------------------------------------------------------- */
/*---------------  Verificar Token       ------------------*/
/*-------------------------------------------------------- */
    // Obtener el token almacenado en localStorage
	var token = localStorage.getItem('token');
	function verificarToken(){
	
		// Verificar si el token está presente
		if (!token) {
		
			alert('Token no encontrado. Inicia sesión para obtener uno.');	
			console.error('Token no encontrado. Inicia sesión para obtener uno.');
			// Manejar el caso en el que el token no esté presente
			return;
		}	
	}


/*-------------------------------------------------------- */
/*---------------    Mostrar Estadisticas------------------*/
/*-------------------------------------------------------- */
$(document).ready(function () {
    var estadisticas_api = 'https://mbytesolucionesapi.onrender.com/api/estadisticas';
    verificarToken();
  
    $.ajax({
      type: 'GET',
      dataType: 'json',
      url: estadisticas_api,
      headers: {
        'Authorization': 'Bearer ' + token,
      },
      success: function (data) {
        console.log(data);
        // Actualizar los valores en el HTML
        $('#pendientesSection .h3').text(data.data.pedidosListaContable[2].pedidos); // Pendientes
        $('#vendidosSection .h3').text(data.data.pedidosListaContable[0].pedidos); // Vendidos
        $('#canceladosSection .h3').text(data.data.pedidosListaContable[1].pedidos); // Cancelados
  
        $('#clientesRegistrados').text(data.data.usuarios_registrados); // Clientes Registrados
        $('#productos').text(data.data.NroPedidos); // Productos
      },
      error: function (error) {
        console.error("Error al obtener datos de la API:", error);
      }
    });
  });
  