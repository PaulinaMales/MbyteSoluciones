  
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

    // Función para mostrar mensaje de error
    function mostrarMensaje() {
        $('#successModal').modal('show');
        // Ocultar el mensaje después de 5 segundos (5000 milisegundos)
        setTimeout(function () {
            $('#successModal').modal('hide');
        }, 2000);
    }
/*-------------------------------------------------------- */
/*---------------    Filtrar por fecha - -------------------*/
/*-------------------------------------------------------- */
function buscarPedidosPorFecha() {
    var fechaInicio = $('#fechaInicio').val();
    var fechaFin = $('#fechaFin').val();

    // Verifica que se haya seleccionado al menos una fecha
    if (!fechaInicio || !fechaFin) {
        // Si las fechas están vacías, mostrar todos los pedidos
        mostrarTodosLosPedidos();
        return;
    }

    // Convierte las fechas a objetos de fecha
    var fechaInicioObj = new Date(fechaInicio);
    var fechaFinObj = new Date(fechaFin + 'T23:59:59'); // Agrega la última hora del día a la fecha de fin

    // Lógica para obtener y mostrar los pedidos según el rango de fechas
    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: 'https://mbytesolucionesapi.onrender.com/api/visualizar-pedidos',
        headers: {
            'Authorization': 'Bearer ' + token, // Incluir el token en el encabezado de autorización
        },
        success: function (data) {
            // Filtra los pedidos según el rango de fechas
            var pedidosFiltrados = data.pedidosBD.filter(function (pedido) {
                // Convierte la fecha del pedido a un objeto de fecha
                var fechaPedidoObj = new Date(pedido.fecha);

                // Compara las fechas
                return fechaPedidoObj >= fechaInicioObj && fechaPedidoObj <= fechaFinObj;
            });

            // Limpia los contenedores antes de mostrar los pedidos filtrados
            limpiarContenedores();

            // Muestra los pedidos filtrados
            mostrarPedidos(pedidosFiltrados);
        },
        error: function (error) {
            console.error("Error al obtener datos de la API:", error);
        }
    });
}


// Función para limpiar los contenedores de pedidos
function limpiarContenedores() {
    $("#tabla_pedidos_todos tbody").empty();
    $("#tabla_pedidos_pendientes tbody").empty();
    $("#tabla_pedidos_finalizados tbody").empty();
    $("#tabla_pedidos_anulados tbody").empty();
}

/*-------------------------------------------------------- */
/*---------------    Mostrar pedidos  - -------------------*/
/*-------------------------------------------------------- */
$(document).ready(function () {

    var pedidos_api = 'https://mbytesolucionesapi.onrender.com/api/visualizar-pedidos';
    verificarToken();
    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: pedidos_api,
        headers: {
            'Authorization': 'Bearer ' + token, // Incluir el token en el encabezado de autorización
        },        
        success: function (data) {
            if (data.pedidosBD && data.pedidosBD.length > 0) {
                mostrarTodosLosPedidos();
            } else {
                console.error("La respuesta de la API no contiene pedidos válidos.");
            }
        },
        error: function (error) {
            console.error("Error al obtener datos de la API:", error);
        }
    });

});


function mostrarTodosLosPedidos() {
    // Lógica para obtener y mostrar todos los pedidos
    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: 'https://mbytesolucionesapi.onrender.com/api/visualizar-pedidos',
        headers: {
            'Authorization': 'Bearer ' + token, // Incluir el token en el encabezado de autorización
        },
        success: function (data) {
            // Limpia los contenedores antes de mostrar los pedidos completos
            limpiarContenedores();

            // Muestra todos los pedidos
            mostrarPedidos(data.pedidosBD);
            mostrarPedidosTodos(data.pedidosBD);
        },
        error: function (error) {
            console.error("Error al obtener datos de la API:", error);
        }
    });
}


function formatearFecha(fecha) {
    // Formatear la fecha a YYYY-MM-DD
    return fecha.substring(0, 10);
}	
/*-------------------------------------------------------- */
/*--------------- Mostrar Pedidos Funcion -----------------*/
/*-------------------------------------------------------- */

function mostrarPedidos(pedidos, containerSelector) {
    var container = containerSelector ? $(containerSelector + ' tbody') : $("#tabla_pedidos_todos tbody");

    for (var i = 0; i < pedidos.length; i++) {
        var pedido = pedidos[i];
        var container;
        if (pedido.estado === 'Anulado') {
            container = $("#tabla_pedidos_anulados tbody");
        } else if (pedido.estado === "Finalizado") {
            container = $("#tabla_pedidos_finalizados tbody");
        } else if (pedido.estado === "Pendiente") {
            container = $("#tabla_pedidos_pendientes tbody");
        }

        // Verificar si cliente es null antes de acceder a sus propiedades
        var clienteNombre = pedido.cliente ? pedido.cliente.nombre : 'Usuario Eliminado';
        var clienteTelefono = pedido.cliente ? pedido.cliente.telefono : 'N/A';

        // Agrega o quita clases según el estado
        var estadoClass = '';
        switch (pedido.estado) {
            case 'Anulado':
                estadoClass = 'badge-danger';
                break;
            case 'Finalizado':
                estadoClass = 'badge-success';
                break;
            case 'Pendiente':
                estadoClass = 'badge-warning';
                break;
        }

        var pedidoHtml = '<tr>' +
            '<td>' + (i + 1) + '</td>' +
            '<td>' + clienteNombre + '</td>' +
            '<td>' + clienteTelefono + '</td>' +
            '<td>' + formatearFecha(pedido.fecha) + '</td>' +
            '<td><span class="badge badge-pill ' + estadoClass + '">' + pedido.estado + '</span></td>' +
            '<td> <button onclick="abrirModalPedido(\'' + pedido._id + '\')" type="button" class="btn mb-2 btn-secondary" data-toggle="modal" data-target="#pedidoModal"><span class="fe fe-send fe-16"><span></button>' +
            '</tr>';
        container.append(pedidoHtml);
    }
}



function mostrarPedidosTodos(pedidos) {
    for (var i = 0; i < pedidos.length; i++) {
        var pedido = pedidos[i];
       // var container;
        var container = $("#tabla_pedidos_todos tbody");
         // Verificar si cliente es null antes de acceder a sus propiedades
         var clienteNombre = pedido.cliente ? pedido.cliente.nombre : 'Usuario Eliminado';
         var clienteTelefono = pedido.cliente ? pedido.cliente.telefono : 'N/A';

            // Agrega o quita clases según el estado
            var estadoClass = '';
            switch (pedido.estado) {
                case 'Anulado':
                    estadoClass = 'badge-danger';
                    break;
                case 'Finalizado':
                    estadoClass = 'badge-success';
                    break;
                case 'Pendiente':
                    estadoClass = 'badge-warning';
                    break;
                // Puedes agregar más casos según tus necesidades
            }
        var pedidoHtml = '<tr>' +
            '<td>' + (i + 1) + '</td>' +
            '<td>' + clienteNombre + '</td>' +
            '<td>' + clienteTelefono + '</td>' +
            '<td>' + formatearFecha(pedido.fecha) + '</td>' +
            '<td><span class="badge badge-pill ' + estadoClass + '">' + pedido.estado + '</span></td>' +
            '<td> <button onclick="abrirModalPedido(\'' + pedido._id + '\')" type="button" class="btn mb-2 btn-secondary" data-toggle="modal" data-target="#pedidoModal"><span class="fe fe-send fe-16"><span></button>' +
            '</tr>';

        container.append(pedidoHtml);
    }
}

/*-------------------------------------------------------- */
/*--------------- Abrir Modal del pedido ------------------*/
/*-------------------------------------------------------- */
	//Abrir Moda
	var idPedido; // Declara una variable global para almacenar la información del pedido

    function abrirModalPedido(id) {
        verificarToken();
        var pedido_api = 'https://mbytesolucionesapi.onrender.com/api/visualizar-pedido/' + id;
        $("#detallePedidoBody").empty();
    
        $.ajax({
            type: 'GET',
            dataType: 'json',
            url: pedido_api,
            headers: {
                'Authorization': 'Bearer ' + token,
            },
            success: function (data) {
                // Limpiar el cuerpo de la tabla antes de agregar nuevas filas
    
                // Llenar los campos del formulario en el modal
                var orderPedidosHtml = '';
    
                // Iterar sobre los productos del pedido
                for (var i = 0; i < data.pedido.items.length; i++) {
                    var producto = data.pedido.items[i].id_producto;
                    var unidades = data.pedido.items[i].cantidad;
                    var precioUnitario = data.pedido.items[i].precio;
                    var precioTotal = data.pedido.items[i].total;
                    var subtotal = data.pedido.total;
    
                    // Crear una nueva fila de tabla
                    var orderPedidosHtml = '<tr>' +
                        '<td>' + producto.nombre + '</td>' +
                        '<td>' + unidades + '</td>' +
                        '<td>' + precioUnitario + '$</td>' +
                        '<td>' + precioTotal + '$</td>' +
                        '</tr>';
    
                    // Agregar la fila a la tabla
                    $("#detallePedidoBody").append(orderPedidosHtml);
    
                    // Actualizar el total de compra
                    $("#totalCompra strong").html(subtotal);

                    // Mostrar observaciones
                $("#observacion").text(data.pedido.observaciones);
                }
        
                // Mostrar estado de envío a domicilio
                var envioDomicilioHtml = data.pedido.domicilio ? 'Sí' : 'No';
                $("#direccionCheckbox").prop('checked', data.pedido.domicilio);
                $("#direccionCheckbox").prop('disabled', true);
                $("#hiddenText").toggle(data.pedido.domicilio);
    
                // Mostrar forma de pago seleccionada
                var formaPagoSeleccionadaHtml = '';
                if (data.pedido.forma_pago === 'Transferencia Bancaria') {
                    formaPagoSeleccionadaHtml = 'Transferencia Bancaria';
                    $("#transferencia").prop('checked', true);
                } else if (data.pedido.forma_pago === 'Pago en Efectivo') {
                    formaPagoSeleccionadaHtml = 'Pago en Efectivo';
                    $("#efectivo").prop('checked', true);
                }
    
                // Mostrar estado de pago
                var estadoPagoHtml = '';
                if (data.pedido.estado) {
                    estadoPagoHtml = data.pedido.estado;
                    if (data.pedido.estado === 'Anulado') {
                        $("#anuladoRadio").prop('checked', true);
                    } else if (data.pedido.estado === 'Finalizado') {
                        $("#finalizadoRadio").prop('checked', true);
                    }
                }
    
            },
            error: function (error) {
                console.error("Error al obtener datos de la API:", error);
            }
        });
    
        return idPedido = id;
    }
/*-------------------------------------------------------- */
/*---------------  Seleccionar estado de pago--------------*/
/*-------------------------------------------------------- */ 
	function crearEstadoPedido() {
			// Obtener los valores 
            var estado_pedido;
            if ($('#anuladoRadio').is(':checked')) {
                estado_pedido = 'Anulado';
            } else if ($('#finalizadoRadio').is(':checked')) {
                estado_pedido = 'Finalizado';
            }
			verificarToken();
			// Objeto que contiene los datos a enviar
			var datosParaEnviar = {
				estado: estado_pedido,
			};
			// URL de la API 
			var editar_api = 'https://mbytesolucionesapi.onrender.com/api/actualizar-pedido-estado/' +idPedido;
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
					console.log("Estado de pedido creado exitosamente:", data);
                    $('#titulo').html('Exito!');
                    $('#pedidoModal').modal('hide');  
					$('#mensaje').html('Estado de pedido creado exitosamente!');
					 // Mostrar el modal de éxito
                    mostrarMensaje();				
				   // Retraso de 2 segundo antes de recargar la página
					setTimeout(function () {
						window.location.reload();
					}, 2000);	
				},
				error: function (error) {
					console.error("Error al crear estado de pago", error);
                    $('#titulo').html('Error');
                    $('#mensaje').html(error.responseJSON.mensaje);
                    mostrarMensaje();  
                    setTimeout(function () {
						window.location.reload();
					}, 2000);                
				}
			});
	}