
function procesandoLlamadaApi(msj) {
    return new Promise((resolve, reject) => {
        // Simulacion de una tarea asincronica existosa
        setTimeout(() => {
            const exito = Math.random() < 0.6;
            if (exito) {
                resolve("Operacion asincronica completada con exito, mensaje: " + msj + " enviado exitosamente.");
            } else {
                reject(new Error("Se rechazo la operaciona sincronica,entro en reject"));
            }
        }, 1000);
    });
}

async function simulandoEnviarSolicitudApi(msj) {
    try {
        let respuesta = await procesandoLlamadaApi(msj);
        alert(respuesta);
    } catch (error) {
        alert("Ocurrio un error: " + error.message);
    }
}

const botonBoth = document.querySelector(".butonBoth");
botonBoth.addEventListener("click", () => {
    const input = document.querySelector(".inputBoth");
    simulandoEnviarSolicitudApi(input.value);
    input.value="";
});
