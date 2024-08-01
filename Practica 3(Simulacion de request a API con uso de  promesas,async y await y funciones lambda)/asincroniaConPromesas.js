function procesandoLlamadaApiPromesas(msj) {
    return new Promise((resolve, reject) => {
        // Simulando una operación asíncrona exitosa
        setTimeout(() => {
            const exito = Math.random() < 0.6;
            if (exito) {
                resolve("¡Operación exitosa! mensaje enviado exitosamente:" + msj);
            } else {
                reject(new Error("Se rechazo la operaciona sincronica,entro en reject"));
            }
        }, 2000);
    });
}

function simulandoEnviarSolicitudApiPromesas(msj) {
    procesandoLlamadaApiPromesas(msj)
        .then((respuesta) => {
            alert(respuesta);
        })
        .catch((error) => {
            alert("Ocurrió un error: " + error.message);
        })
        .finally(() => {
            // Realizar tareas de limpieza si es necesario
        });
}

const boton = document.querySelector(".butonPromesas"); 

boton.addEventListener("click", () => {
    const input = document.querySelector(".inputPromesas"); 
    simulandoEnviarSolicitudApiPromesas(input.value);
    input.value = "";
});
