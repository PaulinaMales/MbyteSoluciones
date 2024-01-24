<!DOCTYPE html>
<html lang="en">
<?php include "header.php"; ?>

<style>
.ghost {
  animation: float 3s ease-out infinite;
}

@keyframes float {
  50% {
     transform: translate(0, 20px);
  }
}
.shadowFrame {
  /*width: 130px;*/
  margin-top: 15px;
}
.shadow {
  animation: shrink 3s ease-out infinite;
  transform-origin: center center;
  ellipse {
    transform-origin: center center;
  }
}

@keyframes shrink {
  0% {
    width: 90%;
    margin: 0 5%;
  }
  50% {
    width: 60%;
    margin: 0 18%;
  }
  100% {
    width: 90%;
    margin: 0 5%;
  }
}



</style>
	<body>
		<!-- NEWSLETTER -->
		<div id="newsletter" class="section">
			<!-- container -->
			<div class="container">
				<!-- row -->
				<div class="row">
					<div class="col-md-12">
						<div class="newsletter">
							<p>CREACIÓN DE <strong>NUEVA CONTRASEÑA</strong></p>

							<p>Para crear una nueva contraseña ingrese<br>el código que fue enviado a su email. </p>
	
							<form>
							<div class="alert alert-info" id="mensajeAlerta" style="display:none"></div>

								<input class="input" type="text" placeholder="Ingrese su código" id="codigo">
								<button class="newsletter-btn" onclick="" type="button">Verificar</button>
							</form>

						</div>
					</div>
				</div>
				<!-- /row -->
			</div>
			<!-- /container -->
		</div>
		<!-- /NEWSLETTER -->
			
		<?php include "footer.php"; ?>
		
	<script src="consumo/recuperarPassword.js"></script>
	</body>
</html>

