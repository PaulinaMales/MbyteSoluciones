  
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
        }, 1000);
    }
      
/*-------------------------------------------------------- */
/*---------     Agregar Productos        --------------- */
/*-------------------------------------------------------* */
    function agregarProducto(productoId) {
        // Verificar el token antes de hacer la solicitud
        verificarToken();
    
        // URL de la API para agregar productos al carrito
        var agregar_api = 'https://mbytesolucionesapi.onrender.com/api/carrito/agregar';
    
        // Datos que se enviarán en la solicitud POST
        var datosParaEnviar = {
            id_producto: productoId,
            cantidad: 1, 
        };
    
        // Realizar la solicitud POST al servidor
        $.ajax({
            type: 'POST',
            contentType: 'application/json',
            url: agregar_api,
            data: JSON.stringify(datosParaEnviar),
            headers: {
                'Authorization': 'Bearer ' + token, // Incluir el token en el encabezado de autorización
            },
            success: function (data) {
                console.log("Producto agregado al carrito:", data);
                // Puedes mostrar un mensaje de éxito o realizar otras acciones necesarias
                $('#titulo').html('Exito!');
                $('#mensaje').html('Producto agregado al carrito!');
                $('#successModal').modal('show');  // Mostrar el modal de éxito  
                    // Ocultar el mensaje después de 5 segundos (5000 milisegundos)
                    setTimeout(function () {
                        $('#successModal').modal('hide');
                    }, 1000);                          
            },
            error: function (error) {
                console.error("Error al agregar el producto al carrito:", error);
                // Puedes mostrar un mensaje de error o realizar otras acciones necesarias
                $('#titulo').html('Error');
                $('#mensaje').html('Ocurrio un error al agregar al carrito!');
                $('#successModal').modal('show');  // Mostrar el modal de éxito
            }
        });
    }
     //Ver carrito 
     $(document).ready(function () {
        verificarToken();
        var carrito_api = 'https://mbytesolucionesapi.onrender.com/api/carrito/detalle';

        $.ajax({
            type: 'GET',
            dataType: 'json',
            url: carrito_api,
            headers: {
                'Authorization': 'Bearer ' + token, // Incluir el token en el encabezado de autorización
            },           
            success: function (data) {
                mostrarCarrito(data);
            },
            error: function (error) {
                console.error("Error al obtener datos de la API:", error);
            }
        });
    });	
/*-------------------------------------------------------- */
/*---------------     Ver Carrito       ------------------ */
/*-------------------------------------------------------* */
function mostrarCarrito(carrito) {
    var container = $("#tabla_carrito_detalles tbody");

    // Verifica si carrito.Carrito.items es una matriz antes de intentar recorrerla
    if (Array.isArray(carrito.Carrito.items)) {
        // Recorre los productos en items
        for (var i = 0; i < carrito.Carrito.items.length; i++) {
            var producto = carrito.Carrito.items[i].id_producto;
        
            var carritoHtml = '<tr>' +
                '<td class="nombreProducto">' + producto.nombre + '</td>' +
                '<td><img src="' + producto.imagen.secure_url + '" alt="..." style="width: 100px;"></td>' +
                '<td>' +
                    '<div class="input-number price-min" style="width: fit-content;">' +
                        '<input id="cantidad_' + carrito.Carrito.items[i].id_producto._id + '" type="number" style="width: none;" value="' + carrito.Carrito.items[i].cantidad + '">' +
                        '<span class="qty-up" onclick="aumentarCantidad(\'' + carrito.Carrito.items[i].id_producto._id + '\')">+</span>' +
                        '<span class="qty-down" onclick="disminuirCantidad(\'' + carrito.Carrito.items[i].id_producto._id + '\')">-</span>' +
                    '</div>' +
                '</td>' +
                '<td style="text-align:center" class="precio">' + carrito.Carrito.items[i].precio + '$</td>' +
                '<td style="text-align:center" class="totalPrecio">' + carrito.Carrito.items[i].total + '$</td>' +
                '<input class="productoId" value="' + carrito.Carrito.items[i].id_producto._id + '" style="display:none"></input>' +
                '<td><button type="button" onclick="quitarProducto(\'' + carrito.Carrito.items[i].id_producto._id + '\')" class="btn btn-danger"><i class="fa fa-trash"></i></button></td>' +
                '</tr>';
        
            container.append(carritoHtml);
        }
    }

    // Muestra la fila de subtotal del carrito
    var subtotalHtml = '<tr>' +
        '<td colspan="4"><strong>Subtotal</strong></td>' +
        '<td id="subtotal"><strong>' + carrito.Carrito.subtotal + ' $</strong></td>' +
        '<td></td>' +
        '</tr>';

    container.append(subtotalHtml);
}

	
/*-------------------------------------------------------- */
/*------------     Quitar Productos        --------------- */
/*-------------------------------------------------------* */
function quitarProducto(productoId) {

    if (productoId) {
        // URL de la API para eliminar el producto
        var eliminar_api = 'https://mbytesolucionesapi.onrender.com/api/carrito/eliminar-producto/' + productoId;
        verificarToken();

        // Realizar la solicitud DELETE al servidor
        $.ajax({
            type: 'DELETE',
            url: eliminar_api,
            headers: {
                'Authorization': 'Bearer ' + token, // Incluir el token en el encabezado de autorización
            },
            success: function (data) {
                console.log("Producto eliminado exitosamente.", data);
                $('#titulo').html('Exito!');
                $('#mensaje').html('Producto quitado exitosamente.');
                $('#successModal').modal('show');  // Mostrar el modal de éxito  
                    // Ocultar el mensaje después de 5 segundos (5000 milisegundos)
                    setTimeout(function () {
                        $('#successModal').modal('hide');
                    }, 1000);     

                // Retraso de 1 segundo antes de recargar la página
                setTimeout(function () {
                    window.location.reload();
                }, 1500);
            },
            error: function (error) {
                console.error("Error al quitar producto:", error);
            }
        });
    } else {
        console.error("No se encontró información del carrito para eliminar.");
    }
}

/*-------------------------------------------------------- */
/*---------     Actualizar Cantidad        --------------- */
/*-------------------------------------------------------* */

function aumentarCantidad(productoId) {
    var inputCantidad = $('#cantidad_' + productoId);
    var nuevaCantidad = parseInt(inputCantidad.val()) + 1;
    inputCantidad.val(nuevaCantidad);
    actualizarCantidad(productoId, nuevaCantidad);
}

// Función para disminuir la cantidad
function disminuirCantidad(productoId) {
    var inputCantidad = $('#cantidad_' + productoId);
    var nuevaCantidad = Math.max(parseInt(inputCantidad.val()) - 1, 0);
    inputCantidad.val(nuevaCantidad);
    actualizarCantidad(productoId, nuevaCantidad);
}

// Función para actualizar la cantidad
function actualizarCantidad(productoId, nuevaCantidad) {
    verificarToken();
    var datosParaEnviar = {
        cantidad: nuevaCantidad,
    };

    var editar_api = 'https://mbytesolucionesapi.onrender.com/api/carrito/actualizar-cantidad/' + productoId;

    $.ajax({
        type: 'PUT',
        contentType: 'application/json',
        url: editar_api,
        data: JSON.stringify(datosParaEnviar),
        headers: {
            'Authorization': 'Bearer ' + token,
        },
        success: function (data) {
            console.log("Cantidad actualizada exitosamente:", data);
            // Puedes realizar otras acciones necesarias después de la actualización
        },
        error: function (error) {
            console.error("Error al actualizar la cantidad:", error);
            // Muestra el mensaje de error en el elemento HTML
            $('#titulo').html('Error');
            $('#mensaje').html(error.responseJSON.mensaje);
            mostrarMensaje();

        }
    });
}

/*-------------------------------------------------------- */
/*---------     Generar Pedido(Comprobante)   ------------ */
/*-------------------------------------------------------* */

function mostrarCarritoDetalles() {
    verificarToken();
    var carrito_api = 'https://mbytesolucionesapi.onrender.com/api/carrito/detalle';

    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: carrito_api,
        headers: {
            'Authorization': 'Bearer ' + token,
        },
        success: function (data) {
            // Llenar los campos del formulario en el modal
            var orderProductsHtml = '';

            // Iterar sobre los productos en el carrito
            for (var i = 0; i < data.Carrito.items.length; i++) {
                var producto = data.Carrito.items[i].id_producto;
                var precioUn = data.Carrito.items[i].precio;
                var productTotal = data.Carrito.items[i].total;

                orderProductsHtml += '<tr>' +
                    '<td>' + data.Carrito.items[i].cantidad + 'x </td>' +
                    '<td>' + producto.nombre + '</td>' +
                    '<td>' + precioUn + '</td>' +
                    '<td>' + productTotal + '$</td>' +
                    '</tr>';
            }

            // Agregar las filas de la tabla al cuerpo de la tabla
            $("#orderProductsTableBody").html(orderProductsHtml);

            // Puedes llenar otros detalles como el total, dirección, etc.
            $("#modal-body .order-total").text(data.Carrito.subtotal + '$');


        },
        error: function (error) {
            console.error("Error al obtener datos de la API:", error);
        }
    });
}
