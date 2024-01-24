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
						<h3 class="breadcrumb-header">Cliente</h3>
						<ul class="breadcrumb-tree">
							<li><a href="#">Inicio</a></li>
							<li class="active">Historial de Compras</li>
						</ul>
					</div>
				</div>
				<!-- /row -->
			</div>
			<!-- /container -->
		</div>
		<!-- /BREADCRUMB -->
<!--<div class="container">
    <div class="row">
        <div class="col-md-4">
            <input type="date" id="fechaBusqueda" class="form-control">
        </div>
        <div class="col-md-2 mt-4">
            <button class="btn btn-primary" onclick="buscarPorFecha()">Buscar</button>
        </div>
    </div>
</div>-->	
		<!-- HOT DEAL SECTION -->
		<div  class="section">
			<!-- container -->
			<div class="container">
				<!-- row -->
				<div class="row">
					<div class="col-md-12" style="background:aliceblue">
						<div class="hot-deal">
							<p>Tu pedido será atendido dentro de las próximas</p>
							<h2 class="text-uppercase">24 Horas</h2>							
							</div>
					</div>
				</div>
				<!-- /row -->
			</div>
			<!-- /container -->
		</div>
		<!-- /HOT DEAL SECTION -->
		<!-- Buscador por Fecha -->
		<div class="container">
			<div class="row">
				<div class="col-md-4">
					<label for="fechaInicio">Fecha de Inicio:</label>
					<input type="date" id="fechaInicio" class="form-control">
				</div>
				<div class="col-md-4">
					<label for="fechaFin">Fecha de Fin:</label>
					<input type="date" id="fechaFin" class="form-control">
				</div>
				<div class="col-md-2 mt-4" style="margin-top: 2.5%;">
					<button class="btn btn-primary" onclick="buscarPorFecha()">Buscar</button>
				</div>
			</div>
		</div>	
		<!-- Buscador por Fecha  -->
		<!-- SECTION -->
		<div class="section">
			<!-- container -->
			<div class="container">
				<div class="table-responsive">

					<table class="table table-hover" id="tabla_pedidos">
						<thead>
							<tr>
								<th>Nro Pedido</th>
								<th>Estado</th>
								<th>Fecha</th>
								<th>Detalles</th>
							</tr>
						</thead>
						<tbody>	
							<!-- Aquí se llenarán dinámicamente las filas de la tabla -->						
						</tbody>
					</table>
				</div>
			</div>
			<!-- /container -->
		</div>
		<!-- /SECTION -->


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
						<div class="order-products" id="pdfContent">
							<table class="table table-bordered">
								<thead>
									<tr>
										<th>Unidades</th>
										<th>Productos</th>
										<th>Pre Unit</th>
										<th>Total</th>
									</tr>
								</thead>
								<tbody id="orderPedidoTable">
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
								<p style="color:red"></p>
							</div>
						</div>
						<!-- /Shiping Details -->
						<!-- Order notes -->
						<div class="order-notes">
							<div><strong>Observación</strong></div>
							<p>Especifíque una dirección, detalle o duda que tenga sobre la compra o el valor a pagar.</p>
								<textarea class="input" placeholder="Order Notes" id="observacion" disabled></textarea>
						</div>
						<!-- /Order notes -->

						<div class="payment-method">
							<div><strong>Forma de pago</strong></div>

								<div class="radio">
									<label>
										<input type="radio" name="optradio" id="transferencia" disabled>
										Transferencia Bancaria
									</label>							
								</div>
								<div class="radio">
									<label>
										<input type="radio" name="optradio" id="efectivo" disabled>
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
				<button type="button"  class="btn btn-primary" data-toggle="modal" id="descargarPDF">Descargar</button>				

				<a href="https://wa.link/kufu4u" target="_blank" class="btn btn-success" >Envíar <i class="fa fa-commenting-o"></i></a>
				<!--<a href="https://wa.link/si7xv6" target="_blank" class="btn btn-success" >Envíar <i class="fa fa-commenting-o"></i></a>-->
			
			</div>
		</div>

	</div>
</div>		

		<?php include "footer.php"; ?>
  <script src="consumo/pedido.js"> </script>
  
		<script>
			function buscarPorFecha() {
				// Obtener los valores de las fechas de inicio y fin
				const fechaInicio = document.getElementById('fechaInicio').value;
				const fechaFin = document.getElementById('fechaFin').value;

				// Obtener todas las filas de la tabla
				const filas = document.querySelectorAll('.table tbody tr');

				// Iterar sobre las filas y mostrar/ocultar según el rango de fechas
				filas.forEach(fila => {
					const fechaFila = fila.querySelector('td:nth-child(3)').innerText;

					// Mostrar la fila si la fecha está dentro del rango, o mostrar todas las filas si no hay rango de fechas
					fila.style.display = (estaEnRango(fechaFila, fechaInicio, fechaFin) || !fechaInicio || !fechaFin) ? '' : 'none';
				});
			}

			function estaEnRango(fecha, fechaInicio, fechaFin) {
				if (!fechaInicio && !fechaFin) {
					// Si no hay fechas de inicio ni fin, considerar que está en rango
					return true;
				}

				if (fechaInicio && !fechaFin) {
					// Si solo hay fecha de inicio, considerar que está en rango si es igual o después de la fecha de inicio
					return fecha >= fechaInicio;
				}

				if (!fechaInicio && fechaFin) {
					// Si solo hay fecha de fin, considerar que está en rango si es igual o antes de la fecha de fin
					return fecha <= fechaFin;
				}

				// Si hay ambas fechas, considerar que está en rango si es igual o después de la fecha de inicio y antes o igual a la fecha de fin
				return fecha >= fechaInicio && fecha <= fechaFin;
			}
		</script>
	</body>
</html>
