/* =====================================================
   CHATBOT BASE
   Motor universal de captación de leads
===================================================== */


/* =====================================================
   DATOS DEL LEAD
===================================================== */

const lead = {};

let currentQuestion = 0;


/* =====================================================
   ELEMENTOS
===================================================== */

const chat =
  document.getElementById("chat");

const progress =
  document.getElementById("progress");


/* =====================================================
   SCROLL
===================================================== */

function scrollChat() {

  chat.scrollTop =
    chat.scrollHeight;

}


/* =====================================================
   MENSAJE DEL BOT
===================================================== */

function addBotMessage(text) {

  const message =
    document.createElement("div");

  message.className =
    "message bot";

  message.textContent =
    text;

  chat.appendChild(message);

  scrollChat();

}


/* =====================================================
   MENSAJE DEL USUARIO
===================================================== */

function addUserMessage(text) {

  const message =
    document.createElement("div");

  message.className =
    "message user";

  message.textContent =
    text;

  chat.appendChild(message);

  scrollChat();

}


/* =====================================================
   PROGRESO
===================================================== */

function updateProgress() {

  const total =
    CONFIG.questions.length;

  const percentage =
    Math.min(
      (currentQuestion / total) * 100,
      100
    );

  progress.style.width =
    percentage + "%";

}


/* =====================================================
   BOTONES
===================================================== */

function addOptions(options, callback) {

  const container =
    document.createElement("div");

  container.className =
    "options";


  options.forEach(option => {

    const button =
      document.createElement("button");

    button.className =
      "option";

    button.textContent =
      option;


    button.addEventListener(
      "click",
      function () {

        container.remove();

        addUserMessage(option);

        callback(option);

      }
    );


    container.appendChild(button);

  });


  chat.appendChild(container);

  scrollChat();

}


/* =====================================================
   INPUT
===================================================== */

function addInput(
  placeholder,
  type,
  callback
) {

  const wrapper =
    document.createElement("div");

  wrapper.className =
    "input-area";


  const input =
    document.createElement("input");

  input.type =
    type || "text";

  input.placeholder =
    placeholder || "";


  const button =
    document.createElement("button");

  button.className =
    "send-button";

  button.textContent =
    "Continuar";


  function submit() {

    const value =
      input.value.trim();


    if (!value) {

      input.focus();

      return;

    }


    wrapper.remove();

    addUserMessage(value);

    callback(value);

  }


  button.addEventListener(
    "click",
    submit
  );


  input.addEventListener(
    "keydown",
    function(event) {

      if (
        event.key === "Enter"
      ) {

        submit();

      }

    }
  );


  wrapper.appendChild(input);

  wrapper.appendChild(button);

  chat.appendChild(wrapper);

  input.focus();

  scrollChat();

}


/* =====================================================
   SIGUIENTE PREGUNTA
===================================================== */

function nextQuestion() {

  updateProgress();


  /* -----------------------------------------------
     FIN
  ----------------------------------------------- */

  if (
    currentQuestion >=
    CONFIG.questions.length
  ) {

    finish();

    return;

  }


  const question =
    CONFIG.questions[currentQuestion];


  addBotMessage(
    question.question
  );


  /* -----------------------------------------------
     OPCIONES
  ----------------------------------------------- */

  if (
    question.type ===
    "options"
  ) {

    addOptions(
      question.options,
      function(value) {

        lead[question.id] =
          value;

        currentQuestion++;

        nextQuestion();

      }
    );

    return;

  }


  /* -----------------------------------------------
     TEXTO / TELÉFONO
  ----------------------------------------------- */

  addInput(
    question.placeholder,
    question.type === "tel"
      ? "tel"
      : "text",

    function(value) {

      lead[question.id] =
        value;

      currentQuestion++;

      nextQuestion();

    }
  );

}
/* =====================================================
   SCORING
===================================================== */

function calculateScore() {

  let score = 0;

  CONFIG.questions.forEach(question => {

    const answer = lead[question.id];

    if (
      question.scoring &&
      question.scoring[answer]
    ) {

      score += question.scoring[answer];

    }

  });

  return score;

}

  });

  return score;

}


/* =====================================================
   CLASIFICACIÓN
===================================================== */

function getLeadStatus(score) {

  if (
    score >=
    CONFIG.scoring.levels.clientePotencial
  ) {

    return "🔥 Cliente potencial";

  }

  if (
    score >=
    CONFIG.scoring.levels.interesado
  ) {

    return "🟡 Interesado";

  }

  return "🔵 Solo información";

}

/* =====================================================
   FINAL
===================================================== */

function finish() {

  updateProgress();


  /* -----------------------------------------------
     CALCULAR SCORE
  ----------------------------------------------- */

  const score =
    calculateScore();


  /* -----------------------------------------------
     CLASIFICAR LEAD
  ----------------------------------------------- */

  const status =
    getLeadStatus(score);


  /* -----------------------------------------------
     GUARDAR RESULTADO
  ----------------------------------------------- */

  lead.score =
    score;

  lead.status =
    status;


  /* -----------------------------------------------
     MENSAJE FINAL
  ----------------------------------------------- */

  addBotMessage(
    "¡Perfecto! Hemos recibido tus datos correctamente."
  );


  /* -----------------------------------------------
     RESULTADO
  ----------------------------------------------- */

  const result =
    document.createElement("div");

  result.className =
    "result";


  result.innerHTML = `

    <div class="result-icon">
      ✅
    </div>


    <h2>
      Solicitud recibida
    </h2>


    <p>
      Gracias por contactar con
      ${CONFIG.companyName}.
      Revisaremos tus datos y
      nos pondremos en contacto
      contigo.
    </p>


    <p>
      <strong>
        ${status}
      </strong>
    </p>

  `;


  chat.appendChild(result);

  scrollChat();


  /* -----------------------------------------------
     DEBUG
  ----------------------------------------------- */

  console.log(
    "NUEVO LEAD:",
    lead
  );

}


/* =====================================================
   INICIO
===================================================== */

function startChat() {

  addBotMessage(
    CONFIG.welcome.greeting
  );


  const welcome =
    document.createElement("div");

  welcome.className =
    "welcome";


  welcome.innerHTML = `

    <div class="welcome-title">

      ${CONFIG.welcome.title}

    </div>


    <div class="welcome-text">

      ${CONFIG.welcome.description}

    </div>

  `;


  chat.appendChild(welcome);


  const startButton =
    document.createElement("button");

  startButton.className =
    "option";

  startButton.textContent =
    "Empezar →";


  startButton.addEventListener(
    "click",
    function() {

      startButton.remove();

      currentQuestion = 0;

      nextQuestion();

    }
  );


  chat.appendChild(startButton);

  scrollChat();

}


/* =====================================================
   ARRANCAR
===================================================== */

startChat();
