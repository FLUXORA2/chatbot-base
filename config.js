const CONFIG = {

  // =========================
  // IDENTIDAD
  // =========================

  botName: "Bot Demo",

  companyName: "Empresa Demo",


  // =========================
  // BIENVENIDA
  // =========================

  welcome: {

    greeting: "Hola 👋",

    title:
      "¿En qué podemos ayudarte?",

    description:
      "Responde unas preguntas rápidas y te ayudaremos."
  },


  // =========================
  // PREGUNTAS
  // =========================

  questions: [

    {
      id: "servicio",

      type: "options",

      question:
        "¿Qué estás buscando?",

      options: [
        "Información",
        "Solicitar presupuesto",
        "Quiero contratar"
      ]
    },


    {
      id: "ubicacion",

      type: "text",

      question:
        "¿En qué localidad te encuentras?",

      placeholder:
        "Ej. Madrid"
    },


    {
      id: "nombre",

      type: "text",

      question:
        "¿Cómo te llamas?",

      placeholder:
        "Tu nombre"
    },


    {
      id: "telefono",

      type: "tel",

      question:
        "¿A qué teléfono podemos contactarte?",

      placeholder:
        "Ej. 612 345 678"
    }

  ],


  // =========================
  // SCORING
  // =========================

  scoring: {

    "Información": 2,

    "Solicitar presupuesto": 5,

    "Quiero contratar": 7

  },


  // =========================
  // CRM
  // =========================

crm: {

  enabled: true,

  statusInicial: "Nuevo",

  webhookUrl: ""

}

};
