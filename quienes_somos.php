<!DOCTYPE html>
<html lang="en">
<?php include "header.php"; ?>
	<body>


		<!-- SECTION -->
		<section class="bg-light section">
    <div class="container">
        <div class="row justify-content-md-center">

			<div class="col-md-6 ">
			 <img class="img-responsive" src="img/casa.png" alt="Welcome back you've been missed!" width="500px">

			</div>
                <div class="col-md-6 right-section multicolor-linear">
                    <div >
                        <div class="mb-5">
                            <h4 style="text-align:center">¡Bienvenido a <br>Mbyte Soluciones Tecnológicas!</h4>
                        </div>

						<div class="mb-5" style="text-align:justify">
                            <p>Mbyte Soluciones Tecnológicas es una innovadora empresa fundada a finales de 2020 en respuesta al creciente requisito de dispositivos electrónicos para continuar con las operaciones empresariales y académicas en línea, una necesidad exacerbada por la pandemia global. Nuestro compromiso es proporcionar soluciones informáticas integrales al mejor precio del mercado, adaptadas a estudiantes, profesionales, empresarios y amantes de los videojuegos.</p>
							<p>Nos especializamos en ofrecer una amplia gama de productos y servicios, desde insumos informáticos hasta equipos especializados para gaming. Además, brindamos servicios de soporte técnico, mantenimiento y actualización para computadoras de escritorio, laptops y otros dispositivos electrónicos.</p>
						</div>
                    </div>
                </div>			

	
		</div>
        	<div class="row justify-content-md-center">

				<div class="col-md-6 right-section">
					<div >
						<div class="mb-5" style="text-align:justify">
							<p>En Mbyte Soluciones Tecnológicas, creemos en la importancia de la tecnología como motor de cambio y progreso. Estamos comprometidos con nuestro objetivo de ser líderes en el suministro de tecnología, y trabajamos incansablemente para hacer posible una experiencia digital sin complicaciones para todos nuestros cliente</p>
							<p>Nos esforzamos por satisfacer las necesidades tecnológicas de diversas entidades, incluyendo empresas públicas y privadas, así como personas particulares y familias. Estamos dedicados a modernizar la comunicación en esta nueva era digital, proporcionando soluciones tecnológicas de calidad que impulsan el progreso y la eficiencia en todos los ámbitos.</p>
            <br>
							<!-- Skill Bars -->
							<span>Confiabilidad</span>
							<div class="progress skill-bar ">
								<div class="progress-bar progress-bar-primary" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">									
								</div>
							</div>              
							<span>Atencion Personalizada</span>     
							<div class="progress skill-bar">
								<div class="progress-bar progress-bar-primary" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" >
									
								</div>
							</div>
							<span>Calidad</span>
							<div class="progress skill-bar">
								<div class="progress-bar progress-bar-primary" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">    
								</div>
							</div>    
						
							<span>Experiencia</span>
							<div class="progress skill-bar">
								<div class="progress-bar progress-bar-primary" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">
								</div>
							</div>              
						</div>
                    </div>
				</div>
                <div class="col-md-6 right-section">
					<img class="img-responsive" src="img/quienes_somos.jpg" alt="Welcome back you've been missed!" width="500px">
                </div>				
			</div>		
    </div>
</section>
		<!-- /SECTION -->

		<?php include "footer.php"; ?>
	</body>
	<script>
	    // Progress bars
		$(document).ready(function() {
      $('.progress .progress-bar').css("width",
                function() {
                    return $(this).attr("aria-valuenow") + "%";
                }
        )
    });	
	</script>	
</html>
