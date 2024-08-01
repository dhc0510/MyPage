// Declarando varaibles Globales 
let textArea=document.querySelector(".textarea");


//Objeto en forma base para serializar
const objeto={
    nombre:"Diego",
    apellidos:"Herrera Chaves",
    edad:18
}
//Objeto en formato JSON para deserializar
const objetoJson = JSON.stringify(objeto);


/*Notas:
 El uso del metodo parse() es para 'deserializar',osea pasar de un JSON a un objeto
 El uso del metodo stringify() es para 'serializar',osea pasar de un objeto a un JSON.
*/

//Evento cuando se presiona el boton de uso de parse(text)
let button1=document.querySelector(".button-parse1");
button1.addEventListener("click",()=>{
    const objetoDeserializado=JSON.parse(objetoJson);
    textArea.value = "Objeto deserializado\n" +
    "Nombre: " + objetoDeserializado.nombre + "\n" +
    "Apellidos: " + objetoDeserializado.apellidos + "\n" +
    "Edad: " + objetoDeserializado.edad;
});



//Evento cuando se presiona el boton de uso de parse(text,reviver)
let button2=document.querySelector(".button-parse2");
button2.addEventListener("click",()=>{
    const objetoDeserializado=JSON.parse(objetoJson,(key,value)=>{
        if(key="Edad"){
            if(value<20){
                return undefined;
            }
        }
        return value;
    });

    textArea.value = "Objeto deserializado con uso del segundo paramtro del metodo parse(), para filtrar: \n" +
    "Nombre: " + objetoDeserializado.nombre + "\n" +
    "Apellidos: " + objetoDeserializado.apellidos + "\n" +
    "Edad: " + objetoDeserializado.edad + "\n\n" +
    "Como vemos la propiedad Edad, sale como undifined, porque en el codigo se hizo un filtro en la funcion del segundo parametro, para que si era menor de 20 anos se cambiara el valor a 'undifined'.";

});


//Evento cuando se presiona el boton de uso de stringify(value)
let button3=document.querySelector(".button-stringify1");
button3.addEventListener("click",()=>{
    const jsonString=JSON.stringify(objeto);
    textArea.value="Objeto serializado en cadena JSON:"+jsonString;
});



//Evento cuando se presiona el boton de uso de stringify(value,replacer)
let button4=document.querySelector(".button-stringify2");
button4.addEventListener("click",()=>{
    const jsonString=JSON.stringify(objeto,(key,value)=>{
        if(typeof value==="number"){
          return undefined;
        }
        return value;
    });
    textArea.value="Objeto serializado en cadena JSON con uso del segundo paramtro como funcion para filtrar:"+jsonString+ "\n\n"+
    "Como vemos la propiedad Edad, NO esta , porque en el codigo se hizo un filtro en la funcion del segundo paramtro, para que si el tipo de dato era numerico entonces que se cambiara el valor a 'undifined'.";
});


let button41=document.querySelector(".button-stringify21");
button41.addEventListener("click",()=>{
    const arregloDePropiedadesIncluidad=["Patrimonio","apellidos"]
    const jsonString=JSON.stringify(objeto,arregloDePropiedadesIncluidad);
    textArea.value="Objeto serializado en cadena JSON con uso del segundo paramtro como array para filtrar:"+jsonString+ "\n\n"+
    "Como vemos solo se incluyo la propiedad 'apellidos' porque fue la unica propiedad que esta en el arreglo de filtrado, y segun las reglas de este parametro solo se muestran las propiedades en las que el nombre de la propiedad coincida con alguno de los valores dentro del arreglo.";
});



//Evento cuando se presiona el boton de uso de stringify(value,replacer,space)
let button5=document.querySelector(".button-stringify3");
button5.addEventListener("click",()=>{

    const jsonString=JSON.stringify(objeto,null,2);
    textArea.value="Objeto serializado en cadena JSON con uso del tercer parametro para manejar la identancion, osea manejando como se ve visualmente:"+jsonString
});

