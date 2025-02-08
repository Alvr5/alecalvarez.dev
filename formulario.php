<?php
$data = json_decode(file_get_contents("php://input"), true);
$nombre = $data["nombre"];
$email = $data["email"];

// Guardar en base de datos (igual que antes)
$conexion = new mysqli("localhost", "usuario", "contraseña", "basededatos");
$conexion->query("INSERT INTO usuarios (nombre, email) VALUES ('$nombre', '$email')");
$conexion->close();

echo "Datos guardados correctamente.";
?>
