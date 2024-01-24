<!DOCTYPE html>

<html lang="en">
<?php include "header.php"; ?>
<style>
.btn-type {
  position: relative;
  border: 1px solid #E7E7E7;
  text-align: left;
  background-color: #F9F9F9;
  padding: 16px 34px 16px 21px;
  border-radius: 4px;
  overflow: hidden;
  line-height: 1.4;
  color: #4A4A4A;
  max-width: 230px;
  font-size: 16px;
  cursor: pointer;
}
.btn-type:nth-of-type(3):before {
  background-color: #F28F00;
}
.btn-type:nth-of-type(4):before {
  background-color: #3FB4E5;
}
.btn-type:before {
  content: "";
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 7px;
  height: 100%;
  background-color: #71B74C;
  transition: all 0.25s cubic-bezier(0.47, 1.01, 0.75, 0.97);
}

.btn-type:hover span {
  color: white;
  transition: all 0.25s cubic-bezier(0.47, 1.01, 0.75, 0.97);
  z-index: 2;
  position: relative;
}

.btn-type:hover:before {
  width: 100%;
  transition: all 0.25s cubic-bezier(0.7, 1.01, 0.75, 0.97);
}

.btn-group {
display: flex;
justify-content: space-between; /* Alinea los botones horizontalmente con espacio entre ellos */
margin-bottom: 20px; /* Ajusta el margen inferior según sea necesario */
}

.btn-type {
flex: 1; /* Distribuye el espacio de manera uniforme entre los botones */
}


.ajustar{
	height:60px
}
@media only screen and (max-width: 600px) {
  .btn-group{
    display:grid
  }
}
</style>
<style>

</style>

	<body>
		<!-- BREADCRUMB -->
		<div id="breadcrumb" class="section">
			<!-- container -->
			<div class="container">
				<!-- row -->
				<div class="row">
					<div class="col-md-12">
						<h3 class="breadcrumb-header">Cliente</h3>
						<ul class="breadcrumb-tree">
							<li><a href="index.php">Inicio</a></li>
							<li class="active">Carrito de compras</li>
						</ul>
					</div>
				</div>
				<!-- /row -->
			</div>
			<!-- /container -->
		</div>
<div class="container">
  <div class="btn-group">
    <a class="btn-type"><img src="../img/uno.png" width="35" style="position:relative; margin:10px"><span class="ajustar" > Agrega productos a tu carrito</span></a>
    <a class="btn-type"><img src="../img/dos.png" width="35" style="position:relative; margin:10px"><span class="ajustar" > Genera el pedido con las opciones disponibles</span></a>
    <a class="btn-type"><img src="../img/tres.png" width="35" style="position:relative; margin:10px"><span class="ajustar" > Finaliza el pedido del carrito</span></a>
    <a class="btn-type"><img src="../img/cuatro.png" width="35" style="position:relative; margin:10px"><span class="ajustar" > Descarga el PDF en la sección "Mis compras" y envíalo via WhattsApp</span></a>
  </div>

  <!-- row -->
  <div class="row">
    <div class="col-md-4">
    </div>
    <!-- Order Details -->
    <div class="col-md-4" style="margin-top:20px">
      <button onclick="mostrarCarritoDetalles()" class="primary-btn order-submit" data-toggle="modal" data-target="#checkModal">Generar Comprobante</button>
    </div>
    <!-- /Order Details -->
  </div>
  <!-- /row -->
</div>

		<!-- /BREADCRUMB -->

		<!-- SECTION -->
		<div class="section" style="margin-top:20px; padding:5%">		
			<!-- container -->
			<div class="container">
				<div class="alert alert-danger" id="mensajeAlerta" style="display:none"></div>
			
				<div class="table-responsive">
					<table class="table table-hover" id="tabla_carrito_detalles">
					<thead>
							<tr>
								<th>Producto</th>
								<th>Imagen</th>
								<th>Cantidad</th>
								<th>Precio Unidad</th>
								<th>Precio Total</th>
								<th>Acciones</th>
							</tr>
						</thead>
						<tbody>
						<!-- Aquí iran apareciendo dinamicamente los productos que agrege al carrito -->
						
						</tbody>
					</table>
				</div>
			</div>
			<!-- /container -->
		</div>
		<!-- /SECTION -->

		<?php include "footer.php"; ?>

<!-- Modal -->
<div id="checkModal" class="modal fade" role="dialog">
	<div class="modal-dialog">

		<!-- Modal content-->
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">×</button>
				<h4 class="modal-title">Detalles Carrito</h4>
			</div>
			<div class="modal-body" id="modal-body">

				<!-- Order Details -->
				<div class="">
					<div class="section-title text-center">
						<h3 class="title">Tu Orden</h3>
					</div>
					<div class="order-summary">
						<div class="order-products" >
							<table class="table table-bordered">
								<thead>
									<tr>
										<th>Unidades</th>
										<th>Productos</th>
										<th>Pre Unit</th>
										<th>Total</th>
									</tr>
								</thead>
								<tbody id="orderProductsTableBody">
									<!-- Aquí se llenarán dinámicamente las filas de la tabla -->
								</tbody>
							</table>
						</div>

						<hr>
						<!-- Shiping Details -->
						<div class="shiping-details">
								<div><strong>¿Desea con Envío a Domicilio?</strong></div>
							<div class="checkbox">
								<label>
								<input type="checkbox" id="direccionCheckbox"> Sí deseo.
								</label>
							</div>
							<div id="hiddenText">
								<p style="color:red">Tomar en cuenta que el envío a domicilio tiene un valor extra dependiendo del lugar a donde se 
										necesite el envío. El valor se coordinará con el Administrador vía WhatsApp</p>
							</div>
						</div>
						<!-- /Shiping Details -->
						<!-- Order notes -->
						<div class="order-notes">
							<div><strong>Observación</strong></div>
							<p>Especifíque una dirección, detalle o duda que tenga sobre la compra o el valor a pagar.</p>
								<textarea class="input" placeholder="Order Notes" id="observacion"></textarea>
						</div>
						<!-- /Order notes -->

						<div class="payment-method">
							<div><strong>Forma de pago</strong></div>

								<div class="radio">
									<label>
										<input type="radio" name="optradio" id="transferencia">
										Transferencia Bancaria
									</label>							
								</div>
								<div class="radio">
									<label>
										<input type="radio" name="optradio" id="efectivo" >
										Pago en Efectivo
									</label>							
								</div>
						</div>
						<hr>
						<div class="order-col">
							<div><strong>TOTAL</strong></div>
							<div><strong class="order-total"></strong></div>
						</div>						
					</div>
				</div>		
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
					<!--<button type="button" class="btn btn-primary" data-dismiss="modal">Descargar</button>-->				
					<button type="button"  class="btn btn-primary" data-toggle="modal" data-target="#modalAviso">Finalizar Compra</button>				
				</div>
			</div>
		</div>
	</div>	
</div>
<!-- Modal -->
<div id="modalAviso" class="modal fade" role="dialog">
  <div class="modal-dialog">

    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title">Finalizar Pedido<i class="fa fa-shopping-cart"></i> </h4>
      </div>
      <div class="modal-body">
        <p>Una vez que finalice el pedido su carrito pasará a proceso de pago y ya no podrá
		modificarlo más, se generará un PDF con la información de su pedido que podrá <strong>descargar</strong> 
		en la sección <strong>Mis compras</strong> para envíarselo al Administrador y realizar el pago. </p>
      </div>
      <div class="modal-footer">
       <button type="button" class="btn btn-success"onclick="crearPedido()" >Finalizar</button>
		<button type="button" class="btn btn-warning" data-dismiss="modal">Cancelar</button>

      </div>
    </div>

  </div>
</div>	
	<!-- Modal para mensajes exitosos -->
	<div class="modal fade" id="successModal" tabindex="-1" role="dialog" aria-labelledby="successModalLabel" aria-hidden="true">
	  <div class="modal-dialog" role="document">
		<div class="modal-content">
		  <div class="modal-header">
			<h5 class="modal-title" id="titulo"></h5>
			<button type="button" class="close" data-dismiss="modal" aria-label="Close">
			  <span aria-hidden="true">&times;</span>
			</button>
		  </div>
		  <div class="modal-body">
			<p id="mensaje"></p>
		  </div>
		 <!-- --><div class="modal-footer">
			<button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
		  </div>
		</div>
	  </div>
	</div> 		
	
  <script src="consumo/carrito.js"> </script>		
<script src="consumo/pedido.js"> </script>
 <script>
    $(document).ready(function(){
      // Ocultar el texto al cargar la página
      $("#hiddenText").hide();

      $("#direccionCheckbox").change(function() {
        if(this.checked) {
          $("#hiddenText").show();
        } else {
          $("#hiddenText").hide();
        }
      });
    });

$('.js-slideToggle').on('click',function(){
  $('.slide__item').toggleClass('enter')
}); 

$('.js-errorToggle').on('click',function(){
  $('.textInput__error').toggleClass('textInput__error--isShow');
  $('.textInput__form').toggleClass('textInput__form--onError');
});

$('.dropdown__trigger').on('click',function(){
  $('.dropdown').toggleClass('dropdown--active');
});
</script> 

	</body>
</html>
