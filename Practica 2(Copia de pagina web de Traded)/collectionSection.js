// collectionSection Interactivity

//Objects with the information to change in the slider-actions of the card(7 options/7objects)

let object1={
    imageUrl:"https://i.pinimg.com/736x/0f/07/a7/0f07a7da5f334cc3e5052ca50ab7808d.jpg",
    description:"Jackets and Outwear"
};


let object2={
    imageUrl:"https://i.pinimg.com/564x/3a/e6/e3/3ae6e3d8a91fb920b06fafa1fb4e8d6e.jpg",
    description:"Pants &amp Shorts"
};


let object3={
    imageUrl:"https://i.pinimg.com/564x/37/85/a1/3785a1a011303d6c613728acf9fb2e3b.jpg",
    description:"T Shirts"
};


let object4={
    imageUrl:"https://i.pinimg.com/564x/a4/2c/7e/a42c7efeab816dbeec01690d5087f2e0.jpg",
    description:"Caps &amp Beanies"
};


let object5={
    imageUrl:"https://i.pinimg.com/564x/d5/d1/88/d5d188cb748178d88f05d730a667dc7f.jpg",
    description:"Hoodies &amp Crewnecks"
};


let object6={
    imageUrl:"https://i.pinimg.com/564x/01/7b/86/017b86800a65c47956ed11edcdbda234.jpg",
    description:"Sneakers"
};


let object7={
    imageUrl:"https://i.pinimg.com/564x/0d/51/58/0d5158540a79eb7e6a83d0e6029de454.jpg",
    description:"Archives"
};

//Array with all the objects in differents positions,one position for each one
let collecionsArray=new Array(object1,object2,object3,object4,object5,object6,object7);

//Elements with the events to change the information of the card
let rightSlider1 = document.querySelector(".collections-section--right-slider");
let leftSlider1 = document.querySelector(".collections-section--left-slider");


//Element with the counter ,of the number of actual the position 
let counterSlider = document.querySelector(".collections-section__slider-counter");

//Elements to change
let img = document.querySelector(".collections-section__img");
let description = document.querySelector(".collections-sections__description");



//Postion of the array,it determinates the content of the card 
let position=0;

//Events to change the elements
rightSlider1.addEventListener("click", function(event) {
    if (position < 6) {
        changePosition(++position);
    }
});

leftSlider1.addEventListener("click", function(event) {
    if (position > 0) {
        changePosition(--position);
    }
});


function changePosition(positionNumber){
counterSlider.innerHTML=(positionNumber+1)+"/7";

img.setAttribute("src",collecionsArray[positionNumber].imageUrl);
description.innerHTML=collecionsArray[positionNumber].description;
}