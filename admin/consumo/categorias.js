
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
/*-------------    Mostrar Categorías     ---------------- */
/*-------------------------------------------------------* */ 
    $(document).ready(function () {
        var consumo_api = 'https://mbytesolucionesapi.onrender.com/api/categorias';
        $.ajax({
            type: 'GET',
            dataType: 'json',
            url: consumo_api,
            success: function (data) {
                if (data.categorias && data.categorias.length > 0) {
                    mostrarCategorias(data.categorias);
                } else {
                    console.error("La respuesta de la API no contiene categorias válidos.");
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
		
        function mostrarCategorias(categorias) {
            var container = $("#tabla_categorias tbody");

            for (var i = 0; i < categorias.length; i++) {
                var categoria = categorias[i];
                var categoriaHtml = '<tr>' +
                    '<td>' + (i + 1) + '</td>' +
                    '<td>' + formatearFecha(categoria.createdAt) + '</td>' +
                    '<td>' + categoria.nombre + '</td>' +
					'<td><button onclick="mostrarDatosCategoria(\'' + categoria._id + '\')" class="btn btn-sm btn-primary" type="button" data-toggle="modal" data-target="#dataModal"><span class="fe fe-file-text fe-16"></span></button></td>' +
					'<td><button onclick="abrirModalActualizar(\'' + categoria._id + '\')" class="btn btn-sm btn-warning" type="button" data-toggle="modal"  ><span class="fe fe-edit fe-16"></span></button></td>' +
                    '<td><button onclick="abrirModalEliminar(\'' + categoria._id + '\')"class="btn btn-sm btn-danger" type="button" data-toggle="modal" ><span class="fe fe-trash-2 fe-16"></span></button></td>' +
                    '</tr>';
                container.append(categoriaHtml);
            }
        }
    });	

		
	// Detaller categoría 
	function mostrarDatosCategoria(categoriaId) {
		var detalle_api = 'https://mbytesolucionesapi.onrender.com/api/categoria/detalle/' + categoriaId;

		verificarToken();
		
		$.ajax({
			type: 'GET',
			dataType: 'json',
			url: detalle_api,
			headers: {
				'Authorization': 'Bearer ' + token, // Incluir el token en el encabezado de autorización
			},			
			success: function (data) {	
				// Asegúrate de que las claves coincidan con la respuesta de la API
				var categoria = data.categoria; // Acceder a la clave "categoria"						
				var modalContent = 
					'<p><strong>Nombre:</strong> ' + categoria.nombre + '</p>' +
					'<p><strong>Descripción:</strong> ' + categoria.descripcion + '</p>';

				// Colocar el contenido en el modal de datos del categoria
				$("#dataModalBody").html(modalContent);

				// Abrir el modal
				$("#dataModal").modal('show');
			},
			error: function (error) {
				console.error("Error al obtener detalles del categoria:", error);
			}
		});
		
		
		
	}

	//Crear Categoria	
function crearCategoria() {
    // Obtener los valores del formulario
    var nombre = document.getElementById('nombreCategoria').value;
    var descripcion = document.getElementById('descripcion').value;

	//verificarToken();

    // Objeto que contiene los datos a enviar
    var datosParaEnviar = {
        nombre: nombre,
        descripcion: descripcion,
    };

    // URL de la API para crear una nueva categoría
    var crear_api = 'https://mbytesolucionesapi.onrender.com/api/categoria/nueva';

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
            console.log("Categoría creada exitosamente:", data);

            // Opcional: Puedes cerrar el modal después de crear la categoría
            $('#varyModal').modal('hide');
            $('#mensaje').html('Categoría creada exitosamente!');
            // Abrir el modal de éxito
            $('#successModal').modal('show');

            // Retraso de 1 segundo antes de recargar la página
            setTimeout(function () {
                window.location.reload();
            }, 2000);
        },
        error: function (error) {
            // Manejar los errores
            console.error("Error al crear categoría:", error);
        }
    });
}

	
	//Abrir Moda Actualizar Categoría
	var categoriaActualizar; // Declara una variable global para almacenar la información del producto

	function abrirModalActualizar(categoriaId) {
		var detalle_api = 'https://mbytesolucionesapi.onrender.com/api/categoria/detalle/' + categoriaId;

		verificarToken();
		$.ajax({
			type: 'GET',
			dataType: 'json',
			url: detalle_api,
			headers: {
				'Authorization': 'Bearer ' + token, // Incluir el token en el encabezado de autorización
			},			
			success: function (data) {
				categoriaActualizar = data.categoria; // Almacena la información de la categoria en la variable global

				// Llenar los campos del formulario en el updateModal
				$("#nombreCategoriaActualizar").val(categoriaActualizar.nombre);
				$("#descripcionActualizar").val(categoriaActualizar.descripcion);

				// Abre el modal de actualización
				$('#updateModal').modal('show');
			},
			error: function (error) {
				console.error("Error al obtener detalles del categoria:", error);
			}
		});
	}
	
	// Función para actualizar el categoria
	function actualizarCategoria() {
		// Verifica si el categoriaActualizar tiene información
		if (categoriaActualizar) {
			// Obtener los valores actualizados del formulario de actualización
			var nombre = document.getElementById('nombreCategoriaActualizar').value;
			var descripcion = document.getElementById('descripcionActualizar').value;

			verificarToken();
			// Objeto que contiene los datos a enviar
			var datosParaEnviar = {
				nombre: nombre,
				descripcion: descripcion,
			};

			// URL de la API para editar el categoria actual
			var editar_api = 'https://mbytesolucionesapi.onrender.com/api/categoria/actualizar/' + categoriaActualizar._id;

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
					console.log("Categoría actualizado exitosamente:", data);
					$('#updateModal').modal('hide');  // Cerrar el modal de actualización
					$('#mensaje').html('Categoría actualizado exitosamente!');				
					$('#successModal').modal('show');  // Mostrar el modal de éxito
					
				   // Retraso de 1 segundo antes de recargar la página
					setTimeout(function () {
						window.location.reload();
					}, 2000);
	
				},
				error: function (error) {
					console.error("Error al actualizar la categoria:", error);
				}
			});
		} else {
			console.error("No se encontró información de la categoria para actualizar.");
		}
	}
	
	//Abrir Modal para Eliminar
	var categoriaEliminar;  // Variable global para almacenar la información de la categoria a eliminar

	function abrirModalEliminar(categoriaId) {
		// Obtener los detalles de la categoria antes de eliminar
		var detalle_api = 'https://mbytesolucionesapi.onrender.com/api/categoria/detalle/' + categoriaId;
		verificarToken();

		$.ajax({
			type: 'GET',
			dataType: 'json',
			headers: {
				'Authorization': 'Bearer ' + token, // Incluir el token en el encabezado de autorización
			},				
			url: detalle_api,
			success: function (data) {
				categoriaEliminar = data.categoria;  // Almacenar la información del producto a eliminar
				$('#trashModal').modal('show');  // Mostrar el modal de eliminación
			},
			error: function (error) {
				console.error("Error al eliminar la categoria:", error);
			}
		});
	}	
	
// Función para eliminar LA categoria
function eliminarCategoria() {
    // Verificar si hay información de la categoria a eliminar
    if (categoriaEliminar) {
        // URL de la API para eliminar la categoria
        var eliminar_api = 'https://mbytesolucionesapi.onrender.com/api/categoria/eliminar/' + categoriaEliminar._id;
        verificarToken();

        // Realizar la solicitud DELETE al servidor
        $.ajax({
            type: 'DELETE',
            url: eliminar_api,
            headers: {
                'Authorization': 'Bearer ' + token, // Incluir el token en el encabezado de autorización
            },
            success: function (data) {
                console.log("Categoría eliminado exitosamente:", data);
                $('#trashModal').modal('hide');  // Cerrar el modal de eliminación
                $('#mensaje').html('Categoría eliminado exitosamente!');
                $('#successModal').modal('show');  // Mostrar el modal de éxito

                // Retraso de 1 segundo antes de recargar la página
                setTimeout(function () {
                    window.location.reload();
                }, 2000);
            },
            error: function (error) {
                console.error("Error al eliminar la Categoría:", error);

                // Verificar si el error contiene un mensaje específico sobre productos asociados
                if (error.responseJSON && error.responseJSON.msg) {
                    // Mostrar el mensaje específico sobre productos asociados
                    var mensaje = error.responseJSON.msg;
                    mostrarMensajeError(mensaje);
                } else {
                    // Mostrar el mensaje de error genérico
                    mostrarMensajeError();
                }
            }
        });
    } else {
        console.error("No se encontró información de la Categoría para eliminar.");
    }
}

// Función para mostrar mensaje de error
function mostrarMensajeError(mensaje) {
    var mensajeElemento = document.getElementById('mensajeAlerta');
    mensajeElemento.style.display = 'block';
    $('#mensajeAlerta').html(mensaje || 'Lo sentimos, ha ocurrido un error.');

    // Ocultar el mensaje después de 5 segundos (5000 milisegundos)
    setTimeout(function () {
        mensajeElemento.style.display = 'none';
    }, 5000);
}
