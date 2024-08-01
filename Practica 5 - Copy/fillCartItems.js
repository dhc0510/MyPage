import { DB, initializeDB } from './cartDBInitialization.js';

const totalPriceElementOfAllProducts=document.querySelector(".totalPriceOfAllProducts");


function createProductHTML(product) {
    const article = document.createElement('article');
    article.className = 'main__cartProductTableItem';
    article.id = `product-${product.codeProduct}`;

    const divInformation = document.createElement('div');
    divInformation.className = 'main__cartProductTableItem-information';

    const divProductInfo = document.createElement('div');
    divProductInfo.className = 'main__cartProductTableItem-product-information';

    const img = document.createElement('img');
    img.className = 'main__cartProductTableItem-image img';
    img.src = product.productimgPath;
    img.alt = 'Product image';

    const divNamePrice = document.createElement('div');
    divNamePrice.className = 'main__cartProductTableItem-name-and-price-container';

    const spanName = document.createElement('span');
    spanName.className = 'main__cartProductTableItem-name';
    spanName.textContent = product.productName;

    const smallPrice = document.createElement('small');
    smallPrice.className = 'main__cartProductTableItem-price';
    smallPrice.textContent = `₡ ${product.productPrice} CRC`;

    divNamePrice.appendChild(spanName);
    divNamePrice.appendChild(smallPrice);

    divProductInfo.appendChild(img);
    divProductInfo.appendChild(divNamePrice);

    const spanTotalPrice = document.createElement('span');
    spanTotalPrice.className = 'main__cartProductTableItem-total-price';
    spanTotalPrice.textContent =`₡ ${product.productPrice} CRC`;

    const divActions = document.createElement('div');
    divActions.className = 'main__cartProductTableItem-actions-container';

    const divQuantity = document.createElement('div');
    const inputQuantity = document.createElement('input');
    inputQuantity.className = 'see-product-main__quantity-input see-product-main__quantity-input--add';
    inputQuantity.type = 'range';
    inputQuantity.value = '1';
    inputQuantity.min = '1';
    inputQuantity.max = '10';
    inputQuantity.step = '1';
    inputQuantity.oninput = function() { updateQuantity(this.value,product,spanTotalPrice); };

    const spanQuantity = document.createElement('span');
    spanQuantity.id = `quantity-value-${product.codeProduct}`;
    spanQuantity.textContent = '1';

    divQuantity.appendChild(inputQuantity);
    divQuantity.appendChild(spanQuantity);

    const spanDelete = document.createElement('span');
    spanDelete.className = 'main__cartProductTableItem-delete-item';
    spanDelete.innerHTML = '<i class="fa-solid fa-trash"></i>';
    spanDelete.addEventListener('click', function() {
        deleteProduct(product.productId, article);
    });

    divActions.appendChild(divQuantity);
    divActions.appendChild(spanDelete);

    divInformation.appendChild(divProductInfo);
    divInformation.appendChild(spanTotalPrice);
    article.appendChild(divInformation);
    article.appendChild(divActions);

    return article;
}

function updateTotalPrice() {
    let transaction = DB.transaction(['productsInCart'], 'readonly');
    let productsInCartStore = transaction.objectStore('productsInCart');
    let cursorRequest = productsInCartStore.openCursor();
    let total = 0;

    cursorRequest.onsuccess = function(e) {
        const cursor = e.target.result;
        if (cursor) {
            let product = cursor.value;
            let quantityElement = document.getElementById(`quantity-value-${product.codeProduct}`);
            let quantity = parseInt(quantityElement.textContent);
            let price = parseFloat(product.productPrice.replace(/[^0-9.-]+/g, ""));
            total += price * quantity;
            cursor.continue();
        } else {
            // No more entries: update total price in DOM
            totalPriceElementOfAllProducts.textContent = ` ${total.toFixed(3)} `;
        }
    };

    cursorRequest.onerror = function(e) {
        console.error("Error reading cursor:", e.target.error);
    };
}



function deleteProduct(productId, articleElement) {
    let transaction = DB.transaction(['productsInCart'], 'readwrite');
    let productsInCartTable = transaction.objectStore('productsInCart');
    let request = productsInCartTable.delete(productId);

    request.onsuccess = () => {
        console.log(`Product ${productId} removed from cart`);
        articleElement.remove(); 
        updateTotalPrice();
    };

    request.onerror = (event) => {
        console.error('Error removing product from cart:', event.target.error);
    };
}

function updateQuantity(value, product,spanTotalPrice) {
    value = parseInt(value);
    let price = parseFloat(product.productPrice.replace(/[^0-9.-]+/g, ""));
    document.getElementById(`quantity-value-${product.codeProduct}`).textContent = value;
    let totalPrice = price * value;
    spanTotalPrice.textContent = "₡"+totalPrice.toFixed(3)+" CRC";

    updateTotalPrice();
}


initializeDB().then(() => {
    const cartItemsContainer = document.querySelector(".main__cartProductTableItems-container");

    let transaction = DB.transaction(['productsInCart'], 'readonly');
    let productsInCartTable = transaction.objectStore('productsInCart');
    const request = productsInCartTable.openCursor(null, 'prev');
    request.addEventListener('success', (e) => {
        const cursor = e.target.result;
        if (cursor) {
            let product = cursor.value;
            const productElement = createProductHTML(product);
            cartItemsContainer.appendChild(productElement);  
            cursor.continue();
        }
        updateTotalPrice();
    });

}).catch(error => {
    console.error("Failed to initialize the database:", error);
});




 