// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBFOll1h7F6FdvdD9LLv_ISXTU_fsrk_OI",
    authDomain: "teamupweb-f557f.firebaseapp.com",
    projectId: "teamupweb-f557f",
    storageBucket: "teamupweb-f557f.firebasestorage.app",
    messagingSenderId: "414127226738",
    appId: "1:414127226738:web:582977425b3e0c6736a7eb",
    measurementId: "G-JT24JBPTBF"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

const eventoForm = document.getElementById('eventoForm');
const mensaje = document.getElementById('mensaje');
const listaEventos = document.getElementById('listaEventos');
const loginBtn = document.getElementById('loginBtn');
const logoutBtn = document.getElementById('logoutBtn');

// Detectar cambios de sesión
auth.onAuthStateChanged(user => {
    if (user) {
        console.log('Usuario logueado:', user.displayName);
        loginBtn.style.display = 'none';
        logoutBtn.style.display = 'block';
        mensaje.textContent = `Bienvenido, ${user.displayName}`;
        mensaje.style.color = "green";
    } else {
        console.log('Usuario no logueado');
        loginBtn.style.display = 'block';
        logoutBtn.style.display = 'none';
        mensaje.textContent = 'Por favor, inicia sesión para crear eventos';
        mensaje.style.color = "red";
    }
});

// Login con Google
const provider = new firebase.auth.GoogleAuthProvider();
loginBtn.addEventListener('click', () => {
    auth.signInWithPopup(provider)
        .then((result) => {
            console.log('Usuario logueado:', result.user);
        })
        .catch((error) => {
            console.error('Error al iniciar sesión:', error);
            mensaje.textContent = `Error de login: ${error.message}`;
            mensaje.style.color = 'red';
        });
});

// Logout
logoutBtn.addEventListener('click', () => {
    auth.signOut().then(() => {
        console.log('Sesión cerrada');
    });
});

// Guardar evento en Firestore
eventoForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const user = auth.currentUser;
    if (!user) {
        mensaje.textContent = 'Debes iniciar sesión para crear eventos';
        mensaje.style.color = 'red';
        return;
    }

    const nombre = document.getElementById('nombre').value;
    const fecha = document.getElementById('fecha').value;
    const ubicacion = document.getElementById('ubicacion').value;
    const tipo = document.getElementById('tipo').value;

    db.collection("eventos").add({
        nombre,
        fecha,
        ubicacion,
        tipo,
        creadoPor: user.uid,
        nombreUsuario: user.displayName,
        emailUsuario: user.email,
        creadoEn: firebase.firestore.FieldValue.serverTimestamp()
    })
        .then(() => {
            mensaje.textContent = "Evento creado correctamente!";
            mensaje.style.color = "green";
            eventoForm.reset();
            mostrarEventos();
        })
        .catch((error) => {
            mensaje.textContent = "Error al crear evento: " + error.message;
            mensaje.style.color = "red";
        });
});

// Mostrar eventos en la lista
function mostrarEventos() {
    listaEventos.innerHTML = '';
    db.collection("eventos").orderBy("fecha", "asc").get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const evento = doc.data();
                const li = document.createElement('li');
                li.textContent = `${evento.nombre} - ${evento.fecha} - ${evento.ubicacion} - ${evento.tipo} - creado por ${evento.nombreUsuario}`;
                listaEventos.appendChild(li);
            });
        })
        .catch((error) => {
            console.error('Error al cargar eventos:', error);
        });
}

// Cargar eventos al iniciar
mostrarEventos();
