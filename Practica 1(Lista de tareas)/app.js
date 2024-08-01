class AssignmentsClass {
    constructor(AssigmentsContainer, id) {
        this.AssigmentsContainer = AssigmentsContainer;
        this.id = id;
    }

    getId() {
        return this.id;
    }

    setId(id) {
        this.id = id;
    }

      
    getAssigmentContainer() {
        return this.AssigmentsContainer;
    }

    setAssigmentContainer(setAssigmentContainer) {
        this.setAssigmentContainer = setAssigmentContainer;
    }

    // Esta es la variable que se va a ir subiendo por cada tarea, para de esta manera darle un id único a cada tarea
    static contador = 1;
}

// Arreglo que almacena objetos de tipo AssignmentsClass para almacenar cada tarea en este arreglo,
// para la hora de eliminarlos poder hacerlo más fácil
let assignments = [];

// Acción para agregar una tarea
const addButton = document.querySelector(".add-list-assigment-button");

addButton.addEventListener('click', () => {
    // Se almacena el texto del input, que es la nueva tarea a agregar
    const newAssigmentContent = document.querySelector(".new-assigment-input").value;

    // Se crea la estructura para agregar la nueva tarea al contenedor de las listas de la tarea
    const newAssigmentsContainer = document.createElement("div");
    // Campo de texto de la tarea 
    const textAreaAssigment = document.createElement("textarea");
    // Boton de borrar 
    const deleteAssigmentButton = document.createElement("button");

    // Se le agrega clases al contenedor, text-filed y delete-button
    newAssigmentsContainer.classList.add("newAssigmentsContainer");
    textAreaAssigment.classList.add("textAreaAssigment");
    deleteAssigmentButton.classList.add("deleteAssigmentButton");

    // Agrego texto a el boton 
    deleteAssigmentButton.innerText="Eliminar";
    
    // Agrego la información de la tarea a agregar al text-field de la nueva tarea 
    textAreaAssigment.value = newAssigmentContent;

    // Se agregan al contenedor de la tarea
    newAssigmentsContainer.appendChild(textAreaAssigment);
    newAssigmentsContainer.appendChild(deleteAssigmentButton);

    // Aquí agrego el div con la información de la nueva tarea al contenedor de las tareas de los div
    document.querySelector('.list-assignment-container').appendChild(newAssigmentsContainer);

    // Restablezco el valor del input en el que se agregan las tareas
    document.querySelector(".new-assigment-input").value = "";

    // Agrego este input a arreglo 
    tarea = new AssignmentsClass(newAssigmentsContainer, AssignmentsClass.contador);
    assignments.push(tarea)
    AssignmentsClass.contador++;
});

// Acción para borrar una tarea utilizando delegación de eventos
const container = document.querySelector('.list-assignment-container');

container.addEventListener('click', (event) => {
    // Verificamos si el clic ocurrió en un botón de eliminación
    if (event.target.classList.contains('deleteAssigmentButton')) {
        // Obtenemos el contenedor de la tarea
        const assigmentContainer = event.target.parentNode;

        // Eliminamos la tarea del arreglo
        assignments = assignments.filter(assignment => assignment.getAssigmentContainer() !== assigmentContainer);

        // Eliminamos todos los elementos secundarios del contenedor
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }

        // Actualizamos el contenido del contenedor principal
        for (let i = 0; i < assignments.length; i++) {
            container.appendChild(assignments[i].getAssigmentContainer());
        }
    }
});



function recorrerArreglo() {
    for (let i = 0; i < assignments.length; i++) {
        console.log(i);
    }
}
