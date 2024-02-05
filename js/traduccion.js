const btnEn = document.getElementById("btnEn");
const btnEs = document.getElementById("btnEs");

btnEn.addEventListener("click", function (e) {
  e.preventDefault();
  changeLanguage("en");
});

btnEs.addEventListener("click", function (e) {
  e.preventDefault();
  changeLanguage("es");
});

document.addEventListener("DOMContentLoaded", function () {
  i18next.init(
    {
      lng: "en",
      debug: true,
      resources: {
        en: {
          translation: {
            reserva: "Reservation",
            modificar: "Modify",
            cancelar: "Cancel",
            usuario: "User",
            h2titulo: "These are your generated spaces",
            footerP1: "Connect with us through social media:",
            footerP2:"We believe in creating a free ecosystem for teaching and creating academic spaces between mentors and students",
            tituloform:"Generate Tutoring Appointment",
            tituloCard:"Generated Schedule",
            dateform:"Date",
            hourform:"Schedule",
            partipantesform:"Participants",
            generar:"Generate",
            verEspacion:"View Appointments",
            classCard:"Class:",
            dateCard:"Date:",
            timeCard:"Schedule:",
            participantesCard:"Participants:",
            btnir:"Go to meeting"

          },
        },
        es: {
          translation: {
            reserva: "Reserva",
            modificar: "Modificar",
            cancelar: "Cancelar",
            usuario: "Usuario",
            h2titulo: "Estos son tus espacios generados",
            footerP1: "Conéctate con nosotros a través de redes sociales:",
            footerP2:"Creemos en la creación de un ecosistema libre para la enseñanza y creación de espacios académicos entre mentores y estudiantes",
            tituloform:"Generar cita para tutoría",
            tituloCard:"Horario Generado",
            dateform:"Fecha",
            hourform:"Horario",
            partipantesform:"Participantes",
            generar:"Generar",
            verEspacion:"Ver citas",
            classCard:"Clase:",
            dateCard:"Fecha:",
            timeCard:"Hoarario:",
            participantesCard:"Participnates:",
            btnir:"Ir a la reunión"
            
            

        
          },
        },
      },
    },
    function (err, t) {
      updateContent();
    }
  );

  function updateContent() {
    const elements = document.querySelectorAll(".translate");
    elements.forEach((el) => {
      const key = el.getAttribute("data-i18n");
      el.innerHTML = i18next.t(key);
    });
  }

  window.changeLanguage = function (lng) {
    i18next.changeLanguage(lng, updateContent);
  };
});
