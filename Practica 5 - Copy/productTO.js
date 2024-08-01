class productTO {
    #codeProduct;
    #productName;
    #productPrice;
    #productSize;
    #productimgPath;



    constructor(codeProduct, productName, productPrice, productSize, productimgPath) {
        this.#codeProduct = codeProduct;
        this.#productName = productName;
        this.#productPrice = productPrice;
        this.#productSize = productSize;
        this.#productimgPath = productimgPath;
    }

    // Getters and setters
    get codeProduct() {
        return this.#codeProduct;
    }

    set codeProduct(value) {
        this.#codeProduct = value;
    }

    get productName() {
        return this.#productName;
    }

    set productName(value) {
        this.#productName = value;
    }

    get productPrice() {
        return this.#productPrice;
    }

    set productPrice(value) {
        this.#productPrice = value;
    }

    get productSize() {
        return this.#productSize;
    }

    set productSize(value) {
        this.#productSize = value;
    }

    get productimgPath() {
        return this.#productimgPath;
    }

    set productimgPath(value) {
        this.#productimgPath = value;
    }



}