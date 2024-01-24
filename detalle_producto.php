<?php
// Obtener el ID del producto de la URL
$productoId = isset($_GET['id']) ? $_GET['id'] : null;
//echo $productId;

?>

<!DOCTYPE html>
<html lang="en">
<?php include "header.php"; ?>
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
							<li><a id="nombreCategoriaDetalle"></a></li>
						</ul>
					</div>
				</div>
				<!-- /row -->
			</div>
			<!-- /container -->
		</div>
		<!-- /BREADCRUMB -->

		<!-- SECTION -->
		<div class="section">
			<!-- container -->
			<div class="container">
				<!-- row -->
				<div class="row">
					<!-- Product main img -->
					<div class="col-md-5 ">
						<div id="product-main-img">
							<div class="product-preview">
								<img src="" alt="" id="imagenProducto">
							</div>
						</div>
					</div>
					<!-- /Product main img -->

					<!-- Product details -->
					<div class="col-md-5">
						<div class="product-details">
							<h2 class="product-name" id="nombre"></h2>
							<div>
								<div class="product-rating">
									<i class="fa fa-star"></i>
									<i class="fa fa-star"></i>
									<i class="fa fa-star"></i>
									<i class="fa fa-star"></i>
									<i class="fa fa-star"></i>
								</div>
								<a class="review-link" href="#">10 Review(s) | Add your review</a>
							</div>
							<div>
							
								<h3 class="product-price" id="precio"><del class="product-old-price">$990.00</del></h3>
								<!--<span class="product-available">In Stock</span>-->
							</div>
							<!-- Aquí va la descripcion -->
							<p id="descripcion"></p>

							<p class="product-links">								
								<span style="color:#1F4172" ><i class="fa fa-list-ul" aria-hidden="true"></i> CATEGORÍA:<p id="categoria"></p></span> 
							</p>
							<p class="product-links">								
								<span style="color:#1F4172" ><i class="fa fa-check-square-o" aria-hidden="true"></i> MARCA:<p id="marca"></p></span> 
							</p>
							<p class="product-links">								
								<span style="color:#1F4172" ><i class="fa fa-cart-plus" aria-hidden="true"></i> STOCK:<p id="stock"></p></span> 
							</p>
							<div class="add-to-cart">
								<button class="add-to-cart-btn" data-toggle="modal" data-target="#modalAviso"><i class="fa fa-shopping-cart"></i>Agregar al Carrito</button>
							</div>							
						</div>
					</div>
					<!-- /Product details -->

					<!-- Product tab -->

					<!-- /product tab -->
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
<script>
var id = '<?php echo $productoId; ?>';
//LLAMADA DE FUNCIONES
$(document).ready(function () {
    mostrarDatosProducto(id);
});
</script>
		
	</body>
</html>
