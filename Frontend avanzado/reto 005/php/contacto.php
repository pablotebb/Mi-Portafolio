<?php

//----- Validar datos--------------------

// Inicializar errores y valores
$errores = [];
$datos = [
  'nombre' => '',
  'correo' => '',
  'asunto' => '',
  'mensaje' => ''
];

// Validamos el formulario enviado
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Validar nombre
    if (empty($_POST['nombre'])) {
        $errores['nombre'] = 'El nombre es obligatorio.';
    } else {
        $datos['nombre'] = htmlspecialchars($_POST['nombre']);
    }
    // Validar correo electrónico
    if (empty($_POST['correo'])) {
        $errores['correo'] = 'El correo electrónico es obligatorio.';
    } elseif (!filter_var($_POST['correo'], FILTER_VALIDATE_EMAIL)) {
        $errores['correo'] = 'El correo electrónico no es válido.';
    } else {
        $datos['correo'] = htmlspecialchars($_POST['correo']);
    }
    // Validar asunto
    if (empty($_POST['asunto'])) {
        $errores['asunto'] = 'El asunto es obligatorio.';
    } else {
        $datos['asunto'] = htmlspecialchars($_POST['asunto']);
    }
    // Validar comentario (opcional)
    $datos['mensaje'] = htmlspecialchars($_POST['mensaje']);
     
    // Si no hay errores, mostrar los datos enviados
    if (empty($errores)) {
        echo '<h2>Datos recibidos:</h2>';
        echo '<ul>';
        foreach ($datos as $campo => $valor) {
            echo '<li><strong>' . ucfirst(str_replace('_', ' ', $campo)) . ':</strong> ' . $valor . '</li>';
        }
        echo '</ul>';
    } else {
        // Mostrar errores
        echo '<h2>Errores encontrados:</h2>';
        echo '<ul>';
        foreach ($errores as $error) {
            echo '<li>' . $error . '</li>';
        }
        echo '</ul>';
    }
}

function mandarEmail($to, $subject, $message, $headers) {
  // Enviar el correo electrónico
  if (mail($to, $subject, $message, $headers)) {
    echo "El correo electrónico fue enviado correctamente.";
  } else {
    echo "Hubo un error al enviar el correo electrónico.";
  }
}

// Usar función mail de php (Procesar datos del formulario y enviar a dirección email)
// Configurar SMTP dinámicamente
ini_set("SMTP", "smtp.gmail.com");
ini_set("smtp_port", "587");
ini_set("sendmail_from", "pablotebb@gmail.com");

// Enviar el correo
$to = "pablotebb@hotmail.com";
$subject = "Prueba de correo";
$message = "Este es un correo de prueba.";
$headers = "From: pablotebb@gmail.com";

mandarEmail($to, $subject, $message, $headers);



// Recuerda:
// Código organizado
// Manejar errores
// Garantizar seguridad
// Mejorar rendimiento
// Realizar muchas pruebas 