const fillFormButton=document.querySelector('#randomButton');


fillFormButton.addEventListener('click',(event)=>{

    let randomValues=randomData();

    const userNameInput= document.querySelector('.main__contact-section-form-item-username');
    const emailInput= document.querySelector('.main__contact-section-form-item-email');
    const phoneNumber= document.querySelector('.main__contact-section-form-item-phone-number');
    const comment= document.querySelector('.main__contact-section-form-item-comment');

    userNameInput.value=randomValues.userName;
    emailInput.value=randomValues.email ;
    phoneNumber.value=randomValues.phoneNumber;
    comment.value=randomValues.comment;
    
});

function randomData(){

    let randomUserNames = [
        "user123",
        "john_doe",
        "coolgirl22",
        "coding_master",
        "dreamer99",
        "gamer_xyz",
        "music_lover",
        "bookworm",
        "skywalker",
        "pizza_lover"
    ];
    
    let randomEmails = [
        "user123@example.com",
        "john.doe@gmail.com",
        "coolgirl22@yahoo.com",
        "coding_master@outlook.com",
        "dreamer99@example.com",
        "gamer_xyz@hotmail.com",
        "music_lover@gmail.com",
        "bookworm@yahoo.com",
        "skywalker@example.com",
        "pizza_lover@gmail.com"
    ];
    
    let randomPhoneNumbers = [
        "+1234567890",
        "+9876543210",
        "+1122334455",
        "+9988776655",
        "+5544332211",
        "+6677889900",
        "+1122334455",
        "+9988776655",
        "+5544332211",
        "+6677889900"
    ];
    
    let randomComments = [
       "Constructor",
       "Arquitecto",
       "Programador",
       "Contador",
       "Ingeniero industrial",
       "Odontologo",
       "Medico cirujano",
       "Medico internista"
    ];


    let randomValues={
        userName:randomUserNames[getRandomNumberInRange(0,randomUserNames.length)] ,
        email: randomEmails[getRandomNumberInRange(0,randomEmails.length)] ,
        phoneNumber:randomPhoneNumbers[getRandomNumberInRange(0,randomPhoneNumbers.length)],      
        comment: randomComments[getRandomNumberInRange(0,randomComments.length)]
    }

    return randomValues;
}

function getRandomNumberInRange(start,final){

  // Genera un número aleatorio entre 0 (inclusive) y 1 (exclusivo)
  const randomNumber = Math.random();
  // Calcula el número aleatorio dentro del rango especificado
  const numberInRange = Math.floor(randomNumber * (final - start)) + start;
  return numberInRange;
}
 