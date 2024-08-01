
const obtenerInformacion=(text)=>{
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


const mostrarData= async ()=>{
    try{
        data1=await obtenerInformacion("Pene");
        data2=await obtenerInformacion("Culo");
        data3=await obtenerInformacion("Boca");
        alert("Respuesta de la promesa 1:"+data1)
        alert("Respuesta de la promesa 2:"+data2)
        alert("Respuesta de la promesa 3:"+data3)
    }catch(error){
        alert("Ocurrió un error: " + errorMessage);
    }
}




const botonEncadamiento = document.querySelector(".butonEncadenamiento");
botonEncadamiento.addEventListener("click", () => {
     mostrarData();
});
