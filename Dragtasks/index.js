const input = document.querySelector(".inputask");
const buttoncrear = document.querySelector(".crearbutton");
const taskContainer = document.querySelector("#task-todo");
const taskContainer2 = document.querySelector("#task-doing");
const taskContainer3 = document.querySelector("#task-done");

// Creamos tarea
buttoncrear.addEventListener("click", () => {
    if (input.value.trim() === "") return;

    const createtask = document.createElement("p");
    createtask.textContent = input.value;
    createtask.classList.add("task-item");
    createtask.draggable = true;

    // estilos generales
    createtask.style.width = "max-content";
    createtask.style.height = "max-content";
    createtask.style.background = "#DF7A7A"; // COLOR INICIAL (To-do)
    createtask.style.padding = "10px 20px";
    createtask.style.borderRadius = "5px";
    createtask.style.marginTop = "15px";
    createtask.style.cursor = "grab";
    createtask.style.color = "white";
    createtask.style.fontFamily = "sans-serif";

    taskContainer.appendChild(createtask);

    input.value = "";
});

// ---------- DRAG & DROP ----------

let draggedTask = null;

// Inicia arrastre
document.addEventListener("dragstart", (e) => {
    if (e.target.classList.contains("task-item")) {
        draggedTask = e.target;
        e.target.style.opacity = "0.5";
    }
});

// Fin de arrastre
document.addEventListener("dragend", (e) => {
    if (e.target.classList.contains("task-item")) {
        e.target.style.opacity = "1";
    }
});

// Columnas permiten soltar
const columns = document.querySelectorAll("#task-todo, #task-doing, #task-done");

columns.forEach(col => {
    col.addEventListener("dragover", (e) => e.preventDefault());

    col.addEventListener("drop", (e) => {
        if (!draggedTask) return;

        col.appendChild(draggedTask);

        // Cambiar color según columna
        if (col.id === "task-todo") {
            draggedTask.style.background = "#DF7A7A"; // rojo
        } else if (col.id === "task-doing") {
            draggedTask.style.background = "#F5D96B"; // amarillo
        } else if (col.id === "task-done") {
            draggedTask.style.background = "#78C97F"; // verde

            // Click en Done elimina la tarea
            draggedTask.onclick = () => draggedTask.remove();
        }
    });
});