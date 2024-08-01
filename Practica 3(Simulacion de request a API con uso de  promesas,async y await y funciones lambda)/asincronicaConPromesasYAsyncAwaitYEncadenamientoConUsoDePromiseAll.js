
const obtenerInformacion2=(text)=>{
    return new Promise ((resolve,reject)=>{
        setTimeout(()=>{
          const exito = true;
          if(exito){
            resolve("Operacion asincronica completada exitosamente,es la operacion con el valor "+ text)
          } 
          else{
            reject("Opreacion asincronica entro en reject,es la operacion con el valor "+ text)
          } 
        },1000)
    });
}



async function ejecutarOperacionesConcurrentes(){

    try{
        const[primero,segundo,tercero]=await Promise.all([
            obtenerInformacion2("ValordePromesaNumero1"),
            obtenerInformacion2("ValordePromesaNumero2"),
            obtenerInformacion2("ValordePromesaNumero3")
        ])
        alert("Respuesta de promesa 1 :"+primero);
        alert("Respuesta de promesa 2 :"+segundo)
        alert("Respuesta de promesa 1 :"+tercero)
    }catch(error){
        alert("Ocurrió un error: " + errorMessage);
    }
}




const botonEncadamiento2 = document.querySelector(".butonEncadenamiento2");
botonEncadamiento2.addEventListener("click", () => {
    ejecutarOperacionesConcurrentes();
});
