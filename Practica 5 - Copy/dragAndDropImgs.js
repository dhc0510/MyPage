const catImg=document.querySelector("#main__cat-img");
const catDropZone=document.querySelector("#main__cat-drop-target");

const toyDogImg=document.querySelector("#main__toy-dog-img");
const toyDogDropZone=document.querySelector("#main__toy-dog-drop-target");

const blackDogImg=document.querySelector("#main__black-dog-img");
const blackDogDropZone=document.querySelector("#main__black-dog-drop-target");

const tigerImg=document.querySelector("#main__tiger-img");
const tigerDropZone=document.querySelector("#main__tiger-drop-target");


const submitButton=document.querySelector(".main__drop-imgs-submit-button");
const resetButton=document.querySelector(".main__drop-imgs-reset-button");



//Manejo de cuando un elemento pasa por encima de dropZone
catDropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
});
toyDogDropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
});
blackDogDropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
});
tigerDropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
});


//Manejo de cuando un elemento se suelta dentro de un dropZone
catDropZone.addEventListener('drop', (e) => {
    handleDrop(e, catDropZone);
});
toyDogDropZone.addEventListener('drop', (e) => {
    handleDrop(e, toyDogDropZone);
});
blackDogDropZone.addEventListener('drop', (e) => {
    handleDrop(e, blackDogDropZone);
});
tigerDropZone.addEventListener('drop', (e) => {
    handleDrop(e, tigerDropZone);
});

// Función para manejar el evento drop común
function handleDrop(e, dropZone) {
    e.preventDefault();

 
    if(e.dataTransfer.items.length!=4){
        return;
    }

    let dragItemData = e.dataTransfer;
    let dragImageUrl = dragItemData.getData("text/uri-list");

    // Crear un nuevo elemento de imagen
    const img = document.createElement('img');
    img.src = dragImageUrl;
    img.style.width = '90%'; 
    img.style.height = '70%'; 

    // Limpiar el contenido existente del dropZone y agregar la imagen
    dropZone.innerHTML = '';
    dropZone.appendChild(img);
}


//Botones:

function checkContent() {
    const catImgSrc = catDropZone.querySelector('img')?.src || '';
    const toyDogImgSrc = toyDogDropZone.querySelector('img')?.src || '';
    const blackDogImgSrc = blackDogDropZone.querySelector('img')?.src || '';
    const tigerImgSrc = tigerDropZone.querySelector('img')?.src || '';


    return (
        catImgSrc.includes('http://127.0.0.1:5500/imgs/Gato.webp') &&
        toyDogImgSrc.includes('http://127.0.0.1:5500/imgs/Perro.webp') &&
        blackDogImgSrc.includes('http://127.0.0.1:5500/imgs/Perro%20negro.webp') &&
        tigerImgSrc.includes('http://127.0.0.1:5500/imgs/tigre.webp')
    );
}
function showModal(isCorrect){

    let modalIcon = document.querySelector(".modal__icon");
    let modalTitle = document.querySelector(".modal__title");
    let modalLastpanel = document.querySelector(".modal__continue-button-container");
    let modalDescription = document.querySelector(".modal__description");
    
    // Mostrar el modal de que es correcto
    if (isCorrect) {
        modalIcon.className = "fa-solid fa-circle-check modal__icon";
        modalIcon.style.color = "#008000";
        modalTitle.style.color = "#008000";
        modalTitle.textContent = "Success";
        modalLastpanel.style.backgroundColor = "#008000";
        modalDescription.textContent = "Correct! You have placed the photos in the correct positions according to the names. Well done!";
    } else {
        modalIcon.className = "fa-solid fa-circle-xmark modal__icon";
        modalIcon.style.color = "#FF0000";
        modalTitle.style.color = "#FF0000";
        modalTitle.textContent = "Failure";
        modalDescription.textContent = "Incorrect. You have not placed the photos in the corresponding places to the names. You need to improve.";
        modalLastpanel.style.backgroundColor = "#FF0000";
    }
    
}

{/* <i class="fa-solid fa-circle-xmark"></i> */}

// Botón de submit
submitButton.addEventListener('click', () => {
    
    //Si las imagenes estan en la posicion correcta
    if (checkContent()){
        showModal(true);
    }
    else{
        showModal(false);
    }
    resetButton.click();
});

resetButton.addEventListener('click',()=>{

    // Limpiar el contenido existente
    catDropZone.innerHTML = "";
    toyDogDropZone.innerHTML = "";
    blackDogDropZone.innerHTML = "";
    tigerDropZone.innerHTML = "";

    // Agregar texto a cada contenedor
    catDropZone.appendChild(document.createTextNode("Cat"));
    toyDogDropZone.appendChild(document.createTextNode("Toy Dog"));
    blackDogDropZone.appendChild(document.createTextNode("Black Dog"));
    tigerDropZone.appendChild(document.createTextNode("Tiger"));

});

