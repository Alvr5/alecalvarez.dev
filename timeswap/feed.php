<?php
session_start();

if (!isset($_SESSION['usuario'])) {
    header("Location: registro.html");
    exit();
}

$usuario = $_SESSION['usuario'];

// Cargar habilidades subidas por usuarios
$archivoHabilidades = 'habilidades.json';
$habilidades = [];

if (file_exists($archivoHabilidades)) {
    $habilidades = json_decode(file_get_contents($archivoHabilidades), true);
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<title>Bienvenido</title>
<style>
body { 
    margin:0; 
    font-family:sans-serif; 
    background:#3A86FF; 
    display:flex; 
    flex-direction:column; 
    align-items:center; 
    overflow: hidden;
}
h1 { 
    margin:50px 20px 20px 20px; 
    font-size:50px; 
    color:white; 
    text-align:center; 
}
.feed {
    position: relative;
    width: 90%;
    max-width: 400px;
    height: 600px;
    margin-bottom: 50px;
    margin-top: 210px;
    scale: 1.5;
}
.card { 
        position: absolute;
    width: 100%;
    height: 100%;
    background: white;
    border-radius: 20px;
    box-shadow: 0 10px 20px rgba(0,0,0,0.2);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: grab;
    transition: transform 0.3s ease, opacity 0.3s ease, background-color 0.2s ease;
    scale: 1.5;
    /* left: 180px; */
    top: 150px;
    padding-top: 30px;
    padding-bottom: 40px;
}
.card img { 
       width: 100%;
    height: 500px;
    border-radius: 15px;
    margin-bottom: 20px;
    object-fit: cover;
}
.card h2 { 
    margin:0; 
    font-size:24px; 
    text-align:center; 
}
</style>
</head>
<body>
<h1>Bienvenido <?php echo htmlspecialchars($usuario); ?>!</h1>

<div class="feed" id="feed">
<?php foreach (array_reverse($habilidades) as $habilidad): ?>
<div class="card">
    <img src="<?php echo $habilidad['imagen']; ?>" alt="<?php echo $habilidad['nombre']; ?>">
    <h2><?php echo htmlspecialchars($habilidad['nombre']); ?></h2>
</div>
<?php endforeach; ?>
</div>

<script>
const cards = document.querySelectorAll('.card');

cards.forEach((card) => {
    let isDragging = false;
    let startX;

    card.addEventListener('mousedown', (e) => { 
        isDragging = true; 
        startX = e.clientX; 
    });
    card.addEventListener('mousemove', (e) => { 
        if (!isDragging) return; 
        const x = e.clientX - startX; 
        card.style.transform = `translateX(${x}px) rotate(${x*0.1}deg)`;

        // Cambiar color según dirección
        if (x > 0) card.style.backgroundColor = '#d4f8d4'; // verde claro
        else if (x < 0) card.style.backgroundColor = '#f8d4d4'; // rojo claro
        else card.style.backgroundColor = 'white';
    });
    card.addEventListener('mouseup', (e) => { 
        isDragging = false; 
        handleSwipe(card, e.clientX - startX); 
        card.style.backgroundColor = 'white';
    });

    // Para móviles
    card.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; });
    card.addEventListener('touchmove', (e) => { 
        if (!startX) return; 
        const x = e.touches[0].clientX - startX; 
        card.style.transform = `translateX(${x}px) rotate(${x*0.1}deg)`;

        if (x > 0) card.style.backgroundColor = '#d4f8d4';
        else if (x < 0) card.style.backgroundColor = '#f8d4d4';
        else card.style.backgroundColor = 'white';
    });
    card.addEventListener('touchend', (e) => { 
        handleSwipe(card, e.changedTouches[0].clientX - startX); 
        card.style.backgroundColor = 'white';
        startX = null; 
    });
});

function handleSwipe(card, x) {
    if (x > 100) { 
        card.style.transform = `translateX(1000px) rotate(30deg)`; 
        card.style.opacity = 0; 
        console.log('Aprobado'); 
    } else if (x < -100) { 
        card.style.transform = `translateX(-1000px) rotate(-30deg)`; 
        card.style.opacity = 0; 
        console.log('Descartado'); 
    } else { 
        card.style.transform = 'translateX(0) rotate(0)'; 
    }
}
</script>
</body>
</html>
