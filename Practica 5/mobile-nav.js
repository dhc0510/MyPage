const mobileMenuToggle= document.querySelector(".header__nav-bar-mobile-icon-container");
const nav=document.querySelector(".header__list-navigation");
const headerContainer=document.querySelector('.header');
const mobileMenuIcon=document.querySelector('.header__nav-bar-icon');



mobileMenuToggle.addEventListener('click',()=>{


    //Para mostrar el mobile nav
    if (!nav.classList.contains("header-list-navigation--show-mobile-menu")) {
        nav.classList.add("header-list-navigation--show-mobile-menu");
        //Eliminar la clase que hace la barra de menu
        mobileMenuIcon.classList.remove("fa-bars");
        //Agregar la X
        mobileMenuIcon.classList.add("fa-xmark");
           // Deshabilitar scroll
           disableScroll();
    } 
    //Para mostrar el NO mobile nav
    else {
        nav.classList.remove("header-list-navigation--show-mobile-menu");
        //Eliminar la clase de la x
        mobileMenuIcon.classList.remove("fa-xmark");
        //Agregar la clase de la barra de menu
        mobileMenuIcon.classList.add("fa-bars");
        // Habilitar scroll
        enableScroll();
    
    }

    function disableScroll() {
        // Guardar la posición actual del scroll
        document.body.style.overflow = 'hidden';
    }
    
    function enableScroll() {
        // Restaurar el scroll
        document.body.style.overflow = '';
    }
    
});




