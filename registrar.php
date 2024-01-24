<!DOCTYPE html>
<html lang="en">
<?php include "header.php"; ?>
	<body>
<section class="section">
        <div class="container">
            <div class="row">
			<div class="col-md-6 right-section ">
                    <div class="">
                        <div class="mb-5">
                            <h4 style="text-align:center">¡Bienvenido a <br>Mbyte Soluciones Tecnológicas!</h4>
                        </div>
						<form id="registroForm" class="p-4" style="text-align:center;">
							<div class="alert alert-info" id="mensajeAlerta" style="display:none"></div>

							<div class="form-group">
								<input type="text" class="form-control" name="nombre" id="nombre" placeholder="Nombre" required maxlength="50">
							</div>
							<div class="form-group">
								<input type="text" class="form-control" name="apellido" id="apellido" placeholder="Apellido" required maxlength="50">
							</div>
							<div class="form-group">
								<input type="email" class="form-control" name="email" id="email" placeholder="Correo Electrónico" required maxlength="50">
							</div>
							<div class="form-group">
								<input type="tel" class="form-control" name="telefono" id="telefono" placeholder="Número de Celular" required  maxlength="10" oninput="validarNumeros(this)">
								<!-- La propiedad pattern="\d{10}" indica que se espera un número de 10 dígitos -->
							</div>
							<div class="form-group">
								<input type="text" class="form-control" name="direccion" id="direccion" placeholder="Dirección" required maxlength="100">
							</div>

  <div class="form-group">
    <div class="input-group">
      <input type="password" class="form-control" placeholder="Contraseña" name="password"  id="password" required maxlength="20">
      <div class="input-group-append">
        <button type="button" class="btn btn-outline-secondary" onclick="togglePasswordVisibility('password')">
			<i class="fa fa-eye" aria-hidden="true"></i>
        </button>
      </div>
    </div>
  </div>							
							<div class="checkbox">

							</div>
							<button type="button" class="login-btn" onclick="registraUsuario()">Registrarse</button>
						</form>

                        <div class="p-4" style="text-align:center;">
                            <a class="account">¿Ya tienes una cuenta?</a>
                            <span class="text-muted"><strong> | </strong></span>
                            <a href="login.php" class="forget">Iniciar Sesión</a>
                        </div>
                    </div>
                </div>				
                <div class="col-md-6">
                    <div class="card">
                        <div class="card__side card__side--front card__side--front-1">
                            <div class="card__description">
                            <img class="img-responsive" src="img/register.jpg" alt="Welcome back you've been missed!" width="500px">

                            </div>
                        </div>
                        <div class="card__side card__side--back card__side--back-1">
                            <div class="card__description">
                            <h2 class="p-4" style="color:white; text-align:center">Gracias por unirte a nosotros. Por favor, llene el formulario para crear su cuenta.
                                            Con esto podrá acceder a realizar la compra de su carrito contactándose directamente
                                            con el vendedor de la tienda. Estaremos gustosos de servirle.
                                </h2>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

	
<?php include "footer.php"; ?>
	
<script src="consumo/registrar.js"></script>
<script>
  function togglePasswordVisibility(inputId) {
    var passwordInput = document.getElementById(inputId);
    passwordInput.type = passwordInput.type === "password" ? "text" : "password";
  }
</script>
	</body>
</html>
