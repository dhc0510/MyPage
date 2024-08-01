const products=[];


document.addEventListener('DOMContentLoaded', function() {
    // Aquí lo que se hace es agregar todos los productos que están en la sección de "recently added" al array de la clase Products que almacena los productos
    const productContainer = document.querySelector(".main__recently-add-items-container");


    if (productContainer) {
        // Retorna HTMLCollection
        const productsElements = productContainer.getElementsByClassName("main__recently-add-item-container");

        (function() {
            // Recorrer y sacar toda la información de todos los productos del HTMLCollection para almacenarlo como objetos de la clase Products
            let aux = 0;
            for (const productElement of productsElements) {
                const productImgElement = productElement.querySelector(".main__rencently-add-item-img");
                const productNameElement = productElement.querySelector(".main__rencently-add-item-product-name");
                const productPriceElement = productElement.querySelector(".main__rencently-add-item-price");
                const productSizeElement = productElement.querySelector(".main__rencently-add-item-product-size");
                const codeProduct = aux++;

                const product = new productTO(
                    codeProduct,
                    productNameElement.textContent,
                    productPriceElement.textContent,
                    productSizeElement.textContent,
                    productImgElement.getAttribute("src")
                );

                products.push(product);
                // Añadir el ID del producto como atributo data-product-id
                productElement.setAttribute("data-product-id", codeProduct);        
            }
        })();


        Array.from(productsElements).forEach(element => {
            element.addEventListener('click', () => {
                selectedcodeProduct= element.getAttribute('data-product-id');
                  //Agrego el selectedProduct al localStorage para mostrarlo
                    for(i=0;i<products.length;i++){
                        if(products[i].codeProduct==selectedcodeProduct){
                            let selectedProduct={
                                codeProduct:selectedcodeProduct,
                                productimgPath:products[i].productimgPath,
                                productName:products[i].productName,
                                productPrice:products[i].productPrice,
                                seeProductSize:products[i].productSize
                               }
                            localStorage.setItem('selectedProduct',JSON.stringify(selectedProduct));
                            window.location.href = '/seeProduct.html';
                            return;
                        }

                    }
            });
        });
    } else {
        console.error("No se encontró el contenedor de productos.");
    }
});
