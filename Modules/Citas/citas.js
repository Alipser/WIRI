import { avisos } from "../Alertas/alertas.js";
import { postCita, getCitas } from "../../models/citas/citasmodel.js";
import { getProfesoresid } from "../../models/profesores/profesores.js";
import { getCitasPorProfesor } from "../../models/citas/citas.js";
//SELECTORES
const formulario = document.querySelector(".form");
const claseInput = document.getElementById("clase");
const fechaInput = document.getElementById("Fecha");
const horarioInput = document.getElementById("horario");
const participantesInput = document.getElementById("participantes");
const cardsContainer = document.querySelector(".cards-container");
const btnVerEspacion = document.getElementById("verEspacios");
const html = document.querySelector("html");
const listaTemas = document.querySelector(
  "#nav > div > div.d-flex.gap-1.align-items-start > div:nth-child(2) > ul"
);
const logOut = document.querySelector(
  "#offcanvasRight > div.offcanvas-body > div > button"
);
const titleUser = document.querySelector("#offcanvasRightLabel");
const leyenda = document.querySelector(
  "#offcanvasRight > div.offcanvas-body > div > div > span"
);
const nombreCompleto = document.querySelector(
  "#offcanvasRight > div.offcanvas-body > div > div > h5"
);
const imagenprofe = document.querySelector(
  "#offcanvasRight > div.offcanvas-body > div > div > img"
);

const userdata = JSON.parse(localStorage.getItem("dataUser"));
const dataAsprofe = await getProfesoresid(userdata.profesoreId);
nombreCompleto.textContent = dataAsprofe.nombre;
imagenprofe.src = dataAsprofe.img;
titleUser.textContent = userdata.nombre;
leyenda.textContent = dataAsprofe.materia;

console.log(userdata);
console.log(dataAsprofe);

//EVENTOS
formulario.addEventListener("submit", async (event) => {
  event.preventDefault();

  const fechaActual = new Date();
  const año = fechaActual.getFullYear();
  const mes = (fechaActual.getMonth() + 1).toString().padStart(2, "0");
  const dia = fechaActual.getDate().toString().padStart(2, "0");
  const hora = fechaActual.getHours().toString().padStart(2, "0");
  const minutos = fechaActual.getMinutes().toString().padStart(2, "0");
  const segundos = fechaActual.getSeconds().toString().padStart(2, "0");
  const idLink = `${año}${mes}${dia}_${hora}${minutos}${segundos}`;

  let espacioGenerado = {
    class: "",
    profesoreId: "",
    day: "",
    date: "",
    id: "",
    numberparticipant: "",
    link: `https://meet.jit.si/${idLink}`,
    duracion: "",
    users: [""],
  };

  espacioGenerado.class = String(claseInput.value).trim();
  espacioGenerado.date = fechaInput.value;
  espacioGenerado.duracion = String(horarioInput.value).trim();
  espacioGenerado.numberparticipant = participantesInput.value;

  const todosEstanLLenos =
    espacioGenerado.numberparticipant !== "" &&
    espacioGenerado.class !== "" &&
    espacioGenerado.duracion !== "" &&
    espacioGenerado.date !== "";

  if (!todosEstanLLenos) {
    avisos("Todos los campos son abligatorios", false);
  } else {
    const espacioGeneradoString = JSON.stringify(espacioGenerado);
    postCita(espacioGeneradoString);
    avisos("OK", true);
  }

  const data = await getCitasPorProfesor(userdata.id);
  pintarCitas(data);
});

btnVerEspacion.addEventListener("click", async (event) => {
  event.preventDefault();
  const data = await getCitas();
  pintarCitas(data);
});

listaTemas.addEventListener("click", (evento) => {
  evento.preventDefault();
  const logo = document.querySelector("#nav > div > a > img");
  const logoFooter = document.querySelector(
    "body > footer > section:nth-child(2) > div > div > div.col-md-3.col-lg-4.col-xl-3.mx-auto.mb-4 > h6 > img"
  );
  if (evento.target.id == "darkTheme") {
    html.setAttribute("data-bs-theme", "dark");
    logo.src = "../../assets/brand/LogoN.png";
    logoFooter.src = "../../assets/brand/LogoN.png";
  } else {
    html.setAttribute("data-bs-theme", "");
    logo.src = "../../assets/brand/WIRI.png";
    logoFooter.src = "../../assets/brand/WIRI.png";
  }
});

logOut.addEventListener("click", () => {
  debugger;
  localStorage.clear();
  window.location.href = "http://127.0.0.1:5500/index.html";
});

function pintarCitas(data) {
  data.forEach((card) => {
    cardsContainer.innerHTML += `
        <div class="card" style="width: 18rem;">
        <img src="https://img.freepik.com/premium-vector/cute-astronaut-jumping-space-cartoon-vector-icon-illustration-science-technology-icon-isolated_138676-5751.jpg?size=338&ext=jpg" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 data-i18n="tituloCard" class="translate  card-title">Horario Generado</h5>
          <div class="d-flex">
          <p  data-i18n="classCard" class="translate card-text">Clase: </p> <span> ${card.class} </span>
          </div>
          <div class="d-flex">
          <p  data-i18n="dateCard" class="translate card-text">Fecha:</p>  <span> ${card.date} </span>
          </div>
          <div class="d-flex">
          <p  data-i18n="timeCard" class="translate card-text">Hora: </p> <span> ${card.duracion} </span>
          </div>
          <div class="d-flex"> 
          <p  data-i18n="participantesCard" class="translate card-text">Participantes:</p> <span>${card.numberparticipant} </span>
          </div>
          <a href="${card.link}" data-i18n="btnir" class="translate btn btn-primary">Ir a la reunion</a>
        </div>`;
  });
}
