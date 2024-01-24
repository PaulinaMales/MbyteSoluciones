// FUNCIONES INDEX

/*-------------------------------------------------------- */
/*-------------    Mostrar Categorías     ---------------- */
/*-------------------------------------------------------* */   
function mostrarCategorias(container, categorias) {
    for (var i = 0; i < categorias.length; i++) {
        var categoria = categorias[i];

        var categoriaHtml = '<li id="' + categoria._id + '" class="categoria-item" data-categoria-id="' + categoria._id + '"><a href="#">' + categoria.nombre + '</a></li>';

        container.append(categoriaHtml);
    }

    // Verificar si hay una categoría activa almacenada en la cookie
    var activeCategory = getCookie("activeCategory");
    if (activeCategory) {
        // Activar la categoría almacenada
        activateCategory(activeCategory);
    }
}
/*-------------------------------------------------------- */
/*-------------  Paginación categorias - ---------------- */
/*-------------------------------------------------------* */  

var productosFiltradosPaginacion = []; // Variable global para almacenar los productos filtrados
var productosPorPagina = 6;
var paginaActual = 1;
function filtrarProductosPorCategoria(productos, categoriaId) {
    return productos.filter(function (producto) {
        if (categoriaId) {
            return producto.categoria && (producto.categoria._id === categoriaId || producto.categoria === categoriaId);
        }
        return true; // Si no hay categoría seleccionada, devolver todos los productos
    });
}

function mostrarProductosPaginados() {
    var startIndex = (paginaActual - 1) * productosPorPagina;
    var endIndex = startIndex + productosPorPagina;
    var productosEnPagina = productosFiltradosPaginacion.slice(startIndex, endIndex);
    mostrarProductosEnLista(productosEnPagina);
    mostrarPaginacion();
}

function mostrarPaginacion() {
    // Calcula la cantidad total de páginas
    var totalPaginas = Math.ceil(productosFiltradosPaginacion.length / productosPorPagina);

    // Limpia la paginación existente
    $(".store-pagination").empty();

    // Crea los enlaces de paginación
    for (var i = 1; i <= totalPaginas; i++) {
        var li = $("<li>").text(i).on("click", function () {
            // Actualiza la página actual y vuelve a cargar los productos
            paginaActual = parseInt($(this).text());
            mostrarProductosPaginados();
        });

        // Agrega la clase "active" si es la página actual
        if (i === paginaActual) {
            li.addClass("active");
        }

        $(".store-pagination").append(li);
    }
}

/*-------------------------------------------------------- */
/*-------------  Filtrar por categoría  - ---------------- */
/*-------------------------------------------------------* */  
function obtenerProductosPorCategoria(categoriaId) {
    // Realizar una llamada a tu API para obtener productos
    var productos_api = 'https://mbytesolucionesapi.onrender.com/api/productos';

    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: productos_api,
        success: function (data) {
            if (data.productos && data.productos.length > 0) {
                // Llamar a tu función para mostrar productos
                //mostrarProductosEnLista(data.productos, categoriaId);

                // Filtra los productos por categoría
                productosFiltradosPaginacion = filtrarProductosPorCategoria(data.productos, categoriaId);
                // Muestra los productos paginados
                mostrarProductosPaginados();
            } else {
                console.error("La respuesta de la API no contiene productos válidos.");
            }
        },
        error: function (error) {
            console.error("Error al obtener productos de la API:", error);
        }
    });
}
/*-------------------------------------------------------- */
/*-------------  Filtrar por marca  -- ---------------- */
/*-------------------------------------------------------* */  
function mostrarMarcas(marcas) {
    // Limpiar el contenido actual del dropdown de marcas
    $("#marcas").empty();

    // Agregar la opción "Todos"
    $("#marcas").append('<option value="0">-- Todos --</option>');

    // Iterar sobre las marcas y agregarlas al dropdown
    for (var i = 0; i < marcas.length; i++) {
        var marca = marcas[i].marca;
        $("#marcas").append('<option value="' + marca + '">' + marca + '</option>');
    }
}

// Llamada a la función de filtrar marcas cuando cambia la categoría seleccionada
$("#categoriaId").on("change", function () {
    var nuevaCategoriaId = $(this).val();
    filtrarPorMarca(nuevaCategoriaId);
    // También puedes llamar a la función para obtener productos por la nueva categoría aquí
    obtenerProductosPorCategoria(nuevaCategoriaId);
});


function filtrarPorMarca(categoriaId) {
    var api_marca = 'https://mbytesolucionesapi.onrender.com/api/productos/marcas';

    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: api_marca,
        success: function (data) {
            // Filtrar marcas según la categoría seleccionada y que tengan productos disponibles
            var marcasFiltradas = data.productosPorMarca.filter(function (marca) {
                return marca.productos.some(function (producto) {
                    return producto.categoria === categoriaId && producto.cantidad > 0;
                });
            });

            // Mostrar las marcas filtradas
            mostrarMarcas(marcasFiltradas);
        },
        error: function (error) {
            console.error("Error al obtener datos de la API:", error);
        }
    });
}


function obtenerProductosPorMarcaYCategoria(categoriaId) {
    // Obtener la marca seleccionada
    var marcaSeleccionada = $('#marcas').val();
    console.log("M:"+ marcaSeleccionada);

    // Realizar una llamada a tu API para obtener productos
    var productos_api = 'https://mbytesolucionesapi.onrender.com/api/productos/marcas';


    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: productos_api,
        success: function (data) {

            console.log("Marcas en los Datos de la API:", data.productosPorMarca.map(marca => marca.marca));           
            
             productosFiltrados = [];

            // Iterar sobre las marcas
            for (var i = 0; i < data.productosPorMarca.length; i++) {
                var marca = data.productosPorMarca[i];

                // Verificar si la marca coincide y tiene productos en la categoría seleccionada
                if (marca.marca.toLowerCase() === marcaSeleccionada.toLowerCase()) {
                    for (var j = 0; j < marca.productos.length; j++) {
                        var producto = marca.productos[j];

                        if (producto.categoria === categoriaId) {
                            productosFiltrados.push(producto);
                        }
                    }
                }
            }


           console.log("Categoría Seleccionada: " + categoriaId);
            console.log("Categorías en los Productos:", productosFiltrados.map(producto => producto.categoria));
            console.log("Productos Filtrados:", JSON.stringify(productosFiltrados, null, 2));

            // Mostrar los productos filtrados
            mostrarProductosEnLista(productosFiltrados, categoriaId);

         if(marcaSeleccionada=="0"){
            obtenerProductosPorCategoria(categoriaId);
         }   
        },
        error: function (error) {
            console.error("Error al obtener datos de la API:", error);
        }
    });
}


/*-------------------------------------------------------- */
/*-------------  Mostrar Productos cada Categ.------------ */
/*-------------------------------------------------------* */ 

function mostrarProductosEnLista(productos, categoriaId) {
    var container = $("#store .row");
    container.empty(); // Limpiar el contenedor antes de agregar nuevos productos

    

    for (var i = 0; i < productos.length; i++) {
        var producto = productos[i];

        // Verificar si la cantidad disponible es mayor que cero
        if (producto.cantidad > 0) {
            var imagenUrl = producto.imagen && producto.imagen.secure_url ? producto.imagen.secure_url : '';

            if (categoriaId) {
                if (!producto.categoria || (producto.categoria._id !== categoriaId && producto.categoria !== categoriaId)) {
                    continue; // Saltar este producto si no pertenece a la categoría seleccionada
                }
            }
            
            $("#nombreCategoria").html(producto.categoria.nombre);

            var html =
                '<div class="col-md-4 col-xs-6">' +
                    '<div class="product">' +
                        '<div class="product-img">' +
                            '<img src="' + imagenUrl + '" alt="' + producto.nombre + '"  >' +
                            '<div class="product-label">' +
                            (producto.descuento ? '<span class="sale">-' + producto.descuento + '%</span>' : '') +
                            (producto.nuevo ? '<span class="new">NEW</span>' : '') +
                            '</div>' +
                        '</div>' +
                            '<div class="product-body">' +
                            '<p class="product-category">Category</p>' +
                            '<h3 class="product-name"><a href="#" class="product-name" >' + producto.nombre + '</a></h3>'  +

                           
                            '<h4 class="product-price">$' + producto.precio_venta.toFixed(2) + ' <del class="product-old-price">$999</del></h4>' +
                                '<div class="product-rating">' +
                                    '<i class="fa fa-star"></i>'+
                                    '<i class="fa fa-star"></i>'+
                                    '<i class="fa fa-star"></i>'+
                                    '<i class="fa fa-star"></i>'+
                                    '<i class="fa fa-star"></i>'+
                                // Puedes agregar lógica para las estrellas según tus necesidades
                                '</div>' +
                                '<div class="product-btns">' +
                                '<button class="quick-view ver_producto" data-indice="' + producto._id + '"><i class="fa fa-eye"></i><span class="tooltipp">quick view</span></button>' +
                                '</div>' +
                            '</div>' +
                        '<div class="add-to-cart">' +
                        '<button type="button" class="add-to-cart-btn" id="agregarCarrito" data-toggle="modal" data-target="#modalAviso"><i class="fa fa-shopping-cart"></i>Agregar al Carrito</button>' +
                        '</div>' +
                    '</div>' +
                '</div>';

            container.append(html);
        }
        
    }
    // Asignar la función al evento click de los botones "ver_producto" después de agregar los elementos al contenedor
    $(".ver_producto").on("click", function () {
        var indiceProducto = $(this).data("indice");
        var url = 'detalle_producto.php?id=' + indiceProducto;
        window.location.href = url;
    });    
}
/*-------------------------------------------------------- */
/*-------------  Slider categorías -- ---------------- */
/*-------------------------------------------------------* */ 

function mostrarCategoriasSlider(container, categorias) {
    for (var i = 0; i < categorias.length; i++) {
        var categoria = categorias[i];

        var categoriaHtml =
        '<div class="product">' +
            '<div class="product-img categoria-item" data-categoria-id="' + categoria._id + '">' +
                '<img src="./img/mascota.jpg" alt="' + categoria.nombre + '">' +
            '</div>' +
                '<div class="product-body">' +
                    '<p class="product-category">CATEGORIA</p>' +
                    '<h3 class="product-name"><a  class="categoria-item" data-categoria-id="' + categoria._id + '">'+ categoria.nombre +'</a></h3>'+                   
                    '<div class="product-rating">' +
                        // Puedes agregar lógica para las estrellas según tus necesidades
                        '<i class="fa fa-star"></i>'+
                        '<i class="fa fa-star"></i>'+
                        '<i class="fa fa-star"></i>'+
                        '<i class="fa fa-star"></i>'+
                        '<i class="fa fa-star"></i>'+
                    '</div>' +
                '</div>' +
        '</div>';

        container.append(categoriaHtml);
    }
}


//Funciones index mostrar productos
function mostrarProductos(productos) {
    var container = $("#productos");

    
    for (var i = 0; i < productos.length; i++) {
            var producto = productos[i];
        // Verificar si la cantidad disponible es mayor que cero
         if (producto.cantidad > 0) {    
                            // Accedemos a la clave imagen para mostar la imagen del producto
            var imagenUrl = producto.imagen && producto.imagen.secure_url ? producto.imagen.secure_url : '';

            var html = 
            '<div class="product">' +
                '<div class="product-img ver_producto" data-indice="' + producto._id + '">' +
                    '<img src="' + imagenUrl + '" alt="' + producto.nombre + '" style="width:250px;height:200px;">' +
                    '<div class="product-label">' +
                    (producto.descuento ? '<span class="sale">-' + producto.descuento + '%</span>' : '') +
                    (producto.nuevo ? '<span class="new">NEW</span>' : '') +
                    '</div>' +
                '</div>' +
                    '<div class="product-body">' +
                        '<p class="product-category">'+producto.categoria.nombre+'</p>' +
                        '<h3 class="product-name"><a class="ver_producto" data-indice="' + producto._id + '">' + producto.nombre + '</a></h3>' +
                        '<h4 class="product-price">$' + producto.precio_venta.toFixed(2) + ' <del class="product-old-price">$999</del></h4>' +
                        '<div class="product-rating">' +
                        // Puedes agregar lógica para las estrellas según tus necesidades
                        '<i class="fa fa-star"></i>'+
                        '<i class="fa fa-star"></i>'+
                        '<i class="fa fa-star"></i>'+
                        '<i class="fa fa-star"></i>'+
                        '<i class="fa fa-star"></i>'+
                        '</div>' +
                        '<div class="product-btns">' +
                        '<button class="quick-view ver_producto" data-indice="' + producto._id + '"><i class="fa fa-eye"></i><span class="tooltipp">quick view</span></button>' +
                        '</div>' +
                    '</div>' +
                '<div class="add-to-cart">' +
                '<button type="button" class="add-to-cart-btn" id="agregarCarrito" data-toggle="modal" data-target="#modalAviso"><i class="fa fa-shopping-cart"></i>Agregar al Carrito</button>' +
                '</div>' +
            '</div>';
            container.append(html);
        }
    }
    // Asignar la función al evento click de los botones "ver_producto"
    $(".ver_producto").on("click", function () {
        var indiceProducto = $(this).data("indice");
        var url = 'detalle_producto.php?id=' + indiceProducto;
        window.location.href = url;
    });
}
//FUNCIONES DETALLE PRODUCTO
function mostrarDatosProducto(id) {
    var detalle_api = 'https://mbytesolucionesapi.onrender.com/api/producto/detalle/' + id;

    
    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: detalle_api,
        success: function (data) {   
            var producto = data.producto; // Acceder a la clave "producto"    

            var imagenUrl = producto.imagen && producto.imagen.secure_url ? producto.imagen.secure_url : '';
            
            $('#nombre').html(producto.nombre);
            $('#precio').html(producto.precio_venta +'$');
            $('#descripcion').html(producto.descripcion);
            $('#stock').html(producto.cantidad);
            $('#categoria').html(producto.categoria.nombre);
            $('#nombreCategoriaDetalle').html(producto.categoria.nombre);
            $('#marca').html(producto.marca);
            $("#imagenProducto").attr("src", imagenUrl);

        },
        error: function (error) {
            console.error("Error al obtener detalles del producto:", error);
        }
    });
}