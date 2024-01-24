  
    // Variable global para almacenar información del carrito
    var carritoData = null;
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
                carritoData = data;
                mostrarCarrito(data);

            },
            error: function (error) {
                console.error("Error al obtener datos de la API:", error);
            }
        });
    });	
/*-------------------------------------------------------- */
/*-----------     Agregar Productos        --------------- */
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
           // mostrarCarrito(data);
            console.log("Producto agregado al carrito:", data);
            // Puedes mostrar un mensaje de éxito o realizar otras acciones necesarias
            $('#titulo').html('Exito!');
            $('#mensaje').html('Producto agregado al carrito!');
            $('#successModal').modal('show');  // Mostrar el modal de éxito  
                // Ocultar el mensaje después de 5 segundos (5000 milisegundos)
                setTimeout(function () {
                    $('#successModal').modal('hide');
                }, 1000);    
            actualizarNumeroCarrito(data);       
        },
        error: function (error) {
            console.error("Error al agregar el producto al carrito:", error);
            // Puedes mostrar un mensaje de error o realizar otras acciones necesarias
            $('#titulo').html('Error');
            $('#mensaje').html(error.responseJSON.mensaje);
            $('#successModal').modal('show');  // Mostrar el modal de éxito
        }
    });
}     

/*-------------------------------------------------------- */
/*---------------     Ver Carrito       ------------------ */
/*-------------------------------------------------------* */
function mostrarCarrito(carrito) {
    var container = $("#tabla_carrito_detalles tbody");
   
    // Limpiar la tabla antes de agregar nuevas filas
    container.empty();

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
                    '<input  type="number" id="cantidadCarrito"  style="width: none;" value="' + carrito.Carrito.items[i].cantidad + '"  max="'+producto.cantidad+'" onchange="cantidadCarrito(event, \'' + carrito.Carrito.items[i].id_producto._id + '\')">'+
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
        '<td id="subtotal" class="subtotal"><strong>' + carrito.Carrito.subtotal + ' $</strong></td>' +
        '<td></td>' +
        '</tr>';

    container.append(subtotalHtml);
    
    actualizarNumeroCarrito(carrito); 
}

function actualizarNumeroCarrito(carrito) {
    var numeroCarrito = 0;

    // Verifica si carrito.Carrito.items es una matriz antes de intentar recorrerla
    if (Array.isArray(carrito.Carrito.items)) {
        // Recorre los productos en items
        for (var i = 0; i < carrito.Carrito.items.length; i++) {
            numeroCarrito += carrito.Carrito.items[i].cantidad;
        }
    }
    // Actualiza el número en el indicador del carrito
    $("#numeroCarrito").text(numeroCarrito);
}

/*-------------------------------------------------------- */
/*---------     Actualizar Cantidad        --------------- */
/*-------------------------------------------------------* */
function cantidadCarrito(event, productoId) {
    const input = event.target;
    const valor = parseInt(input.value);
    const stockMaximo = parseInt(input.getAttribute("max"));

    if (isNaN(valor) || valor <= 0) {
        // Muestra un mensaje de error
        alert("La cantidad debe ser un número mayor a 0.");
        // Restaura el valor a 1
        input.value = 1;
    } else if (valor > stockMaximo) {
        // Muestra un mensaje de error
        alert(`La cantidad no puede ser mayor al Stock: ${stockMaximo}.`);
        // Restaura el valor al stock máximo
        input.value = stockMaximo;
    }

    // Actualiza la cantidad en el carrito
    actualizarCantidad(productoId, parseInt(input.value));

    // Recalcula los totales
    recalcularTotales();
}

function recalcularTotales() {
    // Obtén todas las filas de productos
    const filasProductos = $("#tabla_carrito_detalles tbody tr");

    // Inicializa los totales
    let subtotal = 0;

    // Recorre cada fila de producto
    filasProductos.each(function() {
        const cantidad = parseInt($(this).find(".input-number input").val());

        // Obtén el precio eliminando el símbolo de dólar y convirtiéndolo a número
        const precioStr = $(this).find(".precio").text().trim().replace('$', '');
        const precio = parseFloat(precioStr);

        // Verifica si la cantidad y el precio son válidos
        if (!isNaN(cantidad) && !isNaN(precio)) {
            const total = cantidad * precio;

            // Actualiza el total en la fila
            $(this).find(".totalPrecio").text(total.toFixed(2) + '$');

            // Agrega al subtotal
            subtotal += total;
        }
    });

    // Actualiza el subtotal en la fila correspondiente
    $("#subtotal").text(subtotal.toFixed(2) + '$');
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
            actualizarNumeroCarrito(data); 
            // Puedes realizar otras acciones necesarias después de la actualización
        },
        error: function (error) {
            console.error("Error al actualizar la cantidad:", error);
            // Muestra el mensaje de error en el elemento HTML
            $('#titulo').html('Error');
            $('#mensaje').html(error.responseJSON.mensaje);
            mostrarMensaje();
           // window.location.reload();
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
            // Verificar si la cantidad total en el carrito supera el stock disponible
            var productosQueExcedenStock = [];
            var stockDisponible = Infinity;

            for (var i = 0; i < data.Carrito.items.length; i++) {
                var producto = data.Carrito.items[i].id_producto;
                var cantidadEnCarrito = data.Carrito.items[i].cantidad;

                if (cantidadEnCarrito > producto.cantidad) {
                    productosQueExcedenStock.push({
                        nombre: producto.nombre,
                        cantidadEnCarrito: cantidadEnCarrito,
                        stockDisponible: producto.cantidad,
                    });
                }

                stockDisponible = Math.min(stockDisponible, producto.cantidad);
            }

            if (productosQueExcedenStock.length > 0) {
                // Mostrar mensaje de error con detalles sobre los productos que exceden el stock
                var mensajeError = 'La cantidad de los siguientes productos en el carrito excede el stock disponible:\n';

                    productosQueExcedenStock.forEach(function (producto) {
                    mensajeError += `<br>- ${producto.nombre}: <br>Cantidad en carrito: (${producto.cantidadEnCarrito}) | Stock disponible: (${producto.stockDisponible})<br> 
                    Por favor rectifique la cantidad para poder crear el comprobante`;
                });

                // Ocultar el modal existente si está abierto
                $('#checkModal').modal('hide');

                // Mostrar el modal de error
                $('#titulo').html('Error');
                $('#mensaje').html(mensajeError);
                $('#successModal').modal('show');

                // Eliminar el fondo oscuro y bloqueado al cerrar el modal de error
                $('#successModal').on('hidden.bs.modal', function () {
                    $('body').removeClass('modal-open');
                    $('.modal-backdrop').remove();
                    window.location.reload();
                });
            } else {
                
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

                // Abrir el modal solo si no hay errores
                $('#modalDetallesCompra').modal('show');
            }
        },
        error: function (error) {
            console.error("Error al obtener datos de la API:", error);
        }
    });
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
