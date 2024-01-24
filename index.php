<!DOCTYPE html>
<html lang="en">
<?php include "header.php"; ?>
<head>
<style>
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
	
		<!-- PRESENTATION SECTION-->
		<div id="presentation" class="section">
			<!-- container -->
			<div class="container">
				<!-- row -->
				<div class="row">
					<div class="col-md-12">
						<div class="presentation">
							<ul class="presentation-countdown">
								<li>
									<div>
										<a href="https://www.facebook.com/MByteSoluciones" target="_blank"><i class="fa fa-facebook" aria-hidden="true"></i></a>
									</div>
								</li>
								<li>
									<div>
										<a href="https://www.instagram.com/mbyte_soluciones/" target="_blank"><i class="fa fa-instagram" aria-hidden="true"></i></a>
									</div>
								</li>
								<li>
									<div>
										<a href="https://wa.link/si7xv6" target="_blank"><i class="fa fa-whatsapp" aria-hidden="true"></i></a>
									</div>
								</li>
								<li>
									<div>
										<a href="#0"><i class="fa fa-twitter" aria-hidden="true"></i></a>
									</div>
								</li>					
							</ul>
							<h2 class="text-uppercase" style="color:white">MByte ofrece insumos tecnológicos, Telefonía celular, Laptops y Pc's. Adicionamos a nuestros clientes asesoramiento y atención personalizada.</h2>
							<p style="color:white">BIENVENIDOS</p>
							<a class="primary-btn cta-btn" href="#nuestros_productos">Comprar Ahora</a>
							
						</div>
					</div>
				</div>
				<!-- /row -->
			</div>
			<!-- /container -->
		</div>


		<!-- SECTION -->
		<div class="section">
			<!-- container -->
			<div class="container">
				<!-- row -->
				<div class="row">
					<!-- shop -->
					<div class="col-md-4 col-xs-6">
						<div class="shop">
							<div class="shop-img">
								<img src="./img/login_logo2.jpg" alt="">
							</div>
							<div class="shop-body">
								<h3>Reparación<br>Laptops</h3>
								<a href="servicio_tecnico.php" class="cta-btn">Ver más<i class="fa fa-arrow-circle-right"></i></a>
							</div>
						</div>
					</div>
					<!-- /shop -->

					<!-- shop -->
					<div class="col-md-4 col-xs-6">
						<div class="shop">
							<div class="shop-img">
								<img src="./img/login_logo2.jpg" alt="">
							</div>
							<div class="shop-body">
								<h3>Reparación<br>Celulares</h3>
								<a href="servicio_tecnico.php" class="cta-btn">Ver más<i class="fa fa-arrow-circle-right"></i></a>
							</div>
						</div>
					</div>
					<!-- /shop -->

					<!-- shop -->
					<div class="col-md-4 col-xs-6">
						<div class="shop">
							<div class="shop-img">
								<img src="./img/login_logo2.jpg" alt="">
							</div>
							<div class="shop-body">
								<h3>Mantenimiento<br></h3>
								<a href="servicio_tecnico.php" class="cta-btn">Ver más<i class="fa fa-arrow-circle-right"></i></a>
							</div>
						</div>
					</div>
					<!-- /shop -->
				</div>
				<!-- /row -->
			</div>
			<!-- /container -->
		</div>
		<!-- /SECTION -->

		<!-- SECTION -->
		<div class="section">
			<!-- container -->
			<div class="container">
				<!-- row -->
				<div class="row">

					<!-- section title -->
					<div class="col-md-12" id="nuestros_productos">
						<div class="section-title">
							<h3 class="title">Nuestros productos</h3>

						</div>
					</div>

       
					<!-- Products tab & slick -->
					<div class="col-md-12">
						<div class="row">
							<div class="products-tabs">
								<!-- tab -->
								<div id="tab1" class="tab-pane active">
									<div class="products-slick" data-nav="#slick-nav-1" id="productos">
										
										<!-- Aquí se agregarán dinámicamente los productos desde JavaScript -->

									</div>
									<div id="slick-nav-1" class="products-slick-nav"></div>
								</div>
								<!-- /tab -->
							</div>
						</div>
					</div>
					<!-- /Products tab & slick -->

				</div>
				<!-- /row -->
			</div>
			<!-- /container -->
		</div>
		<!-- /SECTION -->

		<!-- HOT DEAL SECTION -->
		<div id="hot-deal" class="section">
			<!-- container -->
			<div class="container">
				<!-- row -->
				<div class="row">
					<div class="col-md-12">
						<div class="hot-deal">
							<ul class="hot-deal-countdown">
								<li>
									<div>
										<a href="https://www.facebook.com/MByteSoluciones" target="_blank"><i class="fa fa-facebook fa-2x" aria-hidden="true"></i></a>
									</div>
								</li>
								<li>
									<div>
										<a href="https://www.instagram.com/mbyte_soluciones/" target="_blank"><i class="fa fa-instagram fa-2x" aria-hidden="true"></i></a>
									</div>
								</li>
								<li>
									<div>
										<a href="https://wa.link/si7xv6" target="_blank"><i class="fa fa-whatsapp fa-2x" aria-hidden="true"></i></a>
									</div>
								</li>
								<li>
									<div>
										<a href="#0"><i class="fa fa-twitter fa-2x" aria-hidden="true"></i></a>
									</div>
								</li>	
							</ul>
							<h2 class="text-uppercase">GANA OBSEQUIOS</h2>
							<p>Síguenos en nuestras redes sociales</p>
							<a class="primary-btn cta-btn" href="#nuestros_productos">COMPRAR AHORA</a>
						</div>
					</div>
				</div>
				<!-- /row -->
			</div>
			<!-- /container -->
		</div>
		<!-- /HOT DEAL SECTION -->

		<!-- SECTION -->
		<div class="section">
			<!-- container -->
			<div class="container">
				<!-- row -->
				<div class="row">

					<!-- section title -->
					<div class="col-md-12">
						<div class="section-title">
							<h3 class="title">Categorías</h3>

						</div>
					</div>
					<!-- /section title -->

					<!-- Products tab & slick -->
					<div class="col-md-12">
						<div class="row">
							<div class="products-tabs">
								<!-- tab -->
								<div id="tab2" class="tab-pane fade in active">
									<div class="products-slick" data-nav="#slick-nav-2" id="categorias_slider">
									<!-- Aquí se agregarán dinámicamente los productos desde JavaScript -->

									</div>
									<div id="slick-nav-2" class="products-slick-nav"></div>
								</div>
								<!-- /tab -->
							</div>
						</div>
					</div>
					<!-- /Products tab & slick -->
				</div>
				<!-- /row -->
			</div>
			<!-- /container -->
		</div>
		<!-- /SECTION -->

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
		<!-- NEWSLETTER 
		<div id="newsletter" class="section">
			<div class="container">
				<div class="row">
					<div class="col-md-12">
						<div class="newsletter">
							<p>Sign Up for the <strong>NEWSLETTER</strong></p>
							<form>
								<input class="input" type="email" placeholder="Enter Your Email">
								<button class="newsletter-btn"><i class="fa fa-envelope"></i> Subscribe</button>
							</form>
							<ul class="newsletter-follow">
								<li>
									<a href="#"><i class="fa fa-facebook"></i></a>
								</li>
								<li>
									<a href="#"><i class="fa fa-twitter"></i></a>
								</li>
								<li>
									<a href="#"><i class="fa fa-instagram"></i></a>
								</li>
								<li>
									<a href="#"><i class="fa fa-pinterest"></i></a>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
		 /NEWSLETTER -->
		 
		<script src="consumo/index.js"></script>
		<script type="text/javascript">
				
				var consumo_api = 'https://mbytesolucionesapi.onrender.com/api/productos';

				$.ajax({
					type: 'GET', // GET (PARA OBTENER DATOS)
					dataType: 'json',
					url: consumo_api,
					async: false,
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

			var categoria_api = 'https://mbytesolucionesapi.onrender.com/api/categorias';
			var container = $("#categorias_slider");

			$.ajax({
				type: 'GET',
				dataType: 'json',
				url: categoria_api,
				async: false,
				success: function (data) {
					if (data.categorias && data.categorias.length > 0) {
						mostrarCategoriasSlider(container, data.categorias);
						// Asignar evento de clic a cada elemento de categoría
						$(".categoria-item").on("click", function () {
							var categoriaId = $(this).data("categoria-id");
							// Redirigir a la página de productos con el id de la categoría como parámetro
							window.location.href = 'producto.php?categoria=' + categoriaId;
						});
					} else {
						console.error("La respuesta de la API no contiene categorias válidos.");
					}
				},
				error: function (error) {
					console.error("Error al obtener datos de la API:", error);
				}
			});				
		</script>	
	
		<?php include "footer.php"; ?>
	</body>

</html>
		<!-- PRESENTATIONL SECTION -->

