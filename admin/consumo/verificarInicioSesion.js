function mostrarMensajeAccesoDenegado() {
    // Puedes personalizar el mensaje o redirigir a una página de acceso denegado
    alert('Acceso denegado. Inicia sesión para continuar.');
    
    // Redirigir a la página de inicio de sesión (opcional)
    window.location.href = '../login.php';
}	
function verificarToken() {
    // Obtener el token almacenado en localStorage
    var token = localStorage.getItem('token');
    
    

    // Verificar si el token está presente
    if (!token) {
        // Si no hay token, mostrar un mensaje de acceso denegado
        mostrarMensajeAccesoDenegado();
    }
}

// Llamar a verificarToken al cargar la página
verificarToken();


// CERRAR SESION
function cerrarSesion() {
    // Elimina el token almacenado en localStorage
    localStorage.removeItem('token');

    // Redirige a la página de inicio de sesión
    window.location.href = '../login.php';
}
