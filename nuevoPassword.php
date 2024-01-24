
<?php
// Obtener el ID de la categoría de la URL
$tokenPassword = isset($_GET['token']) ? $_GET['token'] : null;
?>
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
							<p>Ingresa tu  <strong>nueva contraseña</strong></p>
						<img src="img/login_logo.jpg" width="25%" style="margin:10px">

						<p style="font-size:20px"> Para crear una nueva contraseña debe <br> tener en cuenta estas recomendaciones:</p>
				<form>
					<div class="row" style="text-align:left">
							<div class="alert alert-info" id="mensajeAlerta" style="display:none"></div>					
<div class="col-md-6">
  <div class="form-group">
    <label for="inputPassword5">Nueva Contraseña</label>
    <div class="input-group">
      <input type="password" class="form-control" id="contraseniaNueva">
      <div class="input-group-append">
        <button type="button" class="btn btn-outline-secondary" onclick="togglePasswordVisibility('contraseniaNueva')">
							<i class="fa fa-eye" aria-hidden="true"></i>
        </button>
      </div>
    </div>
  </div>

  <div class="form-group">
    <label for="inputPassword6">Confirmar Contraseña</label>
    <div class="input-group">
      <input type="password" class="form-control" id="contraseniaConfirmar">
      <div class="input-group-append">
        <button type="button" class="btn btn-outline-secondary" onclick="togglePasswordVisibility('contraseniaConfirmar')">
							<i class="fa fa-eye" aria-hidden="true"></i>
        </button>
      </div>
    </div>
  </div>
</div>
						<br>
						<div class="col-md-6">
							<ul class="small text-muted pl-4 mb-0">
                                <li>Mínimo 10 carácteres </li>
                                <li>Tener un carácter especial. (*,°,+)</li>
                                <li>Tener al menos un número</li>
								<li>Tener al menos una letra mayuscula</li>
                                <li>No puede ser una contraseña que ya haya utilizado anteriormente.</li>
							</ul>
						</div>
					</div>
                    <button type="button" class="primary-btn order-submit" onclick="nuevoPassword('<?php echo $tokenPassword ?>')">Guardar</button>
				</form>
                      <!--<button type="button" class="btn mb-2 btn-outline-secondary" data-toggle="modal" data-target="#successModal" data-whatever="@mdo">Open modal</button>-->
						</div>
					</div>
				</div>
				<!-- /row -->
			</div>
			<!-- /container -->
		</div>
		<!-- Modal para mensajes exitosos -->
		<div class="modal fade" id="successModal" tabindex="-1" role="dialog" aria-labelledby="successModalLabel" aria-hidden="true">
		  <div class="modal-dialog" role="document">
			<div class="modal-content">
			  <div class="modal-header">
				<h5 class="modal-title" id="successModalLabel">¡Éxito!</h5>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
				  <span aria-hidden="true">&times;</span>
				</button>
			  </div>
			  <div class="modal-body">
				<p id="mensaje"></p>
			  </div>
			 <!-- <div class="modal-footer">
				<button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
			  </div>-->
			</div>
		  </div>
		</div>
		<!-- /NEWSLETTER -->
			
		<?php include "footer.php"; ?>
		
		<script src="consumo/recuperarPassword.js"></script>
<script>
  function togglePasswordVisibility(inputId) {
    var passwordInput = document.getElementById(inputId);
    passwordInput.type = passwordInput.type === "password" ? "text" : "password";
  }
</script>
	</body>
</html>
