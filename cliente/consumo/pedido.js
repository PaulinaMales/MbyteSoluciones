  
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
/*-------------------    Crear Pedido   -------------------*/
/*-------------------------------------------------------- */
function crearPedido() {
    // Obtener los valores del formulario
    //var nombre = document.getElementById('nombreProducto').value;
    var id = $(".productoId").val(); 
    var cantidad = $("#cantidad_" + id).val(); 
    var precio = $(".precio").text(); 
    var totalPrecio = $(".totalPrecio").text(); 
    var observaciones = $("#observacion").val(); 

    // Obtener los valores del input radio
    var metodo;
    if ($('#transferencia').is(':checked')) {
        metodo = 'Transferencia Bancaria';
    } else if ($('#efectivo').is(':checked')) {
        metodo = 'Pago en Efectivo';
    }

    // Obtener el valor del checkbox
    var envioDomicilio = $('#direccionCheckbox').is(':checked') ? 1 : 0;

    verificarToken();

    // Objeto que contiene los datos a enviar
    var datosParaEnviar = {
        id_producto: id,
        cantidad: cantidad,
        precio: precio,
        total: totalPrecio,   
        observaciones:observaciones,
        forma_pago: metodo,
        domicilio:envioDomicilio,
        
    };

    // URL de la API para crear una nueva categoría
    var crear_api = 'https://mbytesolucionesapi.onrender.com/api/crear-pedido';

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
            console.log("Pedido creado exitosamente.", data);
            eliminarCarrito() 
            // Opcional: Puedes cerrar el modal después de crear la categoría
            $('#modalAviso').modal('hide');
            $('#checkModal').modal('hide');
            $('#titulo').html('Exito!');
            $('#mensaje').html("Pedido creada exitosamente.");
            mostrarMensaje();

            // Retraso de 1 segundo antes de recargar la página
            setTimeout(function () {
                window.location.reload();
            }, 3000);
        },
        error: function (error) {
            // Manejar los errores
            console.error("Error al crear pedido:", error);
             // Muestra el mensaje de error en el elemento HTML
             $('#modalAviso').modal('hide');
            $('#checkModal').modal('hide');            
             $('#titulo').html('Error');
             $('#mensaje').html(error.responseJSON.mensaje);
             mostrarMensaje();      
            // Retraso de 1 segundo antes de recargar la página
           setTimeout(function () {
                window.location.reload();
            }, 2000);      
        }
    });
}

/*-------------------------------------------------------- */
/*---------------    Eliminar carrito   -------------------*/
/*-------------------------------------------------------- */
// Función para eliminar LA categoria
function eliminarCarrito() {
    // Verificar si hay información de la categoria a eliminar

        // URL de la API para eliminar la categoria
        var eliminar_api = 'https://mbytesolucionesapi.onrender.com/api/carrito/eliminar';
        verificarToken();

        // Realizar la solicitud DELETE al servidor
        $.ajax({
            type: 'DELETE',
            url: eliminar_api,
            headers: {
                'Authorization': 'Bearer ' + token, // Incluir el token en el encabezado de autorización
            },
            success: function (data) {
                console.log("Carrito eliminado exitosamente:", data);

                // Retraso de 1 segundo antes de recargar la página
                /*setTimeout(function () {
                    window.location.reload();
                }, 2000);*/
            },
            error: function (error) {
                console.error("Error al eliminar el carrito", error);
            }
        });

}

/*-------------------------------------------------------- */
/*---------------    Mostrar pedidos  - -------------------*/
/*-------------------------------------------------------- */
$(document).ready(function () {

    var pedidos_api = 'https://mbytesolucionesapi.onrender.com/api/historial-pedidos';
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
                mostrarPedidos(data.pedidosBD);
            } else {
                console.error("La respuesta de la API no contiene pedidos válidos.");
            }
        },
        error: function (error) {
            console.error("Error al obtener datos de la API:", error);
        }
    });

    function formatearFecha(fecha) {
        // Formatear la fecha a YYYY-MM-DD
        return fecha.substring(0, 10);
    }

    function mostrarPedidos(pedidos) {
        var container = $("#tabla_pedidos tbody");

        for (var i = 0; i < pedidos.length; i++) {
            var pedido = pedidos[i];

            // Agrega o quita clases según el estado
            var estadoClass = '';
            switch (pedido.estado) {
                case 'Anulado':
                    estadoClass = 'label-danger';
                    break;
                case 'Finalizado':
                    estadoClass = 'label-success';
                    break;
                case 'Pendiente':
                    estadoClass = 'label-warning';
                    break;
                // Puedes agregar más casos según tus necesidades
            }
            var pedidoHtml = '<tr>' +
                '<td>' + (i + 1) + '</td>' +
                '<td><span class="label ' + estadoClass + '" id="pedido">'+pedido.estado+'</span></td>' +
                '<td>' + formatearFecha(pedido.fecha) + '</td>' +
                '<td><button type="button" class="btn btn-primary" data-toggle="modal" data-target="#checkModal" onclick="mostrarComprobante(\'' + pedido._id + '\')"><i class="fa fa-shopping-basket"></i></button></td>' +
                '</tr>';

            container.append(pedidoHtml);
        }
    }

});	


/*-------------------------------------------------------- */
/*---------     Generar Pedido(Comprobante)   ------------ */
/*-------------------------------------------------------* */
function mostrarComprobante(pedidoId) {
    verificarToken();
    var pedido_api = 'https://mbytesolucionesapi.onrender.com/api/visualizar-pedido/'+pedidoId;
    //$("#detallePedidoBody").empty();
    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: pedido_api,
        headers: {
            'Authorization': 'Bearer ' + token,
        },
        success: function (data) {
            // Llenar los campos del formulario en el modal
            var orderPedidosHtml = '';
            // Iterar sobre los productos en el carrito
            for (var i = 0; i < data.pedido.items.length; i++) {
                var producto = data.pedido.items[i].id_producto;
                var precioUn = data.pedido.items[i].precio;
                var precioTotal = data.pedido.items[i].total;
                orderPedidosHtml += '<tr>' +
                    '<td>' + data.pedido.items[i].cantidad + 'x </td>' +
                    '<td>' + producto.nombre + '</td>' +
                    '<td>' + precioUn + '</td>' +
                    '<td>' + precioTotal + '$</td>' +
                    '</tr>';
            }
            $("#observacion").text(data.pedido.observaciones );

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
            // Agregar las filas de la tabla al cuerpo de la tabla
            $("#orderPedidoTable").html(orderPedidosHtml);
              // Puedes llenar otros detalles como el total, dirección, etc.
            $("#modal-body .order-total").text(data.pedido.total + '$');

        },
        error: function (error) {
            console.error("Error al obtener datos de la API:", error);
        }
    });
}

/*-------------------------------------------------------- */
/*------------     Generar Comprobante  ----- ------------ */
/*-------------------------------------------------------* */
document.addEventListener('DOMContentLoaded', function() {
    // Asocia la función generarPDF al evento click del botón
    document.getElementById('descargarPDF').addEventListener('click', function() {
        verificarToken();
        obtenerDatosClienteYGenerarPDF();
    });
});

function obtenerDatosClienteYGenerarPDF() {
    var cliente_api = 'https://mbytesolucionesapi.onrender.com/api/cliente/perfil';
    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: cliente_api,
        headers: {
            'Authorization': 'Bearer ' + token,
        },
        success: function (data) {
            var cliente = data.clienteBD; 
            generarPDF(cliente);
        },
        error: function (error) {
            console.error("Error al obtener datos de la API:", error);
        }
    });
}

function generarPDF(cliente) {
    // Crea una instancia de jsPDF
    var pdf = new jsPDF();

    // Ajusta la fuente y el estilo
    pdf.setFont("helvetica", "bold");

    // Agrega el título centrado
    pdf.setFontSize(16);
    pdf.text('MBYTE SOLUCIONES TECNOLÓGICAS', pdf.internal.pageSize.width / 2, 15, 'center');

    // Agrega el teléfono y dirección de la empresa
    pdf.setFontSize(12);
    pdf.text('Teléfono: +593 97 894 8486', pdf.internal.pageSize.width / 2, 25, 'center');
    pdf.text('Dirección: Quito, Rosa Campuzano y Camilo Guachamín (Norte de Quito)', pdf.internal.pageSize.width / 2, 35, 'center');

    // Agrega el logo al PDF
    var logo = new Image();
    logo.src = '../img/logo_mbyte.png';
    var logoWidth = 25;  // Ancho del logo
    var logoHeight = 25; // Altura del logo
    var centerX = (pdf.internal.pageSize.width - logoWidth) / 2;
    pdf.addImage(logo, 'PNG', centerX, 45, logoWidth, logoHeight);

    // Agrega datos del cliente
    pdf.setFontSize(10);
    pdf.text('Nombre: ' + cliente.nombre + ' ' + cliente.apellido, 15, 75);
    pdf.text('Dirección: ' + cliente.direccion, 15, 85);
    pdf.text('------------------------------------------------------------------ Detalles de Compra ------------------------------------------------------------------', 15, 95);

    // Obtiene el contenido de la tabla
    var content = document.getElementById('pdfContent');

    // Ajusta el ancho y la altura de la celda
    var cellWidth = pdf.internal.pageSize.width - 40;
    var cellHeight = 10;

    // Ajusta el tamaño de la letra de la tabla
    pdf.setFontSize(10);

    // Dividir las líneas de contenido en un array
    var lines = pdf.splitTextToSize(content.innerText, cellWidth);

    // Configurar márgenes y posición inicial
    var yPosition = 115;
    var pageHeight = pdf.internal.pageSize.height;

    // Dibuja las líneas de la tabla
    pdf.rect(20, yPosition - 5, cellWidth, lines.length * cellHeight + 5);
    for (var i = 1; i < lines.length; i++) {
        pdf.line(20, yPosition + i * cellHeight, 20 + cellWidth, yPosition + i * cellHeight);
    }

    // Líneas verticales
    pdf.line(20, yPosition, 20, yPosition + lines.length * cellHeight);
    pdf.line(20 + cellWidth, yPosition, 20 + cellWidth, yPosition + lines.length * cellHeight);

    // Iterar sobre las líneas y agregarlas como celdas
    for (var i = 0; i < lines.length; i++) {
        if (yPosition > pageHeight - 20) {
            pdf.addPage();
            yPosition = 20; // Reiniciar posición en la nueva página
        }
        pdf.text(lines[i], 25, yPosition + 5);
        yPosition += cellHeight;
    }

    // Agrega el total de la compra
    var total = obtenerTotalCompra();
    pdf.text('TOTAL: ' + total + ' $', 15, yPosition + 10);

    // Descarga el PDF
    pdf.save('comprobante_pedido_Mbyte.pdf');
}



function obtenerTotalCompra() {
    return document.querySelector("#modal-body .order-total").innerText.replace('$', '');
}
