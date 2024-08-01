//introductory-section interactivity  

//Objects with the information to change with the events of click of the elements 'leftSlider' and 'rightslider' (Those variables are declared further down) 
let option1 = {
    imgUrl: "https://i.pinimg.com/564x/57/5d/44/575d44d4fc11193687c7d51ec86ef205.jpg",
    headText: "New Collection 🌏",
    extraText: "Tees, Hoodies, Kicks",
    buttonText: "Buy"
};

let option2 = {
    imgUrl: "https://i.pinimg.com/564x/ca/02/b6/ca02b6512adf35a9456d59911c7431cf.jpg",
    headText: "High Fashion",
    extraText: "",
    buttonText: "See"
};

let option3 = {
    imgUrl: "https://i.pinimg.com/564x/a7/45/1c/a7451c2948a210693672c8b6da5abfe5.jpg",
    headText: "Vintage Archives",
    extraText: "",
    buttonText: "Visit"
};


//Array that contains the objects with the information to change in the 'introductory-section'
let array=new Array(option1,option2,option3);

//Elements with the events
let leftSlider = document.querySelector(".introductory-section__left-slider");
let rightSlider = document.querySelector(".introductory-section__right-slider");

//The sliderControl that respresents the number of the slider section
let sliderControl =document.querySelector(".introductory-section__slider-control span")

let aux=0;

// Elements to change
let Img=document.querySelector(".introductory-section__photo");
let headText=document.querySelector(".head-text");
let extraText=document.querySelector(".extra-text");
let buttonText=document.querySelector(".button-text")


leftSlider.addEventListener("click", function() {
    if(aux>0){
        aux--;
        let stringAux = (aux + 1).toString() + "/3";
        sliderControl.innerText = stringAux;
    }
    else{
        return;
    }
    changeValues(aux);
});

rightSlider.addEventListener("click", function() {
    if(aux<2){
        aux++;
        let stringAux = (aux + 1).toString() + "/3";
        sliderControl.innerText = stringAux;
    }
    else{
        return;
    }
   changeValues(aux);
});

function changeValues(position){
    Img.setAttribute("src",array[aux].imgUrl);
    headText.textContent=array[aux].headText;
    extraText.textContent=array[aux].extraText;
    buttonText.textContent=array[aux].buttonText;
}


