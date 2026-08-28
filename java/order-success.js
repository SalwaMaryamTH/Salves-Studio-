/* =========================================================
   SAL'VES STUDIO
   ORDER SUCCESS
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const orderNumber =
            document.getElementById(
                "order-number"
            );


        const params =
            new URLSearchParams(
                window.location.search
            );


        const order =
            params.get("order");


        if (order && orderNumber) {

            orderNumber.textContent =
                order;

        }

    }
);