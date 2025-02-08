document.getElementById('miFormulario').addEventListener('submit', function(event) {
    event.preventDefault();  // Evita el envío predeterminado del formulario

    // Enviar el formulario con fetch
    fetch('http://localhost:3001/enviar-correo', {
        method: 'POST',
        body: new FormData(this)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Respuesta del servidor:', data);
        alert('Formulario enviado con éxito');
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Hubo un error al enviar el formulario');
    });
});
