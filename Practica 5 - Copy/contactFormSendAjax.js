const textAreaResponse=document.querySelector(".main__text-area-response");
const sendAjaxButton=document.querySelector(".button-get-ajax");
const form=document.querySelector(".main__contact-section-form-container");





form.addEventListener("submit" ,(event)=>{
    //Para que NO se haga un envio de la informacion del form a la misma pagina que es la accion pro defecto
    event.preventDefault();


    if(event.submitter ===sendAjaxButton){
        
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

    dataInJson=convertToJson(objToSend);
     sendInformation(dataInJson);
    }
  
  

});


function convertToJson(dataToTransform){
    return JSON.stringify(dataToTransform,null,1);
}


function sendInformation(dataToSend){

    const request=new XMLHttpRequest();

    request.open('POST', 'https://reqres.in/api/users', true);
    request.setRequestHeader('Content-Type', 'application/json');


    //Manejar la carga de la respuesta,si fue error o no, y si no recibir esa informacion
    request.addEventListener('load',(event)=>{
        if (request.status >= 200 && request.status <= 300) {
            //Muestro los datos en el textArea de la respuesta de la solicitud
            //Primero reinicio el valor para que NO se concatene con el valor pasado
            if(textAreaResponse.value.length>1){
                textAreaResponse.value="";
            }
            textAreaResponse.value = 
            // La solicitud se ha completado con éxito (código de estado 2xx)
            "La solicitud se ha completado con éxito.\n" +
            "Vamos a dar los datos de la respuesta del servidor:\n\n" +
            // Aquí puedes acceder a la respuesta del servidor 
            "La respuesta del servidor es esta: " + request.response + "\n\n" +
            "El valor de responseURL es este: " + request.responseURL + "\n\n" +
            "El valor del código de estado es: " + request.status + "\n\n" +
            "La información que se envió fue esta: " + dataToSend;
        

          } else {
            // La solicitud ha fallado debido a un error en el servidor (código de estado 4xx o 5xx)
            textAreaResponse.value="La solicitud ha fallado. Código de estado:"+ request.status
            // Aquí puedes manejar el error de acuerdo a tus necesidades
          }
    });

    
    // Manejar errores de red
    request.addEventListener('error', (event) => {
        console.log("Error de red al intentar enviar la solicitud.");
        console.log("El valor del codigo de estado es "+ request.status);
    });
    request.send(dataToSend);


}





