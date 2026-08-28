document.addEventListener("DOMContentLoaded", function () {

    const buttons = document.querySelectorAll(".add-cart-button");

    buttons.forEach(function (button) {

        button.addEventListener("click", function () {

            const productId = button.dataset.productId;

            const productList = {
                "blossom-bunny": {
                    name: "Blossom Bunny",
                    price: 8
                },

                "cozy-crochet-bag": {
                    name: "Cozy Crochet Bag",
                    price: 25
                },

                "little-teddy-bear": {
                    name: "Little Teddy Bear",
                    price: 7
                }
            };

            const product = productList[productId];

            if (!product) {
                return;
            }

            let cart = JSON.parse(
                localStorage.getItem("salves_cart")
            ) || [];

            const existingItem = cart.find(
                item => item.name === product.name
            );

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    name: product.name,
                    price: product.price,
                    quantity: 1
                });
            }

            localStorage.setItem(
                "salves_cart",
                JSON.stringify(cart)
            );

            updateCartCount();

            button.textContent = "Added ✓";

            setTimeout(function () {
                button.textContent = "Add to Cart 🧺";
            }, 1200);

        });

    });

    updateCartCount();

});


function updateCartCount() {

    const cart = JSON.parse(
        localStorage.getItem("salves_cart")
    ) || [];

    let totalItems = 0;

    cart.forEach(function (item) {
        totalItems += item.quantity;
    });

    const cartCount = document.getElementById("cart-count");

    if (cartCount) {
        cartCount.textContent = totalItems;
    }
}document.addEventListener("DOMContentLoaded", function () {

    const buttons = document.querySelectorAll(".add-cart-button");

    buttons.forEach(function (button) {

        button.addEventListener("click", function () {

            const productId = button.dataset.productId;

            const productList = {
                "blossom-bunny": {
                    name: "Blossom Bunny",
                    price: 8
                },

                "cozy-crochet-bag": {
                    name: "Cozy Crochet Bag",
                    price: 25
                },

                "little-teddy-bear": {
                    name: "Little Teddy Bear",
                    price: 7
                }
            };

            const product = productList[productId];

            if (!product) {
                return;
            }

            let cart = JSON.parse(
                localStorage.getItem("salves_cart")
            ) || [];

            const existingItem = cart.find(
                item => item.name === product.name
            );

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    name: product.name,
                    price: product.price,
                    quantity: 1
                });
            }

            localStorage.setItem(
                "salves_cart",
                JSON.stringify(cart)
            );

            updateCartCount();

            button.textContent = "Added ✓";

            setTimeout(function () {
                button.textContent = "Add to Cart 🧺";
            }, 1200);

        });

    });

    updateCartCount();

});


function updateCartCount() {

    const cart = JSON.parse(
        localStorage.getItem("salves_cart")
    ) || [];

    let totalItems = 0;

    cart.forEach(function (item) {
        totalItems += item.quantity;
    });

    const cartCount = document.getElementById("cart-count");

    if (cartCount) {
        cartCount.textContent = totalItems;
    }
}