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
/*-------------  Filtrar por marca  -- ---------------- */
/*-------------------------------------------------------* */  
function filtrarPorMarca(){
    
    var api_marca = 'https://mbytesolucionesapi.onrender.com/api/productos/marcas';

    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: api_marca,         
        success: function (data) {
            console.log(data);

        },
        error: function (error) {
            console.error("Error al obtener datos de la API:", error);
        }
    });
}

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

/*function mostrarProductosEnLista(productos, categoriaId) {
    var container = $("#store .row");
    container.empty(); // Limpiar el contenedor antes de agregar nuevos productos

    for (var i = 0; i < productos.length; i++) {
        var producto = productos[i];
        var imagenUrl = producto.imagen && producto.imagen.secure_url ? producto.imagen.secure_url : '';

        // Filtrar productos por categoría si categoriaId está presente
        if (categoriaId && (!producto.categoria || producto.categoria._id !== categoriaId)) {
            continue; // Saltar este producto si no pertenece a la categoría seleccionada
        }

        var html =
            '<div class="col-md-4 col-xs-6">' +
                '<div class="product">' +
                    '<div class="product-img">' +
                        '<img src="' + imagenUrl + '" alt="' + producto.nombre + '" style="width:250px;height:190px;" >' +
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
                    '<button type="button" class="add-to-cart-btn" id="agregarCarrito" data-toggle="modal" data-target="#modalAviso"><i class="fa fa-shopping-cart"></i> add to cart</button>' +
                    '</div>' +
                '</div>' +
            '</div>';

        container.append(html);
    }

    // Asignar la función al evento click de los botones "ver_producto" después de agregar los elementos al contenedor
    $(".ver_producto").on("click", function () {
        var indiceProducto = $(this).data("indice");
        var url = 'detalle_producto.php?id=' + indiceProducto;
        window.location.href = url;
    });
}*/

function mostrarProductosEnLista(productos, categoriaId) {
    var container = $("#store .row");
    container.empty(); // Limpiar el contenedor antes de agregar nuevos productos

    

    for (var i = 0; i < productos.length; i++) {
        var producto = productos[i];

        // Verificar si la cantidad disponible es mayor que cero
        if (producto.cantidad > 0) {
            var imagenUrl = producto.imagen && producto.imagen.secure_url ? producto.imagen.secure_url : '';

            // Filtrar productos por categoría si categoriaId está presente
            if (categoriaId && (!producto.categoria || producto.categoria._id !== categoriaId)) {
                
                continue; // Saltar este producto si no pertenece a la categoría seleccionada
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