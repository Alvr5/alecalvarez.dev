<?php
// Conexión a MySQL
$servername = "localhost";
$username = "root";
$password = "Alecal051204@";
$dbname = "timeswap";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Revisar conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Obtener datos del formulario
$nombre = $_POST['nombre'];
$password = $_POST['password'];
$password_confirm = $_POST['password_confirm'];

// Validar que las contraseñas coincidan
if ($password !== $password_confirm) {
    die("Las contraseñas no coinciden.");
}

// Hashear la contraseña antes de guardarla
$hashed_password = password_hash($password, PASSWORD_DEFAULT);

// Insertar en la base de datos
$stmt = $conn->prepare("INSERT INTO usuarios (nombre, password) VALUES (?, ?)");
$stmt->bind_param("ss", $nombre, $hashed_password);

if ($stmt->execute()) {
    echo "Usuario registrado correctamente.";
} else {
    echo "Error: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>
