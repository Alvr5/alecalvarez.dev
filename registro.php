
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Formulario de Registro</title>
    <link rel="stylesheet" href="registro.php">
    <style type="text/css">
        body {
            background-color: #87ccc1;
            margin: 0;
            padding: 0;
        }
        table {
            border: solid 2px #7e7c7c;
            border-collapse: collapse;
        }
        th, td {
            border: solid 1px #7e7c7c;
            padding: 2px;
            text-align: center;
        }
        th, h1 {
            background-color: #edf797;
        }
    </style>
</head>
<body>
    <h1>Formulario de Registro</h1>
    <form action="registro.php" method="POST">
        <table border="0" align="center">
            <tr>
                <td>Nombre y Apellido:</td>
                <td><input type="text" name="nombre" required /></td>
            </tr>
            <tr>
                <td>Nombre de Usuario:</td>
                <td><input type="text" name="usuario" required /></td>
            </tr>
            <tr>
                <td>Contraseña:</td>
                <td><input type="password" name="contraseña" required /></td>
            </tr>
            <tr>
                <td align="center"><input type="submit" name="enviar" value="Registrarse" /></td>
                <td align="center"><input type="reset" name="borrar" value="Restablecer" /></td>
            </tr>
        </table>
    </form>


    <a href="index.html">Volver Atrás</a>
</body>
</html>



<?php
    // Datos de conexión
    $user = "root";
    $pass = "Alecal051204@";
    $host = "localhost";
    
    
    // Conexión a la base de datos
    $connection = mysqli_connect($host, $user, $pass, "dbformulario");

    if(!$connection) {
        echo "No se ha podido conectar con el servidor: " . mysqli_connect_error();
    } else {
        echo "<b><h3>Conectado al servidor</h3></b>";
    }

    // Insertar datos de registro
    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        $nombre = $_POST["nombre"];
    $usuario = $_POST["usuario"];
    $contraseña = $_POST["contraseña"];
    
        $instruccion_SQL = "INSERT INTO tabla_form (nombre, usuario, contraseña) VALUES ('$nombre','$usuario','$contraseña')";
        $resultado = mysqli_query($connection, $instruccion_SQL);
        
        if (!$resultado) {
            echo "Error al insertar los datos: " . mysqli_error($connection);
        } else {
            echo "<h3>Datos registrados correctamente.</h3>";
        }
    }

    // Consulta de los datos registrados
    $consulta = "SELECT * FROM tabla_form";
    $result = mysqli_query($connection, $consulta);

    if (!$result) {
        echo "No se ha podido realizar la consulta";
    } else {
        echo "<table>";
        echo "<tr><th>id</th><th>Nombre</th><th>Usuario</th><th>Contraseña</th></tr>";

        while ($colum = mysqli_fetch_array($result)) {
            echo "<tr>";
            echo "<td>" . $colum['id'] . "</td>";
            echo "<td>" . $colum['nombre'] . "</td>";
            echo "<td>" . $colum['usuario'] . "</td>";
            echo "<td>" . $colum['contraseña'] . "</td>";
            echo "</tr>";
        }
        echo "</table>";
    }

    // Cerrar conexión
    mysqli_close($connection);
    ?>