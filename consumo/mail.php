<?php

/*if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Recibir datos del formulario
    $nombre = $_POST['nombre'];
    $email = $_POST['email'];
    $mensaje = $_POST['mensaje'];

    // Configurar destinatario y asunto
    $destinatario = "mbytesoluciones@gmail.com";
    $asunto = "Nuevo mensaje de contacto de $nombre";

    // Construir el cuerpo del correo
    $cuerpoCorreo = "Nombre: $nombre\n";
    $cuerpoCorreo .= "Correo Electrónico: $email\n\n";
    $cuerpoCorreo .= "Mensaje:\n$mensaje";

    // Cabeceras del correo
    $cabeceras = "From: $email\r\n";
    $cabeceras .= "Reply-To: $email\r\n";
    $cabeceras .= "X-Mailer: PHP/" . phpversion();

    // Enviar el correo
    if (mail($destinatario, $asunto, $cuerpoCorreo, $cabeceras)) {
        // Éxito
        echo json_encode(["status" => "success", "message" => "¡Correo enviado con éxito!"]);
    } else {
        // Error
        echo json_encode(["status" => "error", "message" => "Error al enviar el correo"]);
    }
} else {
    // Método de solicitud incorrecto
    echo json_encode(["status" => "error", "message" => "Método de solicitud incorrecto"]);
}*/
$name = strip_tags(trim($_POST["nombre"]));
$email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
$message = trim($_POST["mensaje"]);

if (empty($name) || empty($message) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(["error" => "Por favor completa el formulario e intenta nuevamente", "type" => "form"]);
} else {
    $recipient = "pmales@binary.ec";
    //$recipient = "info@istici.edu.ec";
    $subject = "Mensaje desde la WEB $name";
    $email_content = "Nombre: $name \n";
    $email_content .= "Email: $email\n";
    $email_content .= "Mensaje:\n$message\n";
    $email_headers = "From: $name <$email>\r\n";
    $email_headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    if (@mail($recipient, $subject, $email_content, $email_headers)) {
        http_response_code(200);
        echo json_encode(["success" => "Mensaje Enviado!"]);
    } else {
        http_response_code(500);
        echo json_encode(["error" => "Oops! No se pudo enviar tu mensaje", "type" => "unknown"]);
    }
}
?>
