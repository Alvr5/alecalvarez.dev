 // dipara la funcion del change
 const defaultFile = 'C:\Users\aleca\Desktop\alec webs\circle-arrow-left-solid 1 (1).png';
 const file = document.getElementById('inputFile1');
 const img = document.getElementById('img1' );
     file.addEventListener('change',e =>{
         if (e.target.files[0]) {
            // función de subida de archivo
            const  reader = new FileReader(); 
            reader.onload = function( e ){
                img.src = e.target.result;
            }
            reader.readAsDataURL(e.target.files[0])
         }
         else if (e.target-files==null) {
            reader.onload = function(e){
                img.src = e.console.error();
                
            }
         }
         else{
             img.src.defaultFile;
         }
     }
     )