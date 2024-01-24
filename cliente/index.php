<!DOCTYPE html>
<html lang="en">
<?php include "header.php"; ?>
	<body>
	
		<!-- PRESENTATION SECTION-->
		<div id="presentation" class="section" style="padding:10%">
			<!-- container -->
			<div class="container">
				<!-- row -->
				<div class="row">
					<div class="col-md-12">
						<div class="presentation">
							<ul class="presentation-countdown">
				
							</ul>
							<h2 class="text-uppercase" style="color:white">Bienvenido a MByte Soluciones Tecnológicas, para hacer tu experiencia  
							de compra más fácil, en esta sección podrás generar tu comprobante detallado, una vez descargado puedes envíarselo al 
							Administrador vía WhatsApp para verificar el pago. Así de sencillo!</h2>
							<a class="primary-btn cta-btn" href="carrito.php">Comprar Ahora</a>
							
						</div>
					</div>
				</div>
				<!-- /row -->
			</div>
			<!-- /container -->
		</div>
		<!-- PRESENTATIONL SECTION -->


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
		<?php include "footer.php"; ?>
	</body>
	<script>
    // Obtener todos los elementos con el id "ver_producto"
    var botonesVerProducto = document.querySelectorAll('#ver_producto');

    // Función para manejar el clic en los botones "ver_producto"
    function redirigirAPagina() {
        // Obtener el ID del producto actual
        var idProducto = this.getAttribute('id');
        // Construir la URL usando el ID del producto (por ejemplo, product.php?id=ver_producto)
        var url = 'product.php?id=' + idProducto;
        // Redirigir a la página especificada
        window.location.href = url;
    }

    // Asignar la función a todos los botones "ver_producto"
    for (var i = 0; i < botonesVerProducto.length; i++) {
        botonesVerProducto[i].addEventListener('click', redirigirAPagina);
    }
</script>


</html>
