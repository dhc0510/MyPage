let DB = null;

function initializeDB() {
    return new Promise((resolve, reject) => {
        const DBFactory = window.indexedDB;
        const dbRequest = DBFactory.open("cartItems", 1);

        dbRequest.onerror = () => {
            console.error("Error opening database.");
            reject("Error opening database.");
        };

        dbRequest.onsuccess = () => {
            DB = dbRequest.result;
            console.log("Database opened successfully.");
            resolve(DB);
        };

        dbRequest.onupgradeneeded = (event) => {
            const db = event.target.result;
            db.createObjectStore("productsInCart", {
                keyPath: "productID",
                autoIncrement: true
            });
        };
    });
}

export { DB, initializeDB };
