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
            verificarInicioSesion();
            return;
        }	
    }
    verificarToken();
/*-------------------------------------------------------- */
/*-------------    Paginación Clientes   ---------------- */
/*-------------------------------------------------------* */  

// Variable para almacenar los clientes y la configuración de paginación
var clientes = [];
var clientesPorPagina = 10; // Ajusta según tus necesidades
var paginaClientesActual = 1;

function mostrarControlesDePaginacionClientes() {
    var totalPaginasClientes = Math.ceil(clientes.length / clientesPorPagina);
  
    // Limpia los controles de paginación de clientes
    $("#paginationClientes").empty();
  
    // Agrega botones de paginación de clientes
    for (var i = 1; i <= totalPaginasClientes; i++) {
      var activeClass = i === paginaClientesActual ? "active" : "";
      var buttonHtml = '<li class="page-item ' + activeClass + '"><a href="#" class="page-link" data-pagina="' + i + '">' + i + '</a></li>';
      $("#paginationClientes").append(buttonHtml);
    }

    // Delegar el evento clic en los elementos de paginación
    $("#paginationClientes a").on("click", function(e) {
        e.preventDefault();
        var pagina = $(this).data("pagina");
        cambiarPaginaClientes(pagina);
    });
}
  function cambiarPaginaClientes(pagina) {
    // Actualiza la página actual y muestra los clientes en esa página
    paginaClientesActual = pagina;
    mostrarClientesEnPagina(pagina);
  }
  

/*-------------------------------------------------------- */
/*--------------- Consumir Clientes Ver--------------------*/
/*-------------------------------------------------------- */
$(document).ready(function () {
    var consumo_api = 'https://mbytesolucionesapi.onrender.com/api/clientes';
    verificarToken();
  
    $.ajax({
      type: 'GET',
      dataType: 'json',
      url: consumo_api,
      headers: {
        'Authorization': 'Bearer ' + token,
      },
      success: function (data) {
        if (data.clientesBD && data.clientesBD.length > 0) {
          // Guarda la lista completa de clientes
          clientes = data.clientesBD;
          // Muestra los clientes en la primera página
          mostrarClientesEnPagina(1);
          // Muestra los controles de paginación
          mostrarControlesDePaginacionClientes();
        } else {
          console.error("La respuesta de la API no contiene datos válidos.");
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
/*--------------- Mostrar Clientes ------------------------*/
/*-------------------------------------------------------- */
function mostrarClientesEnPagina(pagina) {
    // Calcula el índice de inicio y fin para la página actual de clientes
    var inicioClientes = (pagina - 1) * clientesPorPagina;
    var finClientes = inicioClientes + clientesPorPagina;
  
    // Obtiene la lista de clientes para la página actual
    var clientesEnPagina = clientes.slice(inicioClientes, finClientes);
  
    // Limpia la tabla de clientes antes de agregar clientes
    $("#tabla_clientes tbody").empty();
  
    // Muestra los clientes en la tabla
    for (var i = 0; i < clientesEnPagina.length; i++) {
      var cliente = clientesEnPagina[i];
  
      var clienteHtml =
        '<tr>' +
        '<td><div class="custom-control custom-checkbox"><input type="checkbox" class="custom-control-input" id=""><label class="custom-control-label" for=""></label></div></td>' +
        '<td>' + (inicioClientes + i + 1) + '</td>' +
        '<td>' + cliente.nombre + '</td>' +
        '<td>' + cliente.correo + '</td>' +
        '<td>' + cliente.telefono + '</td>' +
        '<td>' + formatearFecha(cliente.createdAt) + '</td>' +
        '</tr>';
  
      $("#tabla_clientes tbody").append(clienteHtml);
    }
  }