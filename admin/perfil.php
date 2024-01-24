<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="icon" href="../img/logo_mbyte.png">
    <title>Administrador</title>
    <!-- Simple bar CSS -->
    <link rel="stylesheet" href="css/simplebar.css">
    <!-- Fonts CSS -->
    <link href="https://fonts.googleapis.com/css2?family=Overpass:ital,wght@0,100;0,200;0,300;0,400;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
    <!-- Icons CSS -->
    <link rel="stylesheet" href="css/feather.css">
    <link rel="stylesheet" href="css/select2.css">
    <link rel="stylesheet" href="css/dropzone.css">
    <link rel="stylesheet" href="css/uppy.min.css">
    <link rel="stylesheet" href="css/jquery.steps.css">
    <link rel="stylesheet" href="css/jquery.timepicker.css">
    <link rel="stylesheet" href="css/quill.snow.css">
    <!-- Date Range Picker CSS -->
    <link rel="stylesheet" href="css/daterangepicker.css">
    <!-- App CSS -->
    <link rel="stylesheet" href="css/app-light.css" id="lightTheme" disabled>
    <link rel="stylesheet" href="css/app-dark.css" id="darkTheme">
      <!-- favicons
    ================================================== -->
    <link rel="shortcut icon" href="../img/logo_mbyte.png" type="image/x-icon">
    <link rel="icon" href="../img/logo_mbyte.png" type="image/x-icon">  
	<script src="consumo/verificarInicioSesion.js"></script>
	
  </head>
  <body class="vertical  dark  ">
    <div class="wrapper">
      <nav class="topnav navbar navbar-light">
        <button type="button" class="navbar-toggler text-muted mt-2 p-0 mr-3 collapseSidebar">
          <i class="fe fe-menu navbar-toggler-icon"></i>
        </button>

        <ul class="nav">
          <li class="nav-item">
            <a class="nav-link text-muted my-2" href="#" id="modeSwitcher" data-mode="dark">
              <i class="fe fe-sun fe-16"></i>
            </a>
          </li>
          <!--<li class="nav-item">
            <a class="nav-link text-muted my-2" href="./#" data-toggle="modal" data-target=".modal-shortcut">
              <span class="fe fe-grid fe-16"></span>
            </a>
          </li>
          <li class="nav-item nav-notif">
            <a class="nav-link text-muted my-2" href="./#" data-toggle="modal" data-target=".modal-notif">
              <span class="fe fe-bell fe-16"></span>
              <span class="dot dot-md bg-success"></span>
            </a>
          </li>-->
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle text-muted pr-0" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <span class="avatar avatar-sm mt-2">
                <img src="./assets/avatars/avatar-1.png" alt="..." class="avatar-img rounded-circle">
              </span>
            </a>
            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
              <a class="dropdown-item" href="perfil.php">Perfil</a>
			  <button class="dropdown-item"  type="button" onclick="cerrarSesion()">Cerrar Sesión</button>
			  </div>
          </li>
        </ul>
      </nav>
      <aside class="sidebar-left border-right bg-white shadow" id="leftSidebar" data-simplebar>
        <a href="#" class="btn collapseSidebar toggle-btn d-lg-none text-muted ml-2 mt-3" data-toggle="toggle">
          <i class="fe fe-x"><span class="sr-only"></span></i>
        </a>
        <nav class="vertnav navbar navbar-light">
          <!-- nav bar -->
          <div class="w-100 mb-4 d-flex">
            <a class="navbar-brand mx-auto mt-2 flex-fill text-center" href="index.html">
              <img src="../img/logo_mbyte.png" alt="" width="50px">
            </a>           
          </div>
          <ul class="navbar-nav flex-fill w-100 mb-2">
            <li class="nav-item dropdown">
              <a class="dropdown-toggle nav-link" href="index.html">
                <i class="fe fe-home fe-16"></i>
                <span class="ml-3 item-text">Dashboard</span>
              </a> 
            </li>           
          </ul>
          <p class="text-muted nav-heading mt-4 mb-1">
            <span>Tienda</span>
          </p>
          <ul class="navbar-nav flex-fill w-100 mb-2">
            <li class="nav-item dropdown">
              <a class="dropdown-toggle nav-link" href="productos.html">
                <i class="fe fe-box fe-16"></i>
                <span class="ml-3 item-text">Productos</span>
              </a> 
            </li>
            <li class="nav-item dropdown">
              <a class="dropdown-toggle nav-link" href="pedidos.html">
                <i class="fe fe-shopping-cart"></i>
                <span class="ml-3 item-text">Pedidos</span>
              </a> 
            </li>   

            <li class="nav-item dropdown">
              <a href="categorias.html"class="dropdown-toggle nav-link">
                <i class="fe fe-clipboard fe-16"></i>
                <span class="ml-3 item-text">Categorías</span>
              </a>
            </li>                    
          </ul>
          <p class="text-muted nav-heading mt-4 mb-1">
            <span>Clientes</span>
          </p>
          <ul class="navbar-nav flex-fill w-100 mb-2">
            <li class="nav-item dropdown">
              <a href="clientes.html" class="dropdown-toggle nav-link">
                <i class="fe fe-user fe-16"></i>
                <span class="ml-3 item-text">Lista Clientes</span>
              </a>
            </li>
            <!--<li class="nav-item w-100">
              <a class="nav-link" href="calendario.html">
                <i class="fe fe-calendar fe-16"></i>
                <span class="ml-3 item-text">Calendario</span>
              </a>
            </li>-->
          </ul>
        </nav>
      </aside>
      <main role="main" class="main-content">
      <div class="container-fluid">
          <div class="row justify-content-center">
            <div class="col-12 col-lg-10 col-xl-8">
              <h2 class="h3 mb-4 page-title">Configuración</h2>
              <div class="my-4">
                <ul class="nav nav-tabs mb-4" id="myTab" role="tablist">
                  <li class="nav-item">
                    <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Perfil</a>
                  </li>

                </ul>
                <form>
                  <div class="row mt-5 align-items-center">
                    <div class="col-md-3 text-center mb-5">
                      <div class="avatar avatar-xl">
                        <img src="./assets/avatars/avatar-1.png" alt="..." class="avatar-img rounded-circle" width="25%">
                      </div>
                    </div>
                    <div class="col">
                      <div class="row align-items-center">
                        <div class="col-md-7">
							<h4 class="mb-1" id="nombreCliente"></h4>
                        </div>
                      </div>
                      <div class="row mb-4">
                        <div class="col-md-7">
                          <p class="text-muted"> Bienvenido a Mbyte Soluciones Tecnológicas, trabajemos juntos!</p>
                        </div>
                        <div class="col">

                        </div>
                      </div>
                    </div>
                  </div>
                  <hr class="my-4">
					<div class="alert alert-info" id="mensajeAlerta" style="display:none"></div>				  
                  <div class="form-row">
                    <div class="form-group col-md-6">
                      <label for="firstname">Nombre</label>
                      <input type="text" id="nombre" class="form-control" placeholder="Brown">
                    </div>
                    <div class="form-group col-md-6">
                      <label for="lastname">Apellido</label>
                      <input type="text" id="apellido" class="form-control" placeholder="Asher">
                    </div>
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
                    <label for="inputAddress5">Teléfono</label>
                    <input type="text" class="form-control" id="telefono" placeholder="P.O. Box 464, 5975 Eget Avenue">
                  </div>
				<button type="button" class="btn btn-primary" onclick="actualizarDatos(event)">Guardar Cambios</button>

                  <hr class="my-4">
					<div class="alert alert-info" id="mensajeAlertaContraseña" style="display:none"></div>				  
                  <div class="row mb-4">
   <div class="col-md-6">
      <div class="form-group">
        <label for="inputPassword4">Contraseña Actual</label>
        <div class="input-group">
          <input type="password" class="form-control" id="contraseniaAntigua">
          <div class="input-group-append">
            <button type="button" class="btn btn-outline-secondary" id="toggleAntiguaBtn">
							<span class="fe fe-eye" aria-hidden="true"></span>
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
							<span class="fe fe-eye" aria-hidden="true"></span>
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
							<span class="fe fe-eye" aria-hidden="true"></span>
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
				<button type="button" class="btn btn-primary" onclick="actualizarPassword(event)">Guardar Cambios</button>
                </form>
              </div> <!-- /.card-body -->
            </div> <!-- /.col-12 -->
          </div> <!-- .row -->
        </div> <!-- .container-fluid -->


      </main> <!-- main -->
    </div> <!-- .wrapper -->
    <script src="js/jquery.min.js"></script>
    <script src="js/popper.min.js"></script>
    <script src="js/moment.min.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script src="js/simplebar.min.js"></script>
    <script src='js/daterangepicker.js'></script>
    <script src='js/jquery.stickOnScroll.js'></script>
    <script src="js/tinycolor-min.js"></script>
    <script src="js/config.js"></script>
    <script src="js/d3.min.js"></script>
    <script src="js/topojson.min.js"></script>
    <script src="js/datamaps.all.min.js"></script>
    <script src="js/datamaps-zoomto.js"></script>
    <script src="js/datamaps.custom.js"></script>
    <script src="js/Chart.min.js"></script>
    <script>
      /* defind global options */
      Chart.defaults.global.defaultFontFamily = base.defaultFontFamily;
      Chart.defaults.global.defaultFontColor = colors.mutedColor;
    </script>
    <script src="js/gauge.min.js"></script>
    <script src="js/jquery.sparkline.min.js"></script>
    <script src="js/apexcharts.min.js"></script>
    <script src="js/apexcharts.custom.js"></script>
    <script src='js/jquery.mask.min.js'></script>
    <script src='js/select2.min.js'></script>
    <script src='js/jquery.steps.min.js'></script>
    <script src='js/jquery.validate.min.js'></script>
    <script src='js/jquery.timepicker.js'></script>
    <script src='js/dropzone.min.js'></script>
    <script src='js/uppy.min.js'></script>
    <script src='js/quill.min.js'></script>
    <script>
      $('.select2').select2(
      {
        theme: 'bootstrap4',
      });
      $('.select2-multi').select2(
      {
        multiple: true,
        theme: 'bootstrap4',
      });
      $('.drgpicker').daterangepicker(
      {
        singleDatePicker: true,
        timePicker: false,
        showDropdowns: true,
        locale:
        {
          format: 'MM/DD/YYYY'
        }
      });
      $('.time-input').timepicker(
      {
        'scrollDefault': 'now',
        'zindex': '9999' /* fix modal open */
      });
      /** date range picker */
      if ($('.datetimes').length)
      {
        $('.datetimes').daterangepicker(
        {
          timePicker: true,
          startDate: moment().startOf('hour'),
          endDate: moment().startOf('hour').add(32, 'hour'),
          locale:
          {
            format: 'M/DD hh:mm A'
          }
        });
      }
      var start = moment().subtract(29, 'days');
      var end = moment();

      function cb(start, end)
      {
        $('#reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
      }
      $('#reportrange').daterangepicker(
      {
        startDate: start,
        endDate: end,
        ranges:
        {
          'Today': [moment(), moment()],
          'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
          'Last 7 Days': [moment().subtract(6, 'days'), moment()],
          'Last 30 Days': [moment().subtract(29, 'days'), moment()],
          'This Month': [moment().startOf('month'), moment().endOf('month')],
          'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
        }
      }, cb);
      cb(start, end);
      $('.input-placeholder').mask("00/00/0000",
      {
        placeholder: "__/__/____"
      });
      $('.input-zip').mask('00000-000',
      {
        placeholder: "____-___"
      });
      $('.input-money').mask("#.##0,00",
      {
        reverse: true
      });
      $('.input-phoneus').mask('(000) 000-0000');
      $('.input-mixed').mask('AAA 000-S0S');
      $('.input-ip').mask('0ZZ.0ZZ.0ZZ.0ZZ',
      {
        translation:
        {
          'Z':
          {
            pattern: /[0-9]/,
            optional: true
          }
        },
        placeholder: "___.___.___.___"
      });
      // editor
      var editor = document.getElementById('editor');
      if (editor)
      {
        var toolbarOptions = [
          [
          {
            'font': []
          }],
          [
          {
            'header': [1, 2, 3, 4, 5, 6, false]
          }],
          ['bold', 'italic', 'underline', 'strike'],
          ['blockquote', 'code-block'],
          [
          {
            'header': 1
          },
          {
            'header': 2
          }],
          [
          {
            'list': 'ordered'
          },
          {
            'list': 'bullet'
          }],
          [
          {
            'script': 'sub'
          },
          {
            'script': 'super'
          }],
          [
          {
            'indent': '-1'
          },
          {
            'indent': '+1'
          }], // outdent/indent
          [
          {
            'direction': 'rtl'
          }], // text direction
          [
          {
            'color': []
          },
          {
            'background': []
          }], // dropdown with defaults from theme
          [
          {
            'align': []
          }],
          ['clean'] // remove formatting button
        ];
        var quill = new Quill(editor,
        {
          modules:
          {
            toolbar: toolbarOptions
          },
          theme: 'snow'
        });
      }
      // Example starter JavaScript for disabling form submissions if there are invalid fields
      (function()
      {
        'use strict';
        window.addEventListener('load', function()
        {
          // Fetch all the forms we want to apply custom Bootstrap validation styles to
          var forms = document.getElementsByClassName('needs-validation');
          // Loop over them and prevent submission
          var validation = Array.prototype.filter.call(forms, function(form)
          {
            form.addEventListener('submit', function(event)
            {
              if (form.checkValidity() === false)
              {
                event.preventDefault();
                event.stopPropagation();
              }
              form.classList.add('was-validated');
            }, false);
          });
        }, false);
      })();
    </script>
    <script>
      var uptarg = document.getElementById('drag-drop-area');
      if (uptarg)
      {
        var uppy = Uppy.Core().use(Uppy.Dashboard,
        {
          inline: true,
          target: uptarg,
          proudlyDisplayPoweredByUppy: false,
          theme: 'dark',
          width: 770,
          height: 210,
          plugins: ['Webcam']
        }).use(Uppy.Tus,
        {
          endpoint: 'https://master.tus.io/files/'
        });
        uppy.on('complete', (result) =>
        {
          console.log('Upload complete! We’ve uploaded these files:', result.successful)
        });
      }
    </script>
    <script src="js/apps.js"></script>
	<script src="../cliente/consumo/perfil.js"></script>
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