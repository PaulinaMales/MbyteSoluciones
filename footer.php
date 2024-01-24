<!DOCTYPE html>
<html lang="en">
		<!-- FOOTER -->
		<footer id="footer">
			<!-- top footer -->
			<div class="section">
				<!-- container -->
				<div class="container">
					<!-- row -->
					<div class="row">
					<div class="col-md-3 col-xs-6">
							<div class="footer">
								<h3 class="footer-title">MByte</h3>
								<a href="index.php">
							  <img src="img/logo_mbyte.png" alt="BootstrapBrain Logo" width="50%" height="">
							</a>
							</div>
						</div>

					<div class="col-md-3 col-xs-6">
							<div class="footer">
								<h3 class="footer-title">CONTACTOS</h3>
								<ul class="footer-links">
									<li><a href="https://maps.app.goo.gl/yLbWGRgVMmhBofFf8" target="_blank"><i class="fa fa-map-marker"></i>Quito, Rosa Campuzano y Camilo Guachamín</a></li>
									<li><a href="https://wa.link/si7xv6" target="_blank"><i class="fa fa-phone"></i>+593 97 894 8486</a></li>
									<li><a href="mailto:mbytesoluciones@gmail.com"><i class="fa fa-envelope-o"></i>mbytesoluciones@gmail.com</a></li>
								</ul>
							</div>
						</div>

						<div class="col-md-3 col-xs-6">
							<div class="footer">
								<h3 class="footer-title">Categorias</h3>
								<ul class="footer-links" id="categoriasFooter">
										<!--<li><a href="celulares.php">Celulares</a></li>
										<li><a href="pcs.php">PC´s</a></li>
										<li><a href="laptops.php">Laptops</a></li>
										<li><a href="impresoras.php">Impresoras</a></li>
										<li><a href="accesorios.php">Accesorios</a></li>-->
								</ul>
							</div>
						</div>

						<div class="clearfix visible-xs"></div>

						<div class="col-md-3 col-xs-6">
							<div class="footer">
								<h3 class="footer-title">Información</h3>
								<ul class="footer-links">
										<li><a href="servicio_tecnico.php">Servicio Técnico</a></li>
										<li><a href="quienes_somos.php">¿Quiénes somos?</a></li>
										<li><a href="contacto.php">Contacto</a></li>
								</ul>
							</div>
						</div>


					</div>
					<!-- /row -->
				</div>
				<!-- /container -->
			</div>
			<!-- /top footer -->

			<!-- bottom footer -->
			<div id="bottom-footer" class="">
				<div class="container">
					<!-- row -->
					<div class="row">
						<div class="col-md-12 text-center">
							<!--<ul class="footer-payments">
								<li><a href="#"><i class="fa fa-cc-visa"></i></a></li>
								<li><a href="#"><i class="fa fa-credit-card"></i></a></li>
								<li><a href="#"><i class="fa fa-cc-paypal"></i></a></li>
								<li><a href="#"><i class="fa fa-cc-mastercard"></i></a></li>
								<li><a href="#"><i class="fa fa-cc-discover"></i></a></li>
								<li><a href="#"><i class="fa fa-cc-amex"></i></a></li>
							</ul>-->
							<span class="copyright">
								<!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. -->
								Copyright &copy;<script>document.write(new Date().getFullYear());</script> All rights reserved | Desarollado por <a href="https://github.com/PaulinaMales" target="_blank">Males Paulina</a>
							<!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. -->
							</span>
						</div>
					</div>
						<!-- /row -->
				</div>
				<!-- /container -->
			</div>
			<!-- /bottom footer -->
		</footer>
		<!-- /FOOTER -->

		<!-- jQuery Plugins -->
		<script src="js/jquery.min.js"></script>
		<script src="js/bootstrap.min.js"></script>
		<script src="js/slick.min.js"></script>
		<script src="js/nouislider.min.js"></script>
		<script src="js/jquery.zoom.min.js"></script>
		<script src="js/main.js"></script>
		<script src="consumo/index.js"></script>
<script>
$(document).ready(function () {
    var consumo_api = 'https://mbytesolucionesapi.onrender.com/api/categorias';
    var container = $("#categoriasFooter");

    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: consumo_api,
        success: function (data) {
            if (data.categorias && data.categorias.length > 0) {
                mostrarCategorias(container, data.categorias);
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
});
</script>		
</html>
