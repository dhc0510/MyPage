const sendFetchGetButton=document.querySelector(".button-get-fetch");
const sendFetchPutButton=document.querySelector(".button-post-fetch");


function sendHttpRequest(request,informationSend){
    //Valores a mostrar en la respuesta del get o post
    let valueToShow=null;
    let headersLength=null;
    let redirected=null;
    let statusNumberValue=null;
    let statusText=null;
    let type=null;
    let url=null;

    fetch(request)
    .then(response => {
        if (!response.ok) {
            throw new Error("Dio un error, porque el codigo de respuesta NO esta entre 200-299");
        }

        headersLength=response.headers.keys.length;
        redirected=response.redirected;
        statusNumberValue=response.status;
        statusText=response.statusText;
        type=response.type;
        url=response.url;

        // Obtener el texto del cuerpo de la respuesta
        return response.text();
    })
    .then(bodyText => {
        valueToShow = "Informacion de la solicitud:\n\n" +
            "El valor obtenido en la solicitud es: " + bodyText + "\n" +
            "La cantidad de headers que hay en la respuesta de la solicitud son: " + headersLength + "\n" +
            "La solicitud tuvo una redireccion: " + redirected+ "\n" +
            "status value: " + statusNumberValue+ "\n" +
            "status text: " + statusText+ "\n" +
            "type value: " + type + "\n" +
            "Final url, despues de cualquier redireccion: " + url+"\n"+
            "La informacion que se envio(Si es POST,si no es null) es esta:"+informationSend ;

        // Actualizar el valor del área de texto
        textAreaResponse.value = valueToShow;
    })
    .catch(error => {
        textAreaResponse.value = "Error: " + error.message;
    }).finally(()=>{
        textAreaResponse.value=valueToShow; 
    });
}



    sendFetchGetButton.addEventListener('click',()=>{
        request=new Request("https://reqres.in/api/users/2");
        sendHttpRequest(request,null);
    });
    sendFetchPutButton.addEventListener('click',()=>{
        
            //Sacar los datos Username y job que son los datos necesario para realizar el Post, se sacan por medio de la informacion del formulario 
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
            request=new Request('https://reqres.in/api/users',{
                body:dataInJson,
                method:"POST"
            });
            sendHttpRequest(request,dataInJson);
    });


 








