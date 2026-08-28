/* =========================================================
   SAL'VES STUDIO
   CONTACT FORM 💌
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const form =
            document.getElementById(
                "contact-form"
            );


        if (!form) {
            return;
        }


        form.addEventListener(
            "submit",
            function(event) {

                event.preventDefault();


                const name =
                    document.getElementById(
                        "contact-name"
                    ).value.trim();


                if (!name) {
                    return;
                }


                form.reset();


                if (typeof showCuteMessage === "function") {

                    showCuteMessage(
                        `Thank you, ${name}! Your message was sent ♡`
                    );

                } else {

                    alert(
                        `Thank you, ${name}! Your message was sent ♡`
                    );

                }

            }
        );

    }
);