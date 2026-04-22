const video = document.getElementById('video');
const info = document.getElementById('info');
// Es recomendable descargar estos modelos localmente para evitar errores de CORS
const MODEL_URL = 'https://justadudewhohacks.github.io/face-api.js/models';

async function init() {
    try {
        info.innerText = "Cargando Redes Neuronales...";
        
        // Carga en paralelo para mayor velocidad
        await Promise.all([
            faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
            faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
            faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL)
        ]);

        info.innerText = "Accediendo a la cámara...";
        const stream = await navigator.mediaDevices.getUserMedia({ 
            video: { width: 640, height: 480 } 
        });
        
        video.srcObject = stream;
        
        // IMPORTANTE: Esperar a que el video cargue sus metadatos
        video.onloadedmetadata = () => {
            video.play();
            info.innerText = "Listo para escanear";
        };

    } catch (err) {
        info.innerText = "Error crítico. Revisa la consola.";
        console.error("Detalles del error:", err);
    }
}

// Función auxiliar para obtener el descriptor actual
async function getCurrentDescriptor() {
    // Usamos el detector Tiny por ser más rápido para aplicaciones web
    const detection = await faceapi.detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceDescriptor();
    
    if (!detection) {
        alert("No se detecta rostro. Asegúrate de estar frente a la cámara y con buena luz.");
        return null;
    }
    return detection.descriptor;
}

// REGISTRO
document.getElementById('btn-register').addEventListener('click', async () => {
    const name = document.getElementById('username').value;
    if (!name) return alert("Escribe un nombre");

    info.innerText = "Analizando rostro...";
    const descriptor = await getCurrentDescriptor();

    if (descriptor) {
        const userData = {
            name: name,
            descriptor: Array.from(descriptor) // Convertir Float32Array a Array normal
        };
        
        let users = JSON.parse(localStorage.getItem('face_db') || '[]');
        users.push(userData);
        localStorage.setItem('face_db', JSON.stringify(users));
        
        alert(`¡Rostro de ${name} guardado!`);
        info.innerText = "Usuario registrado con éxito.";
    }
});

// LOGIN
document.getElementById('btn-login').addEventListener('click', async () => {
    const name = document.getElementById('username').value;
    const users = JSON.parse(localStorage.getItem('face_db') || '[]');
    
    const userToFind = users.find(u => u.name === name);
    if (!userToFind) return alert("El usuario no existe.");

    info.innerText = "Verificando...";
    const currentDescriptor = await getCurrentDescriptor();

    if (currentDescriptor) {
        const savedDescriptor = new Float32Array(userToFind.descriptor);
        
        // Calculamos la distancia euclidiana
        const distance = faceapi.euclideanDistance(currentDescriptor, savedDescriptor);
        
        // Umbral: Menos de 0.5 suele ser la misma persona
        if (distance < 0.5) {
            alert(`✅ Bienvenid@ ${name}. Acceso concedido.`);
            info.innerText = "Sesión iniciada.";
        } else {
            alert("❌ El rostro no coincide con el registro.");
            info.innerText = "Error: Identidad no verificada.";
        }
        console.log("Distancia de confianza:", distance);
    }
});

init();