import { DB, initializeDB } from './cartDBInitialization.js';

initializeDB().then(() => {
    const addToCartButton = document.querySelector(".see-product-main__add-to-cart-button");

    addToCartButton.addEventListener("click", () => {
        let transaction=DB.transaction(['productsInCart'],'readwrite',{ durability: 'strict' });
        let productsInCartTable=transaction.objectStore('productsInCart');
        //add the selected product
        let IDBRequest=productsInCartTable.add(JSON.parse(localStorage.getItem("selectedProduct")));

        IDBRequest.addEventListener("success",(e)=>{
            console.log("Entro al evento success y el key del registro anadido es"+e.target.result);
        });

        transaction.addEventListener("complete",()=>{
            console.log("El producto fue agregado exitosamente al carrito");

            window.location="/cart.html";
        });

    });
}).catch(error => {
    console.error("Failed to initialize the database:", error);
});



