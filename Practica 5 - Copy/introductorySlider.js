const sliderContainer=document.querySelector(".main__introductory-slider-container");
const sliderNumber=document.querySelector(".main__introductory-img-slider-number");


// Code of the slider event of change the number
sliderContainer.addEventListener('click',(event)=>{


    let sliderNumberValue=sliderNumber.textContent;
    const target=event.target;
    let updatedSliderNumberValue=0;

    if(target.classList.contains("main__introductory-img-slider-container-left") || target.classList.contains("main__introductory-img-slider-container-rigth") ){

        if(target.classList.contains("main__introductory-img-slider-container-left")){

            if(sliderNumberValue==="1/3"){
                updatedSliderNumberValue="3/3";
            }
            else{
                updatedSliderNumberValue=updateSliderNumberValue(sliderNumberValue,"substract");
            }
       }
    
       else if(target.classList.contains("main__introductory-img-slider-container-rigth")){
    
            if(sliderNumberValue==="3/3"){
                updatedSliderNumberValue="1/3";
            }
            else{
                updatedSliderNumberValue=updateSliderNumberValue(sliderNumberValue,"add");
            }
        }
        sliderNumber.textContent=updatedSliderNumberValue;
        updateCardAndImageContent(updatedSliderNumberValue);

    }

});




function updateSliderNumberValue(sliderNumberValue,type){

    
    switch(type){

        case "substract":

            if(sliderNumberValue==="2/3"){
                return "1/3";
            }
            else if (sliderNumberValue==="3/3"){
                return "2/3";
            }
    
        break;

        case "add":

            if(sliderNumberValue==="1/3"){
                return "2/3";
            }
            else if(sliderNumberValue==="2/3"){
                return "3/3";
            }

        break;

        default:
            throw new Error('Critical error');

    }
    
}


    function updateCardAndImageContent(sliderNumberValue){

        let cardTitle=null;
        let cardDescription=null;
        let cardButtonText=null;
        let backgroundImgSrc=null;

        if(sliderNumberValue==="1/3"){
            cardTitle="New Collection";
            cardDescription="¡Ya Disponible!";
            cardButtonText="Buy";
            backgroundImgSrc="imgs/introductory\ background\ imgjpg.jpg";
        }
        else if(sliderNumberValue==="2/3"){
            cardTitle="High Fashion";
            cardDescription=null;
            cardButtonText="See";
            backgroundImgSrc="imgs/introductory\ background\ img2.jpg";
        }
        else if(sliderNumberValue==="3/3"){
            cardTitle="Vintage Archives";
            cardDescription=null;
            cardButtonText="Visit";
            backgroundImgSrc="imgs/introductory\ background\ img3.jpg";
        }
        else{
            throw new Error('Critical error');
        }

        

        const cardTitleElement=document.querySelector(".main__extra-information-title");
        const cardButtonElement=document.querySelector(".main__extra-information-button");
        const backgroundImgElement=document.querySelector(".main__introductory-image-container");
        const cardDescriptionElement=document.querySelector(".main__extra-information-description");

  
        cardTitleElement.textContent=cardTitle;
        cardDescriptionElement.textContent=cardDescription;
        cardButtonElement.textContent =cardButtonText;
        backgroundImgElement.style.setProperty('background-image', 'url("' + backgroundImgSrc + '")');

    }      