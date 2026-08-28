/* =========================================================
   SAL'VES STUDIO
   CHECKOUT PAGE 🧾🤎
========================================================= */

function displayCheckout() {

    const itemsContainer =
        document.getElementById("checkout-items");

    const itemCount =
        document.getElementById("checkout-item-count");

    const subtotalElement =
        document.getElementById("checkout-subtotal");

    const totalElement =
        document.getElementById("checkout-total");


    if (!itemsContainer) {
        return;
    }


    if (cart.length === 0) {

        itemsContainer.innerHTML = `
            <div class="checkout-empty">
                <div>🧸</div>
                <p>Your cart is empty!</p>
                <a href="shop.html">
                    Go to Shop ♡
                </a>
            </div>
        `;

        if (itemCount) {
            itemCount.textContent = "0";
        }

        if (subtotalElement) {
            subtotalElement.textContent = "0.00";
        }

        if (totalElement) {
            totalElement.textContent = "0.00";
        }

        return;
    }


    itemsContainer.innerHTML = "";


    cart.forEach(item => {

        const itemElement =
            document.createElement("div");

        itemElement.className =
            "checkout-item";


        itemElement.innerHTML = `

            <div class="checkout-item-image">

                <img
                    src="${item.image}"
                    alt="${item.name}"
                >

                <span>
                    ${item.quantity}
                </span>

            </div>


            <div class="checkout-item-info">

                <h3>
                    ${item.name}
                </h3>

                <p>
                    ${item.price} OMR each
                </p>

            </div>


            <strong>
                ${(item.price * item.quantity).toFixed(2)}
                OMR
            </strong>

        `;


        itemsContainer.appendChild(itemElement);

    });


    const quantity =
        cart.reduce(
            (total, item) =>
                total + item.quantity,
            0
        );


    const subtotal =
        cart.reduce(
            (total, item) =>
                total + item.price * item.quantity,
            0
        );


    if (itemCount) {
        itemCount.textContent = quantity;
    }

    if (subtotalElement) {
        subtotalElement.textContent =
            subtotal.toFixed(2);
    }

    if (totalElement) {
        totalElement.textContent =
            subtotal.toFixed(2);
    }

}


/* =========================================================
   PLACE ORDER
========================================================= */

function setupCheckoutForm() {

    const form =
        document.getElementById("checkout-form");


    if (!form) {
        return;
    }


    form.addEventListener("submit", function(event) {

        event.preventDefault();


        if (cart.length === 0) {

            showCuteMessage(
                "Your cart is empty! 🧺"
            );

            return;
        }


        const name =
            document.getElementById(
                "customer-name"
            ).value.trim();


        const email =
            document.getElementById(
                "customer-email"
            ).value.trim();


        if (!name || !email) {
            return;
        }


        const orderNumber =
            "SAL-" +
            Date.now().toString().slice(-6);


        localStorage.setItem(
            "salvesLastOrder",
            JSON.stringify({
                orderNumber: orderNumber,
                name: name,
                items: cart,
                total: cart.reduce(
                    (total, item) =>
                        total +
                        item.price * item.quantity,
                    0
                )
            })
        );


        localStorage.removeItem("salvesCart");


        window.location.href =
            `order-success.html?order=${orderNumber}`;

    });

}


/* =========================================================
   START
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        displayCheckout();

        setupCheckoutForm();

    }
);