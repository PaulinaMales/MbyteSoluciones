
function mostrarMensajeError() {
    var mensaje = document.getElementById('mensajeAlerta');
    mensaje.style.display = 'block';

    // Ocultar el mensaje después de 5 segundos (5000 milisegundos)
    setTimeout(function () {
        mensaje.style.display = 'none';
    }, 8000);
}
