<?php
session_start();

if (!isset($_SESSION['usuario'])) {
    header("Location: registro.html");
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['imagen'])) {
    $carpetaDestino = 'uploads/';
    if (!is_dir($carpetaDestino)) {
        mkdir($carpetaDestino, 0777, true);
    }

    $nombreArchivo = basename($_FILES['imagen']['name']);
    $rutaArchivo = $carpetaDestino . time() . '_' . $nombreArchivo;

    if (move_uploaded_file($_FILES['imagen']['tmp_name'], $rutaArchivo)) {
        // Guardar info en archivo o base de datos (aquí usamos archivo JSON simple)
        $archivoHabilidades = 'habilidades.json';
        $habilidades = [];

        if (file_exists($archivoHabilidades)) {
            $habilidades = json_decode(file_get_contents($archivoHabilidades), true);
        }

        $habilidades[] = [
            'usuario' => $_SESSION['usuario'],
            'imagen' => $rutaArchivo,
            'nombre' => $_POST['nombre']
        ];

        file_put_contents($archivoHabilidades, json_encode($habilidades));

        header("Location: feed.php");
        exit();
    } else {
        echo "Error al subir la imagen.";
    }
}
?>

<form method="POST" enctype="multipart/form-data" style="
    scale: 3;
    position: absolute;
    left: 350px;
    top: 240px;
">
    <label>Nombre de la habilidad:</label><br>
    <input type="text" name="nombre" required><br><br>
    <label>Selecciona imagen:</label><br>
    <input type="file" name="imagen" accept="image/*" required><br><br>
    <button type="submit">Subir</button>
</form>
