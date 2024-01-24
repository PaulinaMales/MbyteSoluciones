
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
/*-------------   Mostrar categorías a escoger  ---------- */
/*-------------------------------------------------------* */ 
var categorias_api = 'https://mbytesolucionesapi.onrender.com/api/categorias';

$.ajax({
    type: 'GET',
    dataType: 'json',
    url: categorias_api,
    success: function (data) {
        if (data.categorias && data.categorias.length > 0) {
            // Llenar el dropdown de categorías
            mostrarCategorias(data.categorias);
        } else {
            console.error("La respuesta de la API no contiene categorías válidas.");
        }
    },
    error: function (error) {
        console.error("Error al obtener datos de la API:", error);
    }
});

function mostrarCategorias(categorias) {
    var dropdown = $("#categoria");
    var dropdownActualizar = $("#categoriaActualizar");
    var dropdownBusqueda = $("#categoriaBusqueda");

    dropdown.empty(); // Limpiar opciones existentes

    // Agregar opción por defecto
    dropdown.append($('<option>').text('-- Categoría --').val(''));
    dropdownActualizar.append($('<option>').text('-- Categoría --').val(''));
    dropdownBusqueda.append($('<option>').text('-- Todos --').val(''));


    // Agregar categorías al dropdown
    categorias.forEach(function (categoria) {
        dropdown.append($('<option>').text(categoria.nombre).val(categoria._id));
        dropdownActualizar.append($('<option>').text(categoria.nombre).val(categoria._id));
        dropdownBusqueda.append($('<option>').text(categoria.nombre).val(categoria._id));

    });
}	    

/*-------------------------------------------------------- */
/*-------------    Consumir Productos     ---------------- */
/*-------------------------------------------------------* */ 
    $(document).ready(function () {
      
        var consumo_api = 'https://mbytesolucionesapi.onrender.com/api/productos';

        $.ajax({
            type: 'GET',
            dataType: 'json',
            url: consumo_api,
            success: function (data) {
                if (data.productos && data.productos.length > 0) {
                    mostrarProductos(data.productos);
                } else {
                    console.error("La respuesta de la API no contiene productos válidos.");
                }
            },
            error: function (error) {
                console.error("Error al obtener datos de la API:", error);
            }
        });
	
    });

    function formatearFecha(fecha) {
        // Verificar si fecha no es undefined o null
        if (fecha) {
            // Formatear la fecha a YYYY-MM-DD
            return fecha.substring(0, 10);
        } else {
            return "Fecha no disponible";
        }
    }
            
/*-------------------------------------------------------- */
/*-------------    Paginación Productos   ---------------- */
/*-------------------------------------------------------* */ 
// Variable para almacenar los productos y la configuración de paginación
var productos = [];
var productosPorPagina = 10; // Ajusta según tus necesidades
var paginaActual = 1;

function mostrarControlesDePaginacion() {
    var totalPaginas = Math.ceil(productos.length / productosPorPagina);
  
    // Limpia los controles de paginación
    $("#pagination").empty();
  
    // Agrega botones de paginación
    for (var i = 1; i <= totalPaginas; i++) {
      var activeClass = i === paginaActual ? "active" : "";
      var buttonHtml = '<li class="page-item ' + activeClass + '"><a class="page-link" onclick="cambiarPagina(' + i + ')">' + i + '</a></li>';
      $("#pagination").append(buttonHtml);
    }
  }

  function cambiarPagina(pagina) {
    // Actualiza la página actual y muestra los productos en esa página
    paginaActual = pagina;
    mostrarProductosEnPagina(pagina);
  }

  function cambiarPagina(pagina) {
    // Actualiza la página actual y muestra los productos en esa página
    paginaActual = pagina;
    mostrarProductosEnPagina(pagina);
    mostrarControlesDePaginacion(); // Agrega esta línea
}



/*-------------------------------------------------------- */
/*-------------    Mostrar Productos     ---------------- */
/*-------------------------------------------------------* */ 
function mostrarProductos(productos) {
    // Guarda la lista completa de productos
    window.productos = productos;
    mostrarProductosEnPagina(1);
    mostrarControlesDePaginacion(); 
}

function mostrarProductosEnPagina(pagina) {
    // Calcula el índice de inicio y fin para la página actual
    var inicio = (pagina - 1) * productosPorPagina;
    var fin = inicio + productosPorPagina;

    // Obtiene la lista de productos para la página actual
    var productosEnPagina = productos.slice(inicio, fin);

    // Limpia la tabla antes de agregar productos
    $("#tabla_productos tbody").empty();

    // Muestra los productos en la tabla
    for (var i = 0; i < productosEnPagina.length; i++) {
        var producto = productosEnPagina[i];

        var productoHtml = '<tr>' +
            '<td>' + (inicio + i + 1) + '</td>' +
            '<td>' + formatearFecha(producto.fecha_ingreso) + '</td>' +
            '<td>' + producto.nombre + '</td>' +
            '<td>' + producto.cantidad + '</td>' +
            '<td>' + producto.precio + '</td>' +
            '<td>' + producto.precio_venta + '</td>' +
            '<td><button onclick="mostrarDatosProducto(\'' + producto._id + '\')" class="btn btn-sm btn-primary" type="button" data-toggle="modal" data-target="#dataModal"><span class="fe fe-file-text fe-16"></span></button></td>' +
            '<td><button onclick="abrirModalActualizar(\'' + producto._id + '\')" class="btn btn-sm btn-warning" type="button" data-toggle="modal"  ><span class="fe fe-edit fe-16"></span></button></td>' +
            '<td><button onclick="abrirModalEliminar(\'' + producto._id + '\')"class="btn btn-sm btn-danger" type="button" data-toggle="modal" ><span class="fe fe-trash-2 fe-16"></span></button></td>' +
            '</tr>';

        $("#tabla_productos tbody").append(productoHtml);
    }
}

/*-------------------------------------------------------- */
/*-------------  Mostrar Datos Productos  ---------------- */
/*-------------------------------------------------------* */ 
	function mostrarDatosProducto(productoId) {
		var detalle_api = 'https://mbytesolucionesapi.onrender.com/api/producto/detalle/' + productoId;
	
		verificarToken();
		$.ajax({
			type: 'GET',
			dataType: 'json',
			url: detalle_api,
			headers: {
				'Authorization': 'Bearer ' + token,
			},
			success: function (data) {
				var producto = data.producto;
	
				// Accedemos a la clave imagen para mostar la imagen del producto
				var imagenUrl = producto.imagen && producto.imagen.secure_url ? producto.imagen.secure_url : '';
	
				var modalContent = '<h5>' + producto.nombre + '</h5>' +
					'<p><strong>Descripción:</strong> ' + producto.descripcion + '</p>' +
					'<p><strong>Precio:</strong> ' + producto.precio + '</p>' +
					'<p><strong>Precio Venta:</strong> ' + producto.precio_venta + '</p>' +
					'<p><strong>Cantidad:</strong> ' + producto.cantidad + '</p>' +
					'<p><strong>Categoría:</strong> ' + producto.categoria.nombre + '</p>' +
                    '<p><strong>Marca:</strong> ' + producto.marca + '</p>' +
					'<img src="' + imagenUrl + '" alt="Imagen del producto" class="img-fluid">';
	
				$("#dataModalBody").html(modalContent);
	
				$("#dataModal").modal('show');
			},
			error: function (error) {
				console.error("Error al obtener detalles del producto:", error);
			}
		});
	}
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

	function mostrarMensajeActualizar() {
		var mensaje = document.getElementById('mensajeAlertaActualizar');
		mensaje.style.display = 'block';
	
		// Ocultar el mensaje después de 5 segundos (5000 milisegundos)
		setTimeout(function () {
			mensaje.style.display = 'none';
		}, 4000);
	}
	function mostrarMensajeBusqueda() {
		var mensaje = document.getElementById('mensajeBusqueda');
		mensaje.style.display = 'block';
	
		// Ocultar el mensaje después de 5 segundos (5000 milisegundos)
		setTimeout(function () {
			mensaje.style.display = 'none';
		}, 4000);
	}
/*-------------------------------------------------------- */
/*-------------  Crear nuevo producto --- ---------------- */
/*-------------------------------------------------------* */     
	//USAR el objeto FormData para manejar la carga de archivos.Al usar FORMDATA, estarás enviando el archivo correctamente junto con otros datos del formulario al servidor.
	function crearProducto() {
		// Crea un nuevo objeto FormData
		var formData = new FormData();
	  
		// Añade los datos del formulario al objeto FormData
		formData.append('categoria', document.getElementById('categoria').value);
		formData.append('marca', document.getElementById('marca').value);
		formData.append('nombre', document.getElementById('nombreProducto').value);
		formData.append('descripcion', document.getElementById('descripcion').value);
		formData.append('precio', document.getElementById('precio').value);
		formData.append('precio_venta', document.getElementById('precioVenta').value);
		formData.append('cantidad', document.getElementById('unidades').value);
	  
		// Añade el archivo al objeto FormData
		var imagenInput = document.getElementById('imagenProducto');
		formData.append('imagen', imagenInput.files[0]);
	  
		// URL de la API para crear un nuevo producto
		var crear_api = 'https://mbytesolucionesapi.onrender.com/api/producto/nuevo';
	  
		verificarToken();
	  
		// Realizar la solicitud POST al servidor
		$.ajax({
		  type: 'POST',
		  contentType: false,
		  processData: false, // Importante: deshabilita el procesamiento automático de datos
		  url: crear_api,
		  data: formData,
		  headers: {
			'Authorization': 'Bearer ' + token,
		  },
		  success: function (data) {
			// Manejar la respuesta exitosa del servidor
			console.log("Producto creado exitosamente:", data);
	  
			// Opcional: Puedes cerrar el modal después de crear el producto
			$('#varyModal').modal('hide');
			$('#mensaje').html('Producto creado exitosamente!');
			// Abrir el modal de éxito
			$('#successModal').modal('show');
	  
			// Retraso de 1 segundo antes de recargar la página
			setTimeout(function () {
			  window.location.reload();
			}, 2000);
		  },
		  error: function (error) {
			// Manejar los errores
			console.error("Error al crear el producto:", error);
			// Modificar la clase de la alerta para cambiar el estilo
			$('#mensajeAlerta').removeClass('alert-info').addClass('alert-danger');
			$('#mensajeAlerta').html('Llenar todos lo campos por favor.');
			mostrarMensaje();  
		  }
		});
	  }
	  
/*-------------------------------------------------------- */
/*----------------- Modal Actualizar Prod ---------------- */
/*-------------------------------------------------------* */

	var productoActualizar; // Declara una variable global para almacenar la información del producto

    function abrirModalActualizar(productoId) {
        var detalle_api = 'https://mbytesolucionesapi.onrender.com/api/producto/detalle/' + productoId;
        verificarToken();
        $.ajax({
            type: 'GET',
            dataType: 'json',
            url: detalle_api,
            headers: {
                'Authorization': 'Bearer ' + token, // Incluir el token en el encabezado de autorización
            },				
            success: function (data) {
                productoActualizar = data.producto; // Almacena la información del producto en la variable global
    
                // Llenar los campos del formulario en el updateModal
                // Acceder a la propiedad categoria del productoActualizar y luego a su propiedad nombre
                $("#categoriaActualizar").val(productoActualizar.categoria._id);
                $("#nombreProductoActualizar").val(productoActualizar.nombre);
                $("#descripcionActualizar").val(productoActualizar.descripcion);
                $("#precioActualizar").val(productoActualizar.precio);
                $("#precioVentaActualizar").val(productoActualizar.precio_venta);
                $("#unidadesActualizar").val(productoActualizar.cantidad);
				$("#marcaActualizar").val(productoActualizar.marca);
    
                // Abre el modal de actualización
                $('#updateModal').modal('show');
            },
            error: function (error) {
                console.error("Error al obtener detalles del producto:", error);
            }
        });
    }
    


/*-------------------------------------------------------- */
/*-------------  Actualizar Producto --- ---------------- */
/*-------------------------------------------------------* */
function actualizarProducto() {
    // Verifica si el productoActualizar tiene información
    if (productoActualizar) {
        // Obtener los valores actualizados del formulario de actualización
        var categoria = document.getElementById('categoriaActualizar').value;
        var nombre = document.getElementById('nombreProductoActualizar').value;
        var descripcion = document.getElementById('descripcionActualizar').value;
        var precio = document.getElementById('precioActualizar').value;
        var precioVenta = document.getElementById('precioVentaActualizar').value;
        var marca = document.getElementById('marcaActualizar').value;
        var cantidad = document.getElementById('unidadesActualizar').value;

        // Crear un objeto FormData para enviar datos y archivos binarios
        var formData = new FormData();
        formData.append('categoria', categoria);
        formData.append('marca', marca);
        formData.append('nombre', nombre);
        formData.append('descripcion', descripcion);
        formData.append('precio', precio);
        formData.append('precio_venta', precioVenta);
        formData.append('cantidad', cantidad);

        // Obtener el archivo de imagen
        var imagenProducto = document.getElementById('imagenProductoActualizar').files[0];
        if (imagenProducto) {
            formData.append('imagen', imagenProducto);
        }

        // URL de la API para editar el producto actual
        var editar_api = 'https://mbytesolucionesapi.onrender.com/api/producto/actualizar/' + productoActualizar._id;

        verificarToken();

        // Realizar la solicitud PUT al servidor
        $.ajax({
            type: 'PUT',
            url: editar_api,
            data: formData,
            contentType: false, // No establecer tipo de contenido
            processData: false, // No procesar los datos
            headers: {
                'Authorization': 'Bearer ' + token,
            },
            success: function (data) {
                console.log("Producto actualizado exitosamente:", data);
                $('#updateModal').modal('hide');
                $('#mensaje').html('Producto actualizado exitosamente!');
                $('#successModal').modal('show');

                setTimeout(function () {
                    window.location.reload();
                }, 2000);
            },
            error: function (error) {
                console.error("Error al actualizar el producto.", error);
				// Modificar la clase de la alerta para cambiar el estilo
				$('#mensajeAlertaActualizar').removeClass('alert-info').addClass('alert-danger');
				$('#mensajeAlertaActualizar').html('Llenar todos lo campos por favor.');
				mostrarMensajeActualizar();  				
            }
        });
    } else {
        console.error("No se encontró información del producto para actualizar.");
    }
}



	var productoEliminar;  // Variable global para almacenar la información del producto a eliminar

	function abrirModalEliminar(productoId) {
		// Obtener los detalles del producto antes de eliminar
		var detalle_api = 'https://mbytesolucionesapi.onrender.com/api/producto/detalle/' + productoId;
		verificarToken();
		$.ajax({
			type: 'GET',
			dataType: 'json',
			url: detalle_api,
			headers: {
				'Authorization': 'Bearer ' + token, // Incluir el token en el encabezado de autorización
			},				
			success: function (data) {
				productoEliminar = data.producto;  // Almacenar la información del producto a eliminar
				$('#trashModal').modal('show');  // Mostrar el modal de eliminación
			},
			error: function (error) {
				console.error("Error al obtener detalles del producto:", error);
			}
		});
	}

	// Función para eliminar el producto
	function eliminarProducto() {
		// Verificar si hay información del producto a eliminar
		if (productoEliminar) {
			// URL de la API para eliminar el producto
			var eliminar_api = 'https://mbytesolucionesapi.onrender.com/api/producto/eliminar/' + productoEliminar._id;
			verificarToken();
			// Realizar la solicitud DELETE al servidor
			$.ajax({
				type: 'DELETE',
				url: eliminar_api,
				headers: {
					'Authorization': 'Bearer ' + token, // Incluir el token en el encabezado de autorización
				},					
				success: function (data) {
					console.log("Producto eliminado exitosamente:", data);
					$('#trashModal').modal('hide');  // Cerrar el modal de eliminación
					$('#mensaje').html('Producto eliminado exitosamente!');								
					$('#successModal').modal('show');  // Mostrar el modal de éxito
					
				   // Retraso de 1 segundo antes de recargar la página
					setTimeout(function () {
						window.location.reload();
					}, 2000);
				},
				error: function (error) {
					console.error("Error al eliminar el producto:", error);
				}
			});
		} else {
			console.error("No se encontró información del producto para eliminar.");
		}
	}


// Función filtra la categoría
function filtrarPorCategoria() {
    var categoriaSeleccionada = $("#categoriaBusqueda").val();
    //console.log("Categoría seleccionada:", categoriaSeleccionada);

    var consumo_api = 'https://mbytesolucionesapi.onrender.com/api/productos';

    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: consumo_api,
        success: function (data) {
            if (data.productos && data.productos.length > 0) {
                // Lógica de filtrado aquí
                if (categoriaSeleccionada) {
                    // Filtrar productos por categoría
                    var productosFiltrados = data.productos.filter(function (producto) {
                        // Asegúrate de que la propiedad 'categoria' del producto sea válida
                        return producto.categoria && producto.categoria._id === categoriaSeleccionada;
                    });

                    // Mostrar los productos filtrados en la tabla
                    mostrarProductos(productosFiltrados);
                } else {
                    // Si no hay categoría seleccionada, mostrar todos los productos
                    mostrarProductos(data.productos);
                }
            } else {
                console.error("La respuesta de la API no contiene productos válidos.");
				console.log("no hay");
				$('#mensajeBusqueda').html('No existen datos que mostrar.');				
				mostrarMensajeBusqueda();

            }
        },
        error: function (error) {
            console.error("Error al obtener datos de la API:", error);
        }
    });
}




	
