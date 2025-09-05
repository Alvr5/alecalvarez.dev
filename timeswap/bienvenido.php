<?php
session_start(); // Iniciar sesión

// Comprobar si hay usuario registrado
if (!isset($_SESSION['usuario'])) {
    header("Location: registro.html");
    exit();
}

$usuario = $_SESSION['usuario'];
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Bienvenido</title>
</head>
<body style="
    margin: 0;
    height: 667px;
    width: 100%;
    background: #3A86FF;
">
    <h1 style="
    margin: 50px 50px;
    font-size: 50px;
    font-family: sans-serif;
    color: white;
 ">Bienvenido <?php echo htmlspecialchars($usuario); ?>!</h1>

 <div class="feed" style="
    width: 700px;
    height: 1090px;
    margin-left: 40px;
    border-radius: 30px;
    background: white;
" >

<div class="imagenhabilidad"  style="
    width: 700px;
    height: 1090px;
    /* margin-left: 40px; */
    border-radius: 30px;
    background: red;
"><img style="
    width: 700px;
    height: 1090px;
    border-radius: 20px;
" src="" alt=""></div>
 </div>
</body>
</html>
