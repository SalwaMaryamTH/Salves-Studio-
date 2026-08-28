```javascript
/* =========================================================
   SAL'VES STUDIO
   PRODUCT DETAILS PAGE 🤎🧶
========================================================= */


/* =========================================================
   GET PRODUCT FROM URL
========================================================= */

function getProductFromURL() {

    const params =
        new URLSearchParams(
            window.location.search
        );

    const productId =
        params.get("id");


    if (!productId) {
        return null;
    }


    return products[productId];
}


/* =========================================================
   DISPLAY PRODUCT
========================================================= */

function displayProduct() {

    const container =
        document.getElementById(
            "product-details"
        );


    if (!container) {
        return;
    }


    const product =
        getProductFromURL();


    /* Product doesn't exist */

    if (!product) {

        container.innerHTML = `

            <div class="product-not-found">

                <div class="not-found-icon">
                    🧶
                </div>

                <h1>
                    Oops! This yarn friend
                    wandered away.
                </h1>

                <p>
                    We couldn't find that product.
                    Maybe it needs a tiny crochet nap. 🤎
                </p>

                <a
                    href="shop.html"
                    class="cute-button"
                >
                    Back to Shop ♡
                </a>

            </div>

        `;

        return;
    }


    /* Page title */

    document.title =
        `${product.name} | SAL'VES Studio`;


    /* Check wishlist */

    const saved =
        isInWishlist(product.id);


    /* Product HTML */

    container.innerHTML = `

        <div class="product-image-large">

            <div class="product-image-card">

                <span class="detail-badge">
                    Handmade ♡
                </span>

                <img
                    src="${product.image}"
                    alt="${product.name}"
                >

            </div>

        </div>



        <div class="product-detail-info">

            <p class="detail-category">
                ${formatCategory(product.category)}
            </p>


            <h1>
                ${product.name}
            </h1>


            <div class="detail-stars">
                ★★★★★
                <span>
                    Handmade with love
                </span>
            </div>


            <div class="detail-price">
                ${product.price} OMR
            </div>


            <p class="detail-description">
                ${product.description}
            </p>


            <div class="detail-divider"></div>


            <div class="detail-feature">

                <span>🧶</span>

                <div>

                    <strong>
                        Handmade
                    </strong>

                    <p>
                        Carefully crocheted by hand
                        with lots of love.
                    </p>

                </div>

            </div>


            <div class="detail-feature">

                <span>🤎</span>

                <div>

                    <strong>
                        One of a kind
                    </strong>

                    <p>
                        Small handmade differences
                        make every piece special.
                    </p>

                </div>

            </div>


            <div class="detail-feature">

                <span>🎁</span>

                <div>

                    <strong>
                        Gift ready
                    </strong>

                    <p>
                        Perfect for someone who
                        deserves a little yarn hug.
                    </p>

                </div>

            </div>


            <div class="detail-actions">

                <button
                    class="detail-cart-button"
                    id="detail-add-cart"
                >

                    Add to Cart 🧺

                </button>


                <button
                    class="detail-wishlist-button ${saved ? "saved" : ""}"
                    id="detail-wishlist"
                >

                    ${saved ? "♥ Saved" : "♡ Wishlist"}

                </button>

            </div>


            <div class="order-note">

                ✨ Handmade item •
                Please allow time for your little
                yarn friend to be prepared.

            </div>

        </div>

    `;


    /* Add cart */

    const cartButton =
        document.getElementById(
            "detail-add-cart"
        );


    cartButton.addEventListener(
        "click",
        () => {

            addToCart(product);

            cartButton.innerHTML =
                "Added to Cart! ♡";

            setTimeout(() => {

                cartButton.innerHTML =
                    "Add to Cart 🧺";

            }, 1500);

        }
    );


    /* Wishlist */

    const wishlistButton =
        document.getElementById(
            "detail-wishlist"
        );


    wishlistButton.addEventListener(
        "click",
        () => {

            toggleWishlist(product);


            if (
                isInWishlist(product.id)
            ) {

                wishlistButton.innerHTML =
                    "♥ Saved";

                wishlistButton.classList.add(
                    "saved"
                );

            } else {

                wishlistButton.innerHTML =
                    "♡ Wishlist";

                wishlistButton.classList.remove(
                    "saved"
                );

            }

        }
    );

}


/* =========================================================
   FORMAT CATEGORY
========================================================= */

function formatCategory(category) {

    const names = {

        plushies: "Crochet Plushie",

        bags: "Crochet Bag",

        accessories: "Crochet Accessory",

        gifts: "Handmade Gift"

    };


    return names[category] || "Handmade Crochet";

}


/* =========================================================
   START
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        displayProduct();

    }
);
```
/* =========================================================
   🛒 SHOP INTERACTIONS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const addButtons =
        document.querySelectorAll(".add-cart-button");

    addButtons.forEach(button => {

        button.addEventListener("click", () => {

            const productId =
                button.dataset.productId;

            if (!productId || !products[productId]) {
                return;
            }

            addToCart(products[productId]);

            button.textContent = "Added ♡";

            button.classList.add("cart-added");

            setTimeout(() => {

                button.textContent =
                    "Add to Cart 🧺";

                button.classList.remove(
                    "cart-added"
                );

            }, 1200);

        });

    });

});