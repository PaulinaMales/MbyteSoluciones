<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		 <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->

		<title>Mbyte Soluciones</title>

		<!-- Google font -->
		<link href="https://fonts.googleapis.com/css?family=Montserrat:400,500,700" rel="stylesheet">

		<!-- Bootstrap -->
		<link type="text/css" rel="stylesheet" href="../css/bootstrap.min.css"/>

		<!-- Slick -->
		<link type="text/css" rel="stylesheet" href="../css/slick.css"/>
		<link type="text/css" rel="stylesheet" href="../css/slick-theme.css"/>

		<!-- nouislider -->
		<link type="text/css" rel="stylesheet" href="../css/nouislider.min.css"/>

		<!-- Font Awesome Icon -->
		<link rel="stylesheet" href="../css/font-awesome.min.css">

		<!-- Custom stlylesheet -->
		<link type="text/css" rel="stylesheet" href="../css/style.css"/>
		
		    <!-- favicons
    ================================================== -->
    <link rel="shortcut icon" href="../img/logo_mbyte.png" type="image/x-icon">
    <link rel="icon" href="img/logo_mbyte.png" type="image/x-icon">
	
		<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
		<!--[if lt IE 9]>
		  <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
		  <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
		<![endif]-->
    <!-- CSS
    ==================================================
    <link rel="stylesheet" href="css/glin/main.css"> 
	<link rel="stylesheet" href="css/glin/base.css">
    <link rel="stylesheet" href="css/glin/vendor.css">-->
 
    </head>

	<body>
				<!-- HEADER -->
				<header>
			<!-- TOP HEADER -->
			<div id="top-header">
				<div class="container">
					<ul class="header-links pull-left">
						<li><a href="#"><i class="fa fa-phone"></i> +593 97 894 8486</a></li>
						<li><a href="#"><i class="fa fa-envelope-o"></i>mbytesoluciones@gmail.com</a></li>
						<li><a href="#"><i class="fa fa-map-marker"></i>Quito, Rosa Campuzano y Camilo Guachamín</a></li>
					</ul>
					<ul class="header-links pull-right">
					</ul>
				</div>
			</div>
			<!-- /TOP HEADER -->

			<!-- MAIN HEADER -->
			<div id="header">
				<!-- container -->
				<div class="container">
					<!-- row -->
					<div class="row">
						<!-- NAVIGATION -->
						<nav id="navigation">
							<!-- container 
							<div class="container">-->
								<!-- responsive-nav -->
								<div id="responsive-nav">
									<!-- NAV -->
									<ul class="main-nav nav navbar-nav">
										<li id="index"><a href="index.php">Inicio</a></li>
										<li id="celulares"><a href="celulares.php">Celulares</a></li>
										<li id="pcs"><a href="pcs.php">PC´s</a></li>
										<li id="laptops"><a href="laptops.php">Laptops</a></li>
										<li id="impresoras"><a href="impresoras.php">Impresoras</a></li>
										<li id="accesorios"><a href="accesorios.php">Accesorios</a></li>								
										<li id="servicio_tecnico"><a href="servicio_tecnico.php">Servicio Técnico</a></li>
									
									</ul>
									<!-- /NAV -->
								</div>
								<!-- /responsive-nav -->
							<!--</div>
							 /container -->
						</nav>
						<!-- /NAVIGATION -->

						<!-- ACCOUNT -->
						<div class="col-md clearfix">
							<div class="header-ctn">
								<!-- Wishlist 
								<div>
									<a href="#">
										<i class="fa fa-heart-o"></i>
										<span>Your Wishlist</span>
										<div class="qty">2</div>
									</a>
								</div>-->
								<!-- /Wishlist -->

								<!-- Cart -->
								<div class="dropdown">
									<a class="dropdown-toggle" data-toggle="dropdown" aria-expanded="true">
										<i class="fa fa-shopping-cart"></i>
										<span>Your Cart</span>									</a>
									<div class="cart-dropdown">
										<div class="cart-list">
											<div class="product-widget">
												<div class="product-img">
													<img src="./img/product01.png" alt="">
												</div>
												<div class="product-body">
													<h3 class="product-name"><a href="#">product name goes here</a></h3>
													<h4 class="product-price"><span class="qty">1x</span>$980.00</h4>
												</div>
												<button class="delete"><i class="fa fa-close"></i></button>
											</div>

											<div class="product-widget">
												<div class="product-img">
													<img src="./img/product02.png" alt="">
												</div>
												<div class="product-body">
													<h3 class="product-name"><a href="#">product name goes here</a></h3>
													<h4 class="product-price"><span class="qty">3x</span>$980.00</h4>
												</div>
												<button class="delete"><i class="fa fa-close"></i></button>
											</div>
										</div>
										<div class="cart-summary">
											<small>3 Item(s) selected</small>
											<h5>SUBTOTAL: $2940.00</h5>
										</div>
										<div class="cart-btns">
											<a href="store.php">View Cart</a>
											<a href="checkout.php">Checkout  <i class="fa fa-arrow-circle-right"></i></a>
										</div>
									</div>
								</div>
								<!-- /Cart -->

								<!-- Menu Toogle -->
								<div class="menu-toggle">
									<a href="#">
										<i class="fa fa-bars"></i>
										<span>Menu</span>
									</a>
								</div>
								<!-- /Menu Toogle -->
							</div>
						</div>
						<!-- /ACCOUNT -->
					</div>
					<!-- row -->
				</div>
				<!-- container -->
			</div>
			<!-- /MAIN HEADER -->
		</header>
		<!-- /HEADER -->

	<script>

		//Cambia la clase active segun la pestaña que escoja		
		// Obtiene la URL actual
		var currentUrl = window.location.href;

		// Verifica si la URL termina en una barra inclinada
		if (currentUrl.endsWith("/")) {
			// Si termina en una barra inclinada, agrega la clase "active" al enlace de inicio
			document.getElementById("index").classList.add("active");
		} else {
			// Verifica qué página está abierta y establece la clase "active" en el elemento correspondiente
				if (currentUrl.indexOf("index.php") !== -1) {
			// Si "index.php" está en la URL, el método indexOf devuelve el índice donde comienza "index.php" en la URL.
			// Si no se encuentra, devuelve -1. Entonces, si no es -1, significa que "index.php" está en la URL actual.
			document.getElementById("index").classList.add("active"); // Agrega la clase "active" al elemento con id "inicio
				} else if (currentUrl.indexOf("celulares.php") !== -1) {
					document.getElementById("celulares").classList.add("active");
				}else if (currentUrl.indexOf("pcs.php") !== -1) {
					document.getElementById("pcs").classList.add("active");
				}else if (currentUrl.indexOf("laptops.php") !== -1) {
					document.getElementById("laptops").classList.add("active");
				}else if (currentUrl.indexOf("impresoras.php") !== -1) {
					document.getElementById("impresoras").classList.add("active");
				}else if (currentUrl.indexOf("servicio_tecnico.php") !== -1) {
					document.getElementById("servicio_tecnico").classList.add("active");
				}else if (currentUrl.indexOf("accesorios.php") !== -1) {
					document.getElementById("accesorios").classList.add("active");
				}
		}

	</script>

	</body>
</html>


