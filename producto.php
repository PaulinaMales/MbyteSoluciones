<?php
// Obtener el ID de la categoría de la URL
$categoriaId = isset($_GET['categoria']) ? $_GET['categoria'] : null;
?>

<!DOCTYPE html>
<html lang="en">
<?php include "header.php"; ?>

<head>
<style>
<!--.product-img-container {
    max-width: 100%;
    max-height: 200px; /* Ajusta según sea necesario */
    overflow: hidden; /* Para evitar que las imágenes más grandes afecten el diseño */
}

.product-img-container img {
    width: 100%;
    height: auto;
    display: block; /* Evitar espacios en blanco debajo de las imágenes */
}
-->

    .product-name {
        max-height: 3.6em; /* Establece el máximo de 2 líneas (1.8em por línea) */
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2; /* Número de líneas a mostrar */
        -webkit-box-orient: vertical;
    }


</style>
</head>
	<body>
		<!-- BREADCRUMB -->
		<div id="breadcrumb" class="section">
			<!-- container -->
			<div class="container">
				<!-- row -->
				<div class="row">
					<div class="col-md-12">
						<ul class="breadcrumb-tree">
							<li><a href="index.php">Inicio</a></li>
							<li><a id="nombreCategoria"></a></li>

						</ul>
					</div>
				</div>
				<!-- /row -->
			</div>
			<!-- /container -->
		</div>
		<!-- /BREADCRUMB -->
				<!-- MAIN HEADER -->

					<!-- row -->
					<div class="row">

						<!-- SEARCH BAR -->
						<div class="col-md-4">
						</div>
						<!-- SEARCH BAR -->
						<div class="col-md-4">
							<div class="header-search">
								<form>
									<select class="input-select" style="width:60%; border-color:black" id="marcas">
										<option value="0">-- Todos --</option>
									</select>

									<button type="button" class="search-btn" onclick="obtenerProductosPorMarcaYCategoria('<?php echo $categoriaId; ?>')">Buscar <i class="fa fa-search" aria-hidden="true"></i></button>
								</form>
							</div>
						</div>
						<!-- /SEARCH BAR -->
					</div>
					<!-- row -->

			<!-- /MAIN HEADER -->
		<!-- SECTION -->
		<div class="section">
			<!-- container -->
			<div class="container">
				<!-- row -->
				<div class="row">

					<!-- STORE -->
					<div id="store" class="col-md">

						<!-- Puedes agregar un elemento oculto para almacenar el ID de la categoría -->
						<input type="hidden" id="categoriaId" value="<?php echo $categoriaId; ?>">
						<!-- store products -->
						<div class="row">

						</div>
						<!-- /store products -->

						<!-- store bottom filter -->
						<div class="store-filter clearfix">
							<ul class="store-pagination">
								<li class="active">1</li>

							</ul>
						</div>
						<!-- /store bottom filter -->
					</div>
					<!-- /STORE -->
				</div>
				<!-- /row -->
			</div>
			<!-- /container -->
		</div>
		<!-- /SECTION -->

		<!-- Modal -->
		<div id="modalAviso" class="modal fade" role="dialog">
		  <div class="modal-dialog">

			<!-- Modal content-->
			<div class="modal-content">
			  <div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<h4 class="modal-title">Añadir Producto al Carrito <i class="fa fa-shopping-cart"></i> </h4>
			  </div>
			  <div class="modal-body">
				<p>Para poder añadir los productos al carrito, necesitará iniciar sesión o registrarse. 
				Estaremos gustosos de que forme parte de nuestra clientela!</p>
			  </div>
			  <div class="modal-footer">
			   <a href="login.php"> <button type="button" class="btn btn-success">Iniciar Sesión</button></a>
				<button type="button" class="btn btn-warning" data-dismiss="modal">Seguir viendo</button>

			  </div>
			</div>

		  </div>
		</div>

		<?php include "footer.php"; ?>


        <script src="consumo/index.js"></script>
        <script type="text/javascript">
		$(document).ready(function () {
			// Obtener el ID de la categoría de la página
			var categoriaId = $('#categoriaId').val();
			console.log(categoriaId);
			// Llamar a tu función para mostrar productos pasando el ID de la categoría
			obtenerProductosPorCategoria(categoriaId);
			// Llamar a la función para filtrar marcas y mostrar productos al cargar la página
			filtrarPorMarca(categoriaId);
		});

		// Llamada a la función de filtrar marcas cuando cambia la categoría seleccionada
		$("#categoriaId").on("change", function () {
			var nuevaCategoriaId = $(this).val();
			filtrarPorMarca(nuevaCategoriaId);
			// También puedes llamar a la función para obtener productos por la nueva categoría aquí
			obtenerProductosPorCategoria(nuevaCategoriaId);
		});


				
        </script>		
	</body>
</html>
