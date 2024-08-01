// Este es el contenedor de la seccion de drop zone de files
let dropFileZone = document.querySelector(".main__drop-target-file-container");
//Este es el contenecor del dropZone cuando NO hay files, se usa para estilar cuando hay eventos de drag en el body
let dropZoneWithoutFiles = document.querySelector(
  ".main__drop-target-file-action-container"
);
//Este es el contenecor del dropZone cuando  hay files
let dropZoneWithFiles = null;

// Array para almacenar los elementos de archivo
let filesItems = [];

//Este es el metodo que se usa cuando se le da click a uno de los itemContainer dentro del contenedor de 'dropZoneWithFiles'
function showItemInformationModal(fileId) {
  let fileNameElement = document.querySelector("#fileNameValue");
  let fileExtensionElement = document.querySelector("#fileExtensionValue");
  let fileTypeValueElement = document.querySelector("#fileTypeValue");
  let fileSizeValueElement = document.querySelector("#fileSizeValue");
  let fileLastModifiedValueElement = document.querySelector("#fileLastModifiedValue");
  let fileURLBase64Element = document.querySelector(
    "#fileURLBase64Value"
  );

  for (let file of filesItems) {
    if (file.getFileId() === fileId) {
      fileNameElement.textContent = file.getFileName();
      fileExtensionElement.textContent = file.getfileExtension();
      fileTypeValueElement.textContent = file.getFileType();
      fileSizeValueElement.textContent =
        (file.getFileSize() / 1024).toFixed(2) + "KB"; // Convertir a KB
      fileLastModifiedValueElement.textContent = file.getFileLastModified();
      //Configuracion para que se pueda descargar el archivo tocando el link
      fileURLBase64Element.setAttribute('href', file.getFileURLBase64());
    fileURLBase64Element.setAttribute('download', file.getFileName()); // Establece el nombre de archivo para la descarga
    fileURLBase64Element.setAttribute('target', '_blank'); // Abre en una nueva pestaña o ventana
    }
  }

  //Boton para cerrar el container item
  let deleteItem = document.querySelector(
    ".modal__item-information-delete-button"
  );

  deleteItem.addEventListener("click", () => {
    for (let index = 0; index < filesItems.length; index++) {
      if (filesItems[index].getFileId() === fileId) {
        filesItems.splice(index, 1);
        break;
      }
    }
    document.querySelector(".modal__item-information-continue-button").click();
    updateDropZone();
  });
}

// Función para obtener la ruta de la imagen según la extensión del archivo
function getImgByFileType(fileItem, fileInstance) {
    const imgPaths = {
      doc: "/imgs/wordDocument.png",
      docx: "/imgs/wordDocument.png",
      ppt: "/imgs/powerpointDocument.png",
      pptx: "/imgs/powerpointDocument.png",
      pdf: "/imgs/pdfDocument.png",
      txt: "/imgs/txtDocument.png",
      one: "/imgs/oneNoteDocument.png",
      onetoc2: "/imgs/oneNoteDocument.png",
      onepkg: "/imgs/oneNoteDocument.png",
      jpg: "/imgs/imgDocument.png",
      jpeg: "/imgs/imgDocument.png",
      png: "/imgs/imgDocument.png",
      gif: "/imgs/imgDocument.png",
      bmp: "/imgs/imgDocument.png",
      svg: "/imgs/imgDocument.png",
      webp: "/imgs/imgDocument.png",
      mp4: "/imgs/videoDocument.png",
      avi: "/imgs/videoDocument.png",
      mkv: "/imgs/videoDocument.png",
      mov: "/imgs/videoDocument.png",
      wmv: "/imgs/videoDocument.png",
      flv: "/imgs/videoDocument.png",
      webm: "/imgs/videoDocument.png",
      mp3: "/imgs/audioDocument.png",
      wav: "/imgs/audioDocument.png",
      ogg: "/imgs/audioDocument.png",
      flac: "/imgs/audioDocument.png",
      aac: "/imgs/audioDocument.png",
      wma: "/imgs/audioDocument.png",
      m4a: "/imgs/audioDocument.png",
      js: "/imgs/codeDocument.png",
      xml: "/imgs/codeDocument.png",
      html: "/imgs/codeDocument.png",
      py: "/imgs/codeDocument.png",
      java: "/imgs/codeDocument.png",
      css: "/imgs/codeDocument.png",
      cpp: "/imgs/codeDocument.png",
      c: "/imgs/codeDocument.png",
      php: "/imgs/codeDocument.png",
      rb: "/imgs/codeDocument.png",
      swift: "/imgs/codeDocument.png",
      go: "/imgs/codeDocument.png",
      ts: "/imgs/codeDocument.png",
      sh: "/imgs/codeDocument.png",
      json: "/imgs/codeDocument.png",
      yaml: "/imgs/codeDocument.png",
      md: "/imgs/codeDocument.png",
      default: "/imgs/otherDocument.png",
    };
  
    const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "svg", "webp"];

    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onloadend = () => {
            if (reader.result) {
                const base64Data = reader.result;
                fileItem.setFileURLBase64(base64Data);

                if (imageExtensions.includes(fileItem.getfileExtension())) {
                    resolve(base64Data);
                } else {
                    // Convert Base64 to Blob,para que la urlbase64 sea valida en todos los tipos de archivos
                    try {
                        const byteString = atob(base64Data.split(',')[1]);
                        const mimeString = base64Data.split(',')[0].split(':')[1].split(';')[0];
                        const ab = new ArrayBuffer(byteString.length);
                        const ia = new Uint8Array(ab);
                        for (let i = 0; i < byteString.length; i++) {
                            ia[i] = byteString.charCodeAt(i);
                        }
                        const blob = new Blob([ab], { type: mimeString });
                        const blobUrl = URL.createObjectURL(blob);

                        fileItem.setFileURLBase64(blobUrl);
                        resolve(imgPaths[fileItem.getfileExtension()] || imgPaths["default"]);
                    } catch (e) {
                        reject(new Error("Error processing Base64 data."));
                    }
                }
            } else {
                reject(new Error("Reader result is null."));
            }
        };

        reader.onerror = () => {
            reject(new Error("File reading error."));
        };

        reader.readAsDataURL(fileInstance);
    });
}

// Función para actualizar visualmente la zona de drop, si hay archivos con archivos y si no, de la manera inicial del dropZone
function updateDropZone() {
    // Vaciar el contenido actual de dropFileZone
    dropFileZone.innerHTML = "";

    // Si no hay archivos, mostrar el mensaje predeterminado
    if (filesItems.length === 0) {
        dropFileZone.innerHTML = `
            <div class="main__drop-file-target">
                <h3 class="main__drop-target-file-title">File section:</h3>
                <div class="main__drop-target-file-action-container">
                    <i class="fa-solid fa-file-arrow-up main__drop-target-file-icon"></i>
                    <div class="main__drop-target-text">Choose a file or drag it here</div>
                </div>
            </div>
        `;
        dropZoneWithoutFiles = document.querySelector(".main__drop-file-target");
    } else {
        // Crear un contenedor para los archivos agregados
        dropFileZone.innerHTML =
            '<h3 class="main__drop-target-file-title">File section:</h3><div class="main__drop-target-file-action-container--with-files"></div>';
        // Acceder a ese contenedor recien creado
        dropZoneWithFiles = document.querySelector(
            ".main__drop-target-file-action-container--with-files"
        );

        // Iterar sobre los archivos dropeados en el dropZone y crear elementos(item container) para cada uno
        filesItems.forEach((fileItem) => {
            let itemContainer = document.createElement("div");
            itemContainer.classList.add(
                "main__drop-target-file-action-container--with-files-item-container"
            );

            let imgContainer = document.createElement("div");
            imgContainer.classList.add("main__drop-target-files-item-img-container");

            let imgElement = document.createElement("img");
            imgElement.classList.add("main__drop-target-files-item-img");
            // Llamar a getImgByFileType y manejar el resultado correctamente
            getImgByFileType(fileItem, fileItem.getFile())
                .then((imgSrc) => {
                    imgElement.setAttribute("src", imgSrc);
                })
                .catch((error) => {
                    console.error("Error al obtener la imagen:", error);
                    imgElement.setAttribute("src", "/imgs/otherDocument.png"); // Imagen por defecto en caso de error
                });
            imgElement.setAttribute("alt", "File image");

            imgContainer.appendChild(imgElement);

            let tagContainer = document.createElement("div");
            tagContainer.classList.add("main__drop-target-files-item-tag-container");

            let tagElement = document.createElement("h3");
            tagElement.classList.add("main__drop-target-files-item-tag");
            tagElement.textContent = fileItem.getFileName();

            tagContainer.appendChild(tagElement);
            itemContainer.appendChild(imgContainer);
            itemContainer.appendChild(tagContainer);
            dropZoneWithFiles.appendChild(itemContainer);

            itemContainer.addEventListener("click", (e) => {
                let modal = document.querySelector("#ItemInformationModal");
                modal.showModal();
                showItemInformationModal(fileItem.getFileId());
            });
        });
    }
}

// Evento drop en dropFileZone para manejar archivos soltados
dropFileZone.addEventListener("drop", (e) => {
  e.preventDefault();
  let droppedFiles = e.dataTransfer.files;
  // Iterar sobre los archivos soltados y crear objetos FileItem
  for (const file of droppedFiles) {
    let fileItem = new FileItem(file);
    filesItems.push(fileItem);
  }

  // Actualizar visualmente la zona de drop con los archivos agregados
  updateDropZone();
});

// Evento dragover en dropFileZone para permitir soltar archivos
dropFileZone.addEventListener("dragover", (e) => {
  e.preventDefault();
});

let textDropInitialDropZone = document.querySelector(".main__drop-target-text");

//Eventos para manejar el estilo del dropZone cuando hay archivos arrastrados dentro del document, el if y else sirve para
//manejar el dropZone respectivo segun lo que hay
document.body.addEventListener("dragover", (e) => {
  e.preventDefault();
  if (filesItems.length >= 1) {
    dropZoneWithFiles.style.border = "4px dashed #add8e6";
  } else {
    dropZoneWithoutFiles.style.border = " 4px dashed #ff0000";
    textDropInitialDropZone.textContent = "Drag the file here";
  }
});
document.body.addEventListener("dragleave", (e) => {
  e.preventDefault();
  if (filesItems.length >= 1) {
    dropZoneWithFiles.style.border = "none";
  } else {
    dropZoneWithoutFiles.style.border = " 4px dashed  #add8e6";
    textDropInitialDropZone.textContent = "Choose a file or drag it here";
  }
});
document.body.addEventListener("dragend", (e) => {
  e.preventDefault();
  if (filesItems.length >= 1) {
    dropZoneWithFiles.style.border = "none";
  } else {
    dropZoneWithoutFiles.style.border = " 4px dashed  #add8e6";
    textDropInitialDropZone.textContent = "Choose a file or drag it here";
  }
});

// Clase FileItem para representar cada archivo soltado
class FileItem {
  #file = null;
  #fileName = null;
  #fileExtension = null;
  #fileType = null;
  #fileSize = null;
  #fileLastModified = null;
  #fileId = null;
  #fileURLBase64 = null;
  static fileIdAux=1;

  constructor(file) {
    this.#fileId = FileItem.fileIdAux;
    FileItem.fileIdAux++;
    this.#file = file;
    const lastDotIndex = file.name.lastIndexOf(".");
    if (lastDotIndex !== -1) {
      this.#fileName = file.name.substring(0, lastDotIndex);
      this.#fileExtension = file.name.substring(lastDotIndex + 1);
    } else {
      this.#fileName = file.name;
      this.#fileExtension = ""; // Manejar archivos sin extensión
    }
    this.#fileSize = file.size;
    this.#fileType = file.type;
    this.#fileLastModified = new Date(file.lastModified).toLocaleDateString(
      "en-US",
      {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }
    );
  }

  // Getters para obtener información del archivo
  getFileName() {
    return this.#fileName;
  }

  getfileExtension() {
    return this.#fileExtension;
  }

  getFileType() {
    return this.#fileType;
  }

  getFileSize() {
    return this.#fileSize;
  }

  getFileLastModified() {
    return this.#fileLastModified;
  }
  setFileId(fileId) {
    this.#fileId = fileId;
  }
  getFileId() {
    return this.#fileId;
  }

  getFile() {
    return this.#file;
  }
  // Método para establecer un nuevo archivo en la instancia actual
  setFile(file) {
    // Reasignar los valores internos con los datos del nuevo archivo
    this.#file = file;
    const lastDotIndex = file.name.lastIndexOf(".");
    if (lastDotIndex !== -1) {
      this.#fileName = file.name.substring(0, lastDotIndex);
      this.#fileExtension = file.name.substring(lastDotIndex + 1);
    } else {
      this.#fileName = file.name;
      this.#fileExtension = ""; // Manejar archivos sin extensión
    }
    this.#fileSize = file.size;
    this.#fileType = file.type;
    this.#fileLastModified = new Date(file.lastModified).toLocaleDateString(
      "en-US",
      {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }
    );
  }

  setFileURLBase64(fileURLBase64) {
    this.#fileURLBase64 = fileURLBase64;
  }
  getFileURLBase64() {
    return this.#fileURLBase64;
  }
}
