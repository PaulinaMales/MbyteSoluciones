

<!DOCTYPE html>
<html lang="en">
<?php include "header.php"; ?>

<body>
  <!-- Login 8 - Bootstrap Brain Component -->
  <section class="bg-light section">
    <div class="container">
      <div class="row">
        <div class="col-md-6 left-section-login">
          <!-- Contenido de la sección izquierda -->
        </div>
        <div class="col-md-6 text-center">
          <div class="">
            <div>
              <br><br>
              <div class="mb-5">
                <h4 class="p-3">¡Bienvenido de nuevo, te hemos extrañado!</h4>
              </div>

              <div class="p-3">
                <img src="img/key.png" width="50">
                <p class="mb-1">Ingresa tus credenciales para poder Iniciar Sesión</p>
              </div>
              <form action="" class="p-4" method="post">
					<div class="alert alert-danger" id="mensajeAlerta" style="display:none"></div>

					<div class="form-group">
					  <input type="email" class="form-control" name="email" id="email" placeholder="Email" required>
					</div>
					<div class="form-group">
					  <div class="input-group">
						<input type="password" class="form-control" name="password" id="password" placeholder="Password" required>
						<div class="input-group-append">
						  <button type="button" class="btn btn-outline-secondary" id="togglePasswordBtn">
							<i class="fa fa-eye" aria-hidden="true"></i>
						  </button>
						</div>
					  </div>
					</div>
					<div class="checkbox">
					  <br>
					</div>
						<button type="button" class="login-btn cta-btn " onclick="iniciarSesion()">Iniciar Sesión</button>
				</form>
				<div class="p-4 ">
					<a href="registrar.php" class="account">Crear una cuenta</a>
					<span class="text-muted"> <strong>| </strong></span>
					<a href="recuperarPassword.php" class="forget">Olvidé la contraseña</a>
				</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <?php include "footer.php"; ?>
  <script src="consumo/login.js"></script>
  <script>
    document.getElementById('togglePasswordBtn').addEventListener('click', function () {
      var passwordInput = document.getElementById('password');
      passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
    });
  </script>
</body>

</html>
