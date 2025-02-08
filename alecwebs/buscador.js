function buscador_interno(){
    FileSystemEntry.inputbuscar.value.toUppercase();
    li = box_search.getElementsbytagName("li");

    for (i=0; i<li.length; i++){
        a = li[i].getElementsbytagName("a")[0];
        textValue = a.textContent || a.innerText;
        
    }
}