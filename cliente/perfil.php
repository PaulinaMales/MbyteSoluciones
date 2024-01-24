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
						<h3 class="breadcrumb-header">PERFIL</h3>
						<ul class="breadcrumb-tree">
							<!--<li><a href="#">Mi Cuenta</a></li>
							<li class="active">Perfil</li>-->
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
    <div class="row">
        <div class="col-xs-12 col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2">
            <div class="my-4">
                <form>
                    <div class="row mt-5">

                        <div class="col">
                            <div class="row">
							<!-- Modal para mensajes exitosos -->
							<div class="modal fade" id="successModal" tabindex="-1" role="dialog" aria-labelledby="successModalLabel" aria-hidden="true">
							  <div class="modal-dialog" role="document">
								<div class="modal-content">
								
								 <!-- <div class="modal-footer">
									<button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
								  </div>-->
								</div>
							  </div>
							</div>
                                <div class="col-md-7">
                                    <h4 class="mb-1" id="nombreCliente"></h4>
                                    <!--<p class="small mb-3"><span class="badge badge-dark">New York, USA</span></p>-->
                                </div>
                            </div>
                            <div class="row mb-4">
                                <div class="col-md-7">
                                    <p class="text-muted"> Estamos contentos de que seas parte de nuestro equipo, mantennos actualizados con tu datos personales 
                                        para brindarte un servicio de calidad, sin inconvenientes. </p>
                                </div>
                                <div class="col">
                                    <div class="col-md-3 text-center mb-5">
                                        <div class="avatar avatar-xl">
                                            <img src="../img/mascota.png" alt="..." class="avatar-img rounded-circle" style="width: 60%;">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr class="my-4">
					<div class="alert alert-info" id="mensajeAlerta" style="display:none"></div>

                    <div class="form-group col-md-6">
                        <label for="firstname">Nombre</label>
                        <input type="text" id="nombre" class="form-control" placeholder="Brown" >
                    </div>
                    <div class="form-group col-md-6">
                        <label for="lastname">Apellido</label>
                        <input type="text" id="apellido" class="form-control" placeholder="Asher">
                    </div>
                    <div class="form-group">
                        <label for="inputEmail4">Email</label>
                        <input type="email" class="form-control" id="inputEmail" placeholder="brown@asher.me" disabled>
                    </div>
                    <div class="form-group">
                        <label for="inputAddress5">Dirección</label>
                        <input type="text" class="form-control" id="direccion" placeholder="P.O. Box 464, 5975 Eget Avenue">
                    </div>
                    <div class="form-group">
                        <label for="inputAddress5">Celular:</label>
                        <input type="text" class="form-control" id="telefono" placeholder="999999999" max="10">
                    </div>					
					<a href="" type="button" class="primary-btn order-submit" onclick="actualizarDatos(event)">Guardar Cambios</a>

                    <hr class="my-4">
					<div class="alert alert-info" id="mensajeAlertaContraseña" style="display:none"></div>

                    <div class="row">
    <div class="col-md-6">
      <div class="form-group">
        <label for="inputPassword4">Contraseña Actual</label>
        <div class="input-group">
          <input type="password" class="form-control" id="contraseniaAntigua">
          <div class="input-group-append">
            <button type="button" class="btn btn-outline-secondary" id="toggleAntiguaBtn">
							<i class="fa fa-eye" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </div>

      <div class="form-group">
        <label for="inputPassword5">Nueva Contraseña</label>
        <div class="input-group">
          <input type="password" class="form-control" id="contraseniaNueva">
          <div class="input-group-append">
            <button type="button" class="btn btn-outline-secondary" id="toggleNuevaBtn">
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
            <button type="button" class="btn btn-outline-secondary" id="toggleConfirmarBtn">
							<i class="fa fa-eye" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
                        <div class="col-md-6">
                            <p class="mb-2">Recomendaciones de Contraseña</p>
                            <p class="small text-muted mb-2"> Para crear una nueva contraseña debe tener en cuenta estas recomendaciones: </p>
                            <ul class="small text-muted pl-4 mb-0">
                                <li>Mínimo 10 carácteres </li>
                                <li>Tener un carácter especial. (*,°,+)</li>
                                <li>Tener al menos un número</li>
								<li>Tener al menos una letra mayuscula</li>
                                <li>No puede ser una contraseña que ya haya utilizado anteriormente.</li>
                            </ul>
                        </div>
                    </div>
					<a href=""  type="button" class="primary-btn order-submit" onclick="actualizarPassword(event)">Guardar Cambios</a>

                    <!--<button type="submit" class="btn btn-primary"></button>-->
                </form>
            </div> <!-- /.card-body -->
        </div> <!-- /.col-xs-12 -->
    </div> <!-- .row -->
</div> <!-- .container -->

		</div>
		<!-- /SECTION -->

		<?php include "footer.php"; ?>
    <script src="consumo/perfil.js"></script>
<!-- ********* VALIDAR CAMPOS ********* -->
<script>
  document.addEventListener("DOMContentLoaded", function () {
    const telefono = document.getElementById("telefono");

    // Almacena el valor original del campo al cargar la página
    const valorOriginal = telefono.value;

    // Agrega un evento de cambio a cada campo
    telefono.addEventListener("change", validarTelefono);

    function validarTelefono(event) {
      const input = event.target;
      const valor = input.value;

      // Expresión regular para validar que solo contiene números y tiene entre 9 y 10 dígitos
      const regex = /^\d{9,10}$/;

      if (!regex.test(valor)) {
        // Muestra un mensaje de error
        alert("El número de teléfono debe contener solo números y tener entre 9 y 10 dígitos.");

        // Restaura el valor original en caso de error
        input.value = valorOriginal;

        // Enfoca el campo para que el usuario pueda corregirlo
        input.focus();
      }
    }
  });
  
        document.getElementById('toggleAntiguaBtn').addEventListener('click', function () {
        togglePasswordVisibility('contraseniaAntigua');
      });

      document.getElementById('toggleNuevaBtn').addEventListener('click', function () {
        togglePasswordVisibility('contraseniaNueva');
      });

      document.getElementById('toggleConfirmarBtn').addEventListener('click', function () {
        togglePasswordVisibility('contraseniaConfirmar');
      });

      function togglePasswordVisibility(inputId) {
        var passwordInput = document.getElementById(inputId);
        passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
      }
</script>



	</body>
</html>
