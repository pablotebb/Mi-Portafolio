<?php
// Inicializar variables y errores
$errores = [];
$datos = [
    'nombre' => '',
    'apellido_1' => '',
    'apellido_2' => '',
    'email' => '',
    'telefono' => '',
    'altura' => '',
    'peso' => '',
    'anchuraPecho' => '',
    'anchuraCintura' => '',
    'anchuraCaderas' => '',
    'fotoCuerpo' => '',
    'direccionEnvio' => '',
    'comentario' => '',
    'metodo_pago' => ''
];

// Validar el formulario cuando se envíe
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Validar nombre
    if (empty($_POST['nombre'])) {
        $errores['nombre'] = 'El nombre es obligatorio.';
    } else {
        $datos['nombre'] = htmlspecialchars($_POST['nombre']);
    }

    // Validar apellidos
    if (empty($_POST['apellido_1'])) {
        $errores['apellido_1'] = 'El primer apellido es obligatorio.';
    } else {
        $datos['apellido_1'] = htmlspecialchars($_POST['apellido_1']);
    }

    if (empty($_POST['apellido_2'])) {
        $errores['apellido_2'] = 'El segundo apellido es obligatorio.';
    } else {
        $datos['apellido_2'] = htmlspecialchars($_POST['apellido_2']);
    }

    // Validar correo electrónico
    if (empty($_POST['email'])) {
        $errores['email'] = 'El correo electrónico es obligatorio.';
    } elseif (!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
        $errores['email'] = 'El correo electrónico no es válido.';
    } else {
        $datos['email'] = htmlspecialchars($_POST['email']);
    }

    // Validar teléfono
    if (empty($_POST['telefono'])) {
        $errores['telefono'] = 'El teléfono es obligatorio.';
    } elseif (!preg_match('/^\d{9}$/', $_POST['telefono'])) {
        $errores['telefono'] = 'El teléfono debe tener 9 dígitos.';
    } else {
        $datos['telefono'] = htmlspecialchars($_POST['telefono']);
    }

    // Validar campos numéricos
    $campos_numericos = ['altura', 'peso', 'anchuraPecho', 'anchuraCintura', 'anchuraCaderas'];
    foreach ($campos_numericos as $campo) {
        if (empty($_POST[$campo])) {
            $errores[$campo] = ucfirst(str_replace('_', ' ', $campo)) . ' es obligatorio.';
        } elseif (!is_numeric($_POST[$campo])) {
            $errores[$campo] = ucfirst(str_replace('_', ' ', $campo)) . ' debe ser un número válido.';
        } else {
            $datos[$campo] = htmlspecialchars($_POST[$campo]);
        }
    }

    // Validar la foto del cuerpo
    if (empty($_FILES['fotoCuerpo']['name'])) {
        $errores['fotoCuerpo'] = 'La foto del cuerpo es obligatoria.';
    } else {
        // Verificar el tipo de archivo
        $tipo_archivo = $_FILES['fotoCuerpo']['type'];
        if (!in_array($tipo_archivo, ['image/jpeg', 'image/png', 'image/gif'])) {
            $errores['fotoCuerpo'] = 'El archivo de foto debe ser una imagen (JPEG, PNG, GIF).';
        } else {
            $datos['fotoCuerpo'] = htmlspecialchars($_FILES['fotoCuerpo']['name']);
        }
    }

    // Validar la dirección de envío
    if (empty($_POST['direccionEnvio'])) {
        $errores['direccionEnvio'] = 'La dirección de envío es obligatoria.';
    } else {
        $datos['direccionEnvio'] = htmlspecialchars($_POST['direccionEnvio']);
    }

    // Validar el método de pago
    if (empty($_POST['metodo_pago'])) {
        $errores['metodo_pago'] = 'El método de pago es obligatorio.';
    } else {
        $datos['metodo_pago'] = $_POST['metodo_pago'];
    }

    // Validar comentario (opcional)
    $datos['comentario'] = htmlspecialchars($_POST['comentario']);

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
?>
