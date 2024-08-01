const sendAxiosGetButton=document.querySelector(".button-get-axios");
const sendAxiosPostButton=document.querySelector(".button-post-axios");


/*
Logica de las requests a realizar
Paso 1:Poner valores por default para las dos propiedades 'GET' y 'POST' y asi ahorrar codigo.Esto haciendo uso de valores de config
por defecto(Tambien se puede hacer con uso del metodo axios.create(config) que permite crear una especie de plantilla).Pero para este 
caso vamos a hacer la otra manera.
Paso 2:Crear un interceptador de la respuesta para validar,transformar o manipular como quiera los datos de respuesta o controlar errores.
En el caso de que solo se quiera manipular el body, entonces se pueden usar las propiedades 'transformResponse' o 'transformRequest'
Paso 3:Hacer solicitud con el objeto global y el metodo especifico y los valores necesarios para ese metodo, usando los alias(MAS LEGIBLE).
Paso 4:Recibir respuesta, que es una promesa dando como valor de resuelto la respuesta o como valor de error el error.
Paso 5:Mostrar el resultado de la respuesta en el textArea de respuesta.

Opciones adicionales NO usadas:Se puede cancelar una solicitud o cosas mas especifcias como enviar datos codificados o muchos formatos
de datos en un mismo body, todo esto explicado en la funcion de axios.

*/


/*Paso 1:Poner valores por default para las dos propiedades 'GET' y 'POST' y asi ahorrar codigo.Esto haciendo uso de valores de config
por defecto(Tambien se puede hacer con uso del metodo axios.create(config) que permite crear una especie de plantilla).Pero para este 
caso vamos a hacer la otra manera.*/

//Los dos valores que se acaban de poner son los valores default pero solo es para practica
axios.defaults.validateStatus= function(status){
//Resuelve la promesa si el codigo de estado es entre 200 y 299
return status>=200 && status<=299;
} 
axios.defaults.responseType='json';

axios.defaults.timeout = 5000; // 5000 milisegundos (5 segundos)

/*Paso 2:Crear un interceptador de la respuesta para validar,transformar o manipular como quiera los datos de respuesta o controlar errores.
En el caso de que solo se quiera manipular el body, entonces se pueden usar las propiedades 'transformResponse' o 'transformRequest'*/

axios.interceptors.request.use(

    function(config){
        //Aqui se puede manipular la informacion de respuesta como queira, haciendo validaciones,transformaciones o lo que sea y tirando 
        //errores en el caso que yo quiera, ya que si se tira un error llega a la segundo funcion justo aqui abajo.
        return config;
    },
    function(error){
        //Aqui se recibe y se manipula el error tirado en la primer funcion justo arriba, aqui manipulo el error como quiera, y lo que se 
        //retorna aqui se va a recibir en el catch de la promesa devuelta por el metodo axios.get(),axios.post(),ect.
        //O tambien se puede hacer redirecciones y devolver el error que quiera como quiera.
    }
);


//Paso 3,4,5:

let valueToShow=null;

//Solicitud de GET:
sendAxiosGetButton.addEventListener("click",()=>{
    axios.get("https://reqres.in/api/unknown/2")
    .then((response)=>{
        valueToShow = "Informacion de la solicitud:\n\n" +
        "*El valor obtenido en la solicitud es: " + JSON.stringify(response.data) + "\n" +
        "*Las headers son de la solicitud son: " + response.headers + "\n" +
        "*status value: " + response.status+ "\n" +
        "*status text: " + response.statusText+ "\n";
    })
    .catch((reject)=>{
        valueToShow= "Error: " + reject.message;
    })
    .finally(()=>{
        textAreaResponse.value=valueToShow;
    });


});

//Solicitud de POST:
sendAxiosPostButton.addEventListener("click",()=>{

    const formData=new FormData(form);
    let us=null;
    let jb=null;
    for(let[clave,valor] of formData.entries() ){
        if(clave==="username"){
            us=valor
        }
        else if(clave==="job"){
            jb=valor;
        }
    }
    let objToSend={
        username:us,
        job:jb
    }
    //Usando el metodo definido en el scrip contactFormSendAjax
    let dataInJson=convertToJson(objToSend);
    
    //Post con async y await
    axios.post("https://reqres.in/api/users",dataInJson,{
        timeout:2000,
        headers:{
            "Content-Type": "application/json"
        }
    }).then((response)=>{
        valueToShow = "Informacion de la solicitud:\n\n" +
        "*El valor obtenido en la solicitud es: " + JSON.stringify(response.data) + "\n" +
        "*Las headers son de la solicitud son: " + response.headers + "\n" +
        "*status value: " + response.status+ "\n" +
        "*status text: " + response.statusText+ "\n";
    })
    .catch((reject)=>{
        valueToShow= "Error: " + reject.message;
    })
    .finally(()=>{
        textAreaResponse.value=valueToShow;
    });




});

