const CONFIG = {

  botName: "AeroBot",

  companyName: "Empresa Demo",

  welcome: {
    greeting: "Hola 👋",

    title:
      "¿En qué podemos ayudarte?",

    description:
      "Responde unas preguntas rápidas y te ayudaremos a encontrar la mejor opción."
  },


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

  ]

};
