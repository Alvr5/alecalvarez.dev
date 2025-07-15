const flechas = document.querySelectorAll("#flecha");
const resenas = document.querySelectorAll(".resena");

flechas.forEach(flecha => {
  flecha.addEventListener("click", () => {
    const resena = flecha.nextElementSibling;
    if (resena && resena.classList.contains("resena")) {
      // Alternar la visibilidad
      if (resena.style.display === "block") {
        resena.style.display = "none";
      } else {
        resena.style.display = "block";
      }
    }
  });
});


const imagen = document.querySelectorAll(".testimonio img"); // Cogemos la imagen

const pantalladearticulo = document.querySelectorAll(".pantallaarticulo");
const nombrearticulo = document.querySelectorAll(".nombrearticulo");
const menos = document.querySelectorAll("#menos");
const numero = document.querySelectorAll("#numero");
const botoncomprar = document.querySelectorAll(".botoncomprar")
numero = 0;
if (botoncomprar == onclick) {
  imagen.add(pantalladearticulo);
}