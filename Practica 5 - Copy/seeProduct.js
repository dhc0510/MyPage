
document.addEventListener('DOMContentLoaded', function() {
    const seeProductImage = document.querySelector(".see-product-main__img");
    const seeProductName = document.querySelector(".see-product-main__product-name");
    const seeProductPrice = document.querySelector(".see-product-main__product-price");
    const seeProductSize = document.querySelector(".see-product-main__product-size");

    const selectedProduct=JSON.parse(localStorage.getItem("selectedProduct"));
            seeProductImage.setAttribute('src', selectedProduct.productimgPath);
            seeProductName.textContent = selectedProduct.productName;
            seeProductPrice.textContent = selectedProduct.productPrice;
            seeProductSize.textContent = selectedProduct.productSize;

});



