/* =========================================================
   SAL'VES STUDIO
   WISHLIST PAGE ♡
========================================================= */


function displayWishlist() {

    const grid =
        document.getElementById("wishlist-grid");

    const emptyMessage =
        document.getElementById("empty-wishlist");


    if (!grid || !emptyMessage) {
        return;
    }


    /* Get saved products */

    const savedProducts =
        JSON.parse(
            localStorage.getItem("salvesWishlist")
        ) || [];


    /* ================= EMPTY ================= */

    if (savedProducts.length === 0) {

        grid.innerHTML = "";

        emptyMessage.style.display = "block";

        return;
    }


    /* ================= PRODUCTS ================= */

    emptyMessage.style.display = "none";


    grid.innerHTML = "";


    savedProducts.forEach(product => {

        const card =
            document.createElement("article");

        card.className = "product-card";


        card.innerHTML = `

            <div class="product-image">

                <button
                    class="wishlist-remove"
                    data-id="${product.id}"
                    aria-label="Remove from wishlist"
                >
                    ♥
                </button>

                <img
                    src="${product.image}"
                    alt="${product.name}"
                >

            </div>


            <div class="product-info">

                <p class="product-category">
                    ${formatWishlistCategory(product.category)}
                </p>


                <h3>
                    ${product.name}
                </h3>


                <p class="product-description">
                    ${product.description}
                </p>


                <div class="product-bottom">

                    <strong>
                        ${product.price} OMR
                    </strong>


                    <button
                        class="add-cart-button wishlist-cart"
                        data-id="${product.id}"
                    >
                        Add to Cart 🧺
                    </button>

                </div>

            </div>

        `;


        grid.appendChild(card);

    });


    setupWishlistRemoveButtons();

    setupWishlistCartButtons();

    setupWishlistProductLinks();

}


/* =========================================================
   REMOVE FROM WISHLIST
========================================================= */

function setupWishlistRemoveButtons() {

    const buttons =
        document.querySelectorAll(
            ".wishlist-remove"
        );


    buttons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const productId =
                    button.dataset.id;


                wishlist =
                    wishlist.filter(
                        product =>
                            product.id !== productId
                    );


                saveWishlist();

                displayWishlist();


                showCuteMessage(
                    "Removed from your wishlist ♡"
                );

            }
        );

    });

}


/* =========================================================
   ADD WISHLIST ITEM TO CART
========================================================= */

function setupWishlistCartButtons() {

    const buttons =
        document.querySelectorAll(
            ".wishlist-cart"
        );


    buttons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const productId =
                    button.dataset.id;


                const product =
                    products[productId];


                if (!product) {
                    return;
                }


                addToCart(product);


                button.innerHTML =
                    "Added! ♡";


                setTimeout(() => {

                    button.innerHTML =
                        "Add to Cart 🧺";

                }, 1200);

            }
        );

    });

}


/* =========================================================
   OPEN PRODUCT
========================================================= */

function setupWishlistProductLinks() {

    const images =
        document.querySelectorAll(
            "#wishlist-grid .product-image img"
        );


    images.forEach(image => {

        image.style.cursor = "pointer";


        image.addEventListener(
            "click",
            () => {

                const card =
                    image.closest(
                        ".product-card"
                    );


                const button =
                    card.querySelector(
                        ".wishlist-remove"
                    );


                const productId =
                    button.dataset.id;


                window.location.href =
                    `product.html?id=${productId}`;

            }
        );

    });

}


/* =========================================================
   CATEGORY NAME
========================================================= */

function formatWishlistCategory(category) {

    const names = {

        plushies: "Crochet Plushie",

        bags: "Crochet Bag",

        accessories: "Crochet Accessory",

        gifts: "Handmade Gift"

    };


    return names[category] ||
        "Handmade Crochet";

}


/* =========================================================
   START
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        displayWishlist();

    }
);