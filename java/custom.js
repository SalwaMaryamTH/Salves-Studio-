document.addEventListener("DOMContentLoaded", () => {

  /* =========================================================
     EMAILJS SETTINGS
     ========================================================= */

  /*
    AFTER you create your EmailJS account, put your 3 values here.

    Example:

    const EMAILJS_CONFIG = {
      publicKey: "abc123",
      serviceId: "service_xxxxxx",
      templateId: "template_xxxxxx"
    };

  */

  const EMAILJS_CONFIG = {
    publicKey: "YOUR_PUBLIC_KEY",
    serviceId: "YOUR_SERVICE_ID",
    templateId: "YOUR_TEMPLATE_ID"
  };


  /* =========================================================
     STATE
     ========================================================= */

  let selectedPiece = null;

  let colorMode = "one";

  let requiredColors = 1;

  let selectedColors = [];

  let decorations = [];

  let decorationCounter = 0;


  /* =========================================================
     ELEMENTS
     ========================================================= */

  const canvas = document.getElementById("design-canvas");
  const baseDesign = document.getElementById("base-design");

  const selectedSwatches =
    document.getElementById("selected-swatches");

  const colorInstruction =
    document.getElementById("color-instruction");

  const mixNumber =
    document.getElementById("mix-number");

  const summary =
    document.getElementById("choices-summary");

  const form =
    document.getElementById("custom-form");

  const status =
    document.getElementById("form-status");


  /* =========================================================
     EMAILJS INITIALIZATION
     ========================================================= */

  if (
    window.emailjs &&
    EMAILJS_CONFIG.publicKey !== "YOUR_PUBLIC_KEY"
  ) {

    emailjs.init({
      publicKey: EMAILJS_CONFIG.publicKey
    });

  }


  /* =========================================================
     PIECE SELECTION
     ========================================================= */

  const choices =
    document.querySelectorAll(".choice:not(.decoration-choice)");

  choices.forEach(button => {

    button.addEventListener("click", () => {

      choices.forEach(item => {
        item.classList.remove("active");
      });

      button.classList.add("active");

      selectedPiece = {
        type: button.dataset.type,
        name: button.dataset.name
      };

      drawBase();

      updateSummary();

    });

  });


  /* =========================================================
     DRAW MAIN PIECE
     ========================================================= */

  function drawBase() {

    if (!selectedPiece) {

      baseDesign.innerHTML = `
        <div class="preview-empty">
          🧶
          <span>Choose something from the left to begin</span>
        </div>
      `;

      return;
    }


    let html = "";


    switch (selectedPiece.type) {

      case "bag":

        html = `
          <div class="base-shape">
            <div class="bag-shape"></div>
          </div>
        `;

        break;


      case "tote":

        html = `
          <div class="base-shape">
            <div class="bag-shape tote"></div>
          </div>
        `;

        break;


      case "crossbody":

        html = `
          <div class="base-shape">
            <div class="bag-shape crossbody"></div>
          </div>
        `;

        break;


      case "grannybag":

        html = `
          <div class="base-shape">
            <div
              class="bag-shape"
              style="
                background:
                  repeating-linear-gradient(
                    45deg,
                    var(--design-color, #d9b19d) 0 25px,
                    rgba(255,255,255,.35) 25px 50px
                  );
              "
            ></div>
          </div>
        `;

        break;


      case "mini":

        html = `
          <div class="base-shape">
            <div class="bag-shape mini"></div>
          </div>
        `;

        break;


      case "bucket":

        html = `
          <div class="base-shape">
            <div class="bag-shape bucket"></div>
          </div>
        `;

        break;


      case "clutch":

        html = `
          <div class="base-shape">
            <div class="bag-shape clutch"></div>
          </div>
        `;

        break;


      case "dress":

        html = `
          <div class="base-shape">
            <div class="dress-shape"></div>
          </div>
        `;

        break;


      case "longdress":

        html = `
          <div class="base-shape">
            <div class="dress-shape long-dress"></div>
          </div>
        `;

        break;


      case "aline":

        html = `
          <div class="base-shape">
            <div class="dress-shape a-line"></div>
          </div>
        `;

        break;


      case "sweater":

        html = `
          <div class="base-shape">
            <div class="sweater-shape"></div>
          </div>
        `;

        break;


      case "crop":

        html = `
          <div class="base-shape">
            <div class="crop-shape"></div>
          </div>
        `;

        break;


      case "pants":

        html = `
          <div class="base-shape">
            <div class="pants-shape">

              <div class="pant-leg"></div>
              <div class="pant-leg"></div>

            </div>
          </div>
        `;

        break;

    }


    baseDesign.innerHTML = html;

    applyColors();

  }


  /* =========================================================
     COLOR MODE
     ========================================================= */

  const modeButtons =
    document.querySelectorAll(".mode-btn");


  modeButtons.forEach(button => {

    button.addEventListener("click", () => {

      modeButtons.forEach(btn => {
        btn.classList.remove("active");
      });

      button.classList.add("active");

      colorMode = button.dataset.mode;


      if (colorMode === "one") {

        requiredColors = 1;

        mixNumber.classList.remove("show");

        colorInstruction.textContent =
          "Choose 1 colour.";

      }


      if (colorMode === "two") {

        requiredColors = 2;

        mixNumber.classList.remove("show");

        colorInstruction.textContent =
          "Choose exactly 2 colours.";

      }


      if (colorMode === "mix") {

        mixNumber.classList.add("show");

        requiredColors = 3;

        colorInstruction.textContent =
          "Choose 3 colours to start. Pick the number above for more.";

      }


      selectedColors = [];

      refreshColorButtons();

      updateSelectedColors();

      applyColors();

      updateSummary();

    });

  });


  /* =========================================================
     MIX NUMBER
     ========================================================= */

  const numberButtons =
    document.querySelectorAll(".number-btn");


  numberButtons.forEach(button => {

    button.addEventListener("click", () => {

      numberButtons.forEach(btn => {
        btn.classList.remove("active");
      });

      button.classList.add("active");

      requiredColors =
        Number(button.dataset.number);

      selectedColors = [];

      colorInstruction.textContent =
        `Choose exactly ${requiredColors} colours.`;

      refreshColorButtons();

      updateSelectedColors();

      applyColors();

      updateSummary();

    });

  });


  /* =========================================================
     COLOR SELECTION
     ========================================================= */

  const colorButtons =
    document.querySelectorAll(".color");


  colorButtons.forEach(button => {

    button.addEventListener("click", () => {

      const color =
        button.dataset.color;


      const alreadySelected =
        selectedColors.includes(color);


      if (alreadySelected) {

        selectedColors =
          selectedColors.filter(item => item !== color);

      }

      else {

        if (selectedColors.length >= requiredColors) {

          selectedColors.shift();

        }

        selectedColors.push(color);

      }


      refreshColorButtons();

      updateSelectedColors();

      applyColors();

      updateSummary();

    });

  });


  function refreshColorButtons() {

    colorButtons.forEach(button => {

      if (
        selectedColors.includes(button.dataset.color)
      ) {

        button.classList.add("selected");

      }

      else {

        button.classList.remove("selected");

      }

    });

  }


  function updateSelectedColors() {

    if (selectedColors.length === 0) {

      selectedSwatches.innerHTML = `
        <span style="font-size:11px;color:#9a8175;">
          None selected
        </span>
      `;

      return;

    }


    selectedSwatches.innerHTML =
      selectedColors
        .map(color => `
          <span
            class="selected-swatch"
            style="background:${color}"
            title="${color}"
          ></span>
        `)
        .join("");

  }


  /* =========================================================
     APPLY COLORS TO DESIGN
     ========================================================= */

  function applyColors() {

    if (!selectedColors.length) {

      document.documentElement.style
        .setProperty("--design-color", "#d9b19d");

      return;

    }


    const design =
      document.querySelectorAll(
        ".bag-shape, .dress-shape, .sweater-shape, .crop-shape, .pant-leg"
      );


    let background;


    if (selectedColors.length === 1) {

      background =
        selectedColors[0];

    }


    else {

      const stops =
        selectedColors.map(
          (color, index) => {

            const percentage =
              Math.round(
                index /
                (selectedColors.length - 1) *
                100
              );

            return `${color} ${percentage}%`;

          }
        ).join(",");


      background =
        `linear-gradient(135deg, ${stops})`;

    }


    design.forEach(element => {

      element.style.background =
        background;

      element.style.setProperty(
        "--design-color",
        selectedColors[0]
      );

    });


    document.documentElement.style
      .setProperty(
        "--design-color",
        selectedColors[0]
      );

  }


  /* =========================================================
     DONE WITH COLOURS
     ========================================================= */

  document
    .getElementById("done-colors")
    .addEventListener("click", () => {

      if (!selectedColors.length) {

        alert(
          "Please choose your colour first ♡"
        );

        return;

      }


      if (selectedColors.length !== requiredColors) {

        alert(
          `Please choose ${requiredColors} colours.`
        );

        return;

      }


      alert(
        "Colours saved! ♡"
      );

      updateSummary();

    });


  /* =========================================================
     DECORATIONS
     ========================================================= */

  const decorationButtons =
    document.querySelectorAll(
      ".decoration-choice"
    );


  decorationButtons.forEach(button => {

    button.addEventListener("click", () => {

      const symbol =
        button.dataset.decoration;

      const name =
        button.dataset.name;


      addDecoration(
        symbol,
        name
      );

    });

  });


  function addDecoration(symbol, name) {

    if (!selectedPiece) {

      alert(
        "Choose a bag, clothing piece or pants first ♡"
      );

      return;

    }


    decorationCounter++;


    const decoration =
      document.createElement("div");


    decoration.className =
      "decoration";


    decoration.textContent =
      symbol;


    decoration.dataset.id =
      decorationCounter;


    decoration.dataset.name =
      name;


    const startX =
      25 +
      Math.random() * 45;


    const startY =
      25 +
      Math.random() * 40;


    decoration.style.left =
      startX + "%";


    decoration.style.top =
      startY + "%";


    canvas.appendChild(
      decoration
    );


    decorations.push({
      id: decorationCounter,
      name: name,
      symbol: symbol
    });


    makeDraggable(
      decoration
    );


    decoration.addEventListener(
      "click",
      event => {

        event.stopPropagation();

        document
          .querySelectorAll(".decoration")
          .forEach(item =>
            item.classList.remove("selected")
          );

        decoration.classList.add(
          "selected"
        );

      }
    );


    updateSummary();

  }


  /* =========================================================
     DRAGGABLE DECORATIONS
     ========================================================= */

  function makeDraggable(element) {

    let dragging = false;

    let startX = 0;
    let startY = 0;

    let originalLeft = 0;
    let originalTop = 0;


    element.addEventListener(
      "pointerdown",
      event => {

        event.preventDefault();

        dragging = true;

        element.setPointerCapture(
          event.pointerId
        );


        const rect =
          canvas.getBoundingClientRect();


        startX =
          event.clientX;

        startY =
          event.clientY;


        originalLeft =
          parseFloat(
            element.style.left
          ) || 0;


        originalTop =
          parseFloat(
            element.style.top
          ) || 0;

      }
    );


    element.addEventListener(
      "pointermove",
      event => {

        if (!dragging) return;


        const rect =
          canvas.getBoundingClientRect();


        const deltaX =
          (
            event.clientX -
            startX
          ) /
          rect.width *
          100;


        const deltaY =
          (
            event.clientY -
            startY
          ) /
          rect.height *
          100;


        let newLeft =
          originalLeft +
          deltaX;


        let newTop =
          originalTop +
          deltaY;


        newLeft =
          Math.max(
            3,
            Math.min(
              88,
              newLeft
            )
          );


        newTop =
          Math.max(
            5,
            Math.min(
              88,
              newTop
            )
          );


        element.style.left =
          newLeft + "%";


        element.style.top =
          newTop + "%";

      }
    );


    element.addEventListener(
      "pointerup",
      event => {

        dragging = false;

        try {

          element.releasePointerCapture(
            event.pointerId
          );

        }

        catch {}

      }
    );

  }


  /* =========================================================
     CLEAR DECORATIONS
     ========================================================= */

  document
    .getElementById("clear-decorations")
    .addEventListener("click", () => {

      document
        .querySelectorAll(".decoration")
        .forEach(item => item.remove());

      decorations = [];

      updateSummary();

    });


  /* =========================================================
     SUMMARY
     ========================================================= */

  function updateSummary() {

    const pieceText =
      selectedPiece
        ? selectedPiece.name
        : "Not selected";


    let colourText =
      "Not selected";


    if (selectedColors.length) {

      colourText =
        selectedColors
          .map(color =>
            `<span
              style="
                display:inline-block;
                width:14px;
                height:14px;
                border-radius:50%;
                background:${color};
                vertical-align:middle;
                margin-right:3px;
                border:1px solid #c8aea1;
              "
            ></span>`
          )
          .join("");

    }


    const decorationText =
      decorations.length
        ? decorations
            .map(item => item.name)
            .join(", ")
        : "None";


    summary.innerHTML = `
      <strong>Your choices:</strong><br>
      Piece: ${pieceText}<br>
      Colours: ${colourText}<br>
      Decorations: ${decorationText}
    `;

  }


  /* =========================================================
     CREATE PREVIEW IMAGE
     ========================================================= */

  async function createPreviewImage() {

    if (!selectedPiece) {
      return null;
    }


    /*
      html2canvas isn't necessary here.
      We create a simple clean canvas preview
      containing the selected piece and choices.
    */

    const exportCanvas =
      document.createElement("canvas");


    exportCanvas.width = 900;
    exportCanvas.height = 900;


    const ctx =
      exportCanvas.getContext("2d");


    ctx.fillStyle =
      "#f7ece5";

    ctx.fillRect(
      0,
      0,
      900,
      900
    );


    ctx.fillStyle =
      "#fffaf4";

    ctx.roundRect(
      70,
      70,
      760,
      760,
      35
    );

    ctx.fill();


    ctx.fillStyle =
      "#664237";

    ctx.textAlign =
      "center";


    ctx.font =
      "bold 48px Arial";


    ctx.fillText(
      "SAL’VES Studio",
      450,
      145
    );


    ctx.font =
      "32px Arial";


    ctx.fillText(
      selectedPiece.name,
      450,
      200
    );


    /* Main piece */

    const firstColor =
      selectedColors[0] ||
      "#d9b19d";


    ctx.fillStyle =
      firstColor;


    if (
      selectedPiece.type === "pants"
    ) {

      ctx.fillRect(
        290,
        280,
        135,
        380
      );

      ctx.fillRect(
        475,
        280,
        135,
        380
      );

    }

    else if (
      selectedPiece.type === "sweater"
    ) {

      ctx.roundRect(
        250,
        310,
        400,
        270,
        40
      );

      ctx.fill();

    }

    else if (
      selectedPiece.type === "crop"
    ) {

      ctx.roundRect(
        270,
        330,
        360,
        210,
        30
      );

      ctx.fill();

    }

    else if (
      selectedPiece.type.includes("dress") ||
      selectedPiece.type === "aline"
    ) {

      ctx.beginPath();

      ctx.moveTo(
        390,
        270
      );

      ctx.lineTo(
        510,
        270
      );

      ctx.lineTo(
        670,
        670
      );

      ctx.lineTo(
        230,
        670
      );

      ctx.closePath();

      ctx.fill();

    }

    else {

      ctx.roundRect(
        250,
        330,
        400,
        270,
        30
      );

      ctx.fill();

      ctx.strokeStyle =
        firstColor;

      ctx.lineWidth =
        15;

      ctx.beginPath();

      ctx.arc(
        450,
        330,
        120,
        Math.PI,
        0
      );

      ctx.stroke();

    }


    /* Decorations */

    const decorationElements =
      document.querySelectorAll(
        ".decoration"
      );


    decorationElements.forEach(
      decoration => {

        const left =
          parseFloat(
            decoration.style.left
          ) / 100 *
          900;


        const top =
          parseFloat(
            decoration.style.top
          ) / 100 *
          900;


        ctx.font =
          "65px Arial";


        ctx.fillText(
          decoration.textContent,
          left,
          top
        );

      }
    );


    /* Colour swatches */

    let swatchX =
      120;


    selectedColors.forEach(
      color => {

        ctx.fillStyle =
          color;

        ctx.beginPath();

        ctx.arc(
          swatchX,
          760,
          25,
          0,
          Math.PI * 2
        );

        ctx.fill();

        ctx.strokeStyle =
          "#8d6755";

        ctx.stroke();


        swatchX += 65;

      }
    );


    return exportCanvas.toDataURL(
      "image/png"
    );

  }


  /* =========================================================
     SUBMIT
     ========================================================= */

  form.addEventListener(
    "submit",
    async event => {

      event.preventDefault();


      if (!selectedPiece) {

        alert(
          "Please choose your piece first ♡"
        );

        return;

      }


      if (
        selectedColors.length !==
        requiredColors
      ) {

        alert(
          `Please choose ${requiredColors} colours first ♡`
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


      const phone =
        document.getElementById(
          "customer-phone"
        ).value.trim();


      const notes =
        document.getElementById(
          "customer-notes"
        ).value.trim();


      const message =
        document.getElementById(
          "customer-message"
        ).value.trim();


      const designImage =
        await createPreviewImage();


      const decorationNames =
        decorations.length
          ? decorations
              .map(item => item.name)
              .join(", ")
          : "None";


      const colorNames =
        selectedColors.join(", ");


      const templateParams = {

        customer_name:
          name,

        customer_email:
          email,

        customer_phone:
          phone,

        customer_notes:
          notes || "None",

        customer_message:
          message || "None",

        piece:
          selectedPiece.name,

        colours:
          colorNames,

        decorations:
          decorationNames,

        whatsapp:
          "+968 93853607",

        business_email:
          "salwamaryam.th@gmail.com",

        design_image:
          designImage

      };


      /* =====================================================
         EMAILJS CHECK
         ===================================================== */

      if (
        !window.emailjs ||
        EMAILJS_CONFIG.publicKey ===
        "YOUR_PUBLIC_KEY"
      ) {

        status.style.color =
          "#9a634f";


        status.textContent =
          "Your design is ready ♡ EmailJS still needs to be connected. See the setup below.";

        console.log(
          "Custom request:",
          templateParams
        );

        return;

      }


      const sendButton =
        document.getElementById(
          "send-request"
        );


      sendButton.disabled =
        true;


      sendButton.textContent =
        "Sending your design... ♡";


      status.textContent =
        "";


      try {

        await emailjs.send(
          EMAILJS_CONFIG.serviceId,
          EMAILJS_CONFIG.templateId,
          templateParams
        );


        status.style.color =
          "#64815c";


        status.textContent =
          "Your custom request was sent successfully! ♡ We’ll contact you soon.";


        sendButton.textContent =
          "Sent Successfully ♡";


        form.reset();

      }

      catch (error) {

        console.error(
          "EmailJS error:",
          error
        );


        status.style.color =
          "#a04f4f";


        status.textContent =
          "Something went wrong while sending. Please contact us on WhatsApp.";


        sendButton.disabled =
          false;


        sendButton.textContent =
          "✉️ Send My Custom Request ♡";

      }

    }
  );


  /* =========================================================
     WHATSAPP
     ========================================================= */

  const whatsappButton =
    document.querySelector(
      ".whatsapp-btn"
    );


  whatsappButton.addEventListener(
    "click",
    () => {

      const piece =
        selectedPiece
          ? selectedPiece.name
          : "Custom piece";


      const decorationsText =
        decorations.length
          ? decorations
              .map(item => item.name)
              .join(", ")
          : "None";


      const text =
        `Hi SAL’VES Studio ♡%0A%0A` +
        `I’m interested in a custom piece.%0A%0A` +
        `Piece: ${piece}%0A` +
        `Colours: ${selectedColors.join(", ") || "Not selected"}%0A` +
        `Decorations: ${decorationsText}`;


      whatsappButton.href =
        `https://wa.me/96893853607?text=${text}`;

    }
  );


  /* =========================================================
     START
     ========================================================= */

  updateSelectedColors();

  updateSummary();

});