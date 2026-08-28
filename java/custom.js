/* =========================================================
   SAL'VES STUDIO
   CUSTOM REQUESTS 🎀
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const form =
            document.getElementById(
                "custom-form"
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
                        "custom-name"
                    ).value.trim();


                const type =
                    document.getElementById(
                        "custom-type"
                    ).value;


                if (!name || !type) {
                    return;
                }


                const request = {

                    name: name,

                    email:
                        document.getElementById(
                            "custom-email"
                        ).value.trim(),

                    type: type,

                    colors:
                        document.getElementById(
                            "custom-colors"
                        ).value.trim(),

                    details:
                        document.getElementById(
                            "custom-details"
                        ).value.trim(),

                    date:
                        new Date().toISOString()

                };


                localStorage.setItem(
                    "salvesCustomRequest",
                    JSON.stringify(request)
                );


                form.reset();


                if (
                    typeof showCuteMessage ===
                    "function"
                ) {

                    showCuteMessage(
                        "Custom request sent! We'll be in touch ♡"
                    );

                } else {

                    alert(
                        "Custom request sent! ♡"
                    );

                }

            }
        );

    }
);