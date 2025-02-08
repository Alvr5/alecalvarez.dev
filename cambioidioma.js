var select = document.querySelector("#idioma");
select.addEventListener('select', idioma);


function idioma() {
    let id = select.value;
    if (id === 'en') {
        location.href = "fotoNEXingles.html";
    }

    else if (select.value === 'es') {

        location.href = "FotoNEX.html";
    }
}