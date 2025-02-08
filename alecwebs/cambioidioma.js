var select = document.querySelector("#idioma");
select.addEventListener('select', idioma);


function idioma() {
    let id = select.value;
    if (id === 'en') {
        location.href = "C:\\Users\\aleca\\Desktop\\alec webs\\fotoNEXingles.html";
    }

    else if (select.value === 'es') {

        location.href = "..\\alec webs\\FotoNEX.html";
    }
}