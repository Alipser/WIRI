import { avisos, clearDiv } from "../Alertas/alertas.js";

//nodos

const listaTemas = document.querySelector(
  "#nav > div > div.d-flex.gap-1.align-items-start > div:nth-child(2) > ul"
);
const html = document.querySelector("html");

//NODOS DEL MODAL
const modalTitle = document.querySelector(".modal-title");
const modalcontenido = document.querySelector("#modalContentText");
const modalboton = document.querySelector(
  "#exampleModal > div > div > div.modal-footer > button.btn.btn-primary"
);
const closemodalboton = document.querySelector(
  "#exampleModal > div > div > div.modal-footer > button.btn.btn-secondary"
);

let citaReservar;
//EVENTOS

window.addEventListener(
  "DOMContentLoaded",
  () => {
    location.hash = "Reservas";
    navigation();
  },
  false
);

window.addEventListener("hashchange", navigation, false);

modalboton.addEventListener("click", () => {
  console.log(citaReservar.users);
  const usuarioDatastr = localStorage.getItem("dataUser");
  const usuarioDataparse = JSON.parse(usuarioDatastr);
  const isinCita = citaReservar.users.includes(usuarioDataparse.id);

  if (!isinCita) {
    citaReservar.users.push(usuarioDataparse.id);
    const newAmountParticipant = Number(citaReservar.numberparticipant ?? 0) + 1;
    if (newAmountParticipant >= 6) {
      avisos("La sala actualmente se encuentra llena ", false);
    } else {
      pathClases(
        citaReservar.id,
        JSON.stringify({ numberparticipant: String(newAmountParticipant), users: citaReservar.users })
      );
      citaReservar = {};
    }
    closemodalboton.click();
    document
      .querySelector(
        "body > main > div.l-container > section > div > div.card-header > ul > li:nth-child(1)> a"
      )
      .click();
  }else{
    closemodalboton.click()
    window.scrollTo({ top: 0, behavior: 'smooth' })
    avisos('Ya estas agendado para esta Reunión', false)
    citaReservar = {}
  }
});

closemodalboton.addEventListener("click", () => {
  citaReservar = {};
});

//MODO OSCURO
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

//MODELS A MODELS
async function getClases() {
  const url = "http://localhost:3000/materias";
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

async function pathClases(id, objeto) {
  const url = `http://localhost:3000/citas/${id}`;
  const response = await fetch(url, {
    method: "PATCH",
    body: objeto,
    headers: { "Content-type": "application/json; charset=UTF-8" },
  });
}

async function getProfesores(materia) {
  const url = `http://localhost:3000/profesores?materia=${materia}`;
  console.log(url);
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  return data;
}

async function getClaseConInfoProfe(idCita) {
  const response = await fetch(
    `http://localhost:3000/citas/${idCita}/?_embed=profesore`
  );
  const data = await response.json();
  return data;
}

async function getCitasPorProfesor(idprof) {
  const url = `http://localhost:3000/citas?profesoreId=${idprof}`;
  console.log(url);
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  return data;
}

//---------------------------//

//NAVEGACION EN MODULO SIGNED HOME
function navigation() {
  if (location.hash.startsWith("#Reservas")) {
    getClases().then((response) => {
      printClases(response);
    });
  } else {
    let urlSearch = decodeURI(location.hash.slice(1)).replace(" ", "-");
    console.log(urlSearch);
    document.querySelector(".l-container").innerHTML = "";
    try {
      getProfesores(urlSearch).then((response) => {
        response.forEach((profesor) => {
          pintarProfesores(profesor);
        });
      });
    } catch {
      console.log("ERROR");
    }
  }
}

function navToReservas(nameclase) {
  location.hash = nameclase;
}

async function printCitas(nodoHTML, idprofesor) {
  let citas = await getCitasPorProfesor(idprofesor);
  console.log(await citas);
  console.log(nodoHTML);
  crearNodoParaPintarCitas(nodoHTML);
  const cardbodyContainer = document.querySelector(
    "body > main > div > section > div > div.card-body"
  );
  ponerCitas("Lunes", citas, cardbodyContainer);
  const linklist = document
    .querySelector("body > main > div > section > div > div.card-header > ul")
    .querySelectorAll("li");
  linklist.forEach((listItem) => {
    listItem.addEventListener("click", async () => {
      cardbodyContainer.innerHTML = "";
      linklist.forEach((link) => {
        link.querySelector("a").classList.remove("active");
      });
      listItem.querySelector("a").classList.add("active");
      let citasPintar = await getCitasPorProfesor(idprofesor);
      ponerCitas(listItem.textContent, citasPintar, cardbodyContainer);
    });
  });
}

function printClases(respuesta) {
  document.querySelector(".l-container").innerHTML = "";
  respuesta.forEach((clase) => {
    document.querySelector(".l-container").innerHTML += `
          <div class="b-game-card">
          <div id="${clase.nameMaterias}" class="b-game-card__cover imagenclick">
            <img src="../../assets/programing.jpg" alt="">
          </div>
          <div class="cardFoot">
            ${clase.nameMaterias}
          </div>
        </div>
          `;
  });
  document
    .querySelector(".l-container")
    .querySelectorAll(".imagenclick")
    .forEach((caja) => {
      caja.addEventListener("click", () => {
        console.dir(caja.id);
        navToReservas(caja.id);
      });
    });
}

function pintarProfesores(profesor) {
  var cardElement = document.createElement("div");
  cardElement.className = "card";
  cardElement.style.width = "17rem";
  cardElement.id = `${profesor.id}`;

  // Crear el elemento img con la clase 'card-img-top', atributo src y alt
  var imgElement = document.createElement("img");
  imgElement.className = "card-img-top";
  console.log(profesor.img);
  imgElement.src = `${profesor.img}`; // Coloca la URL correcta de la imagen
  imgElement.alt = `${profesor.nombre}`; // Coloca el texto alternativo correcto
  imgElement.style.width = "268.800px";
  imgElement.style.height = "358.688px";

  // Crear el elemento div con la clase 'card-body'
  var cardBodyElement = document.createElement("div");
  cardBodyElement.className = "card-body";
  cardBodyElement.style.height = "160px";
  imgElement.style.width = "269.800px";

  // Crear el elemento h5 con la clase 'card-title' y texto
  var titleElement = document.createElement("h5");
  titleElement.className = "card-title";
  var titleText = document.createTextNode(`${profesor.nombre}`);
  titleElement.appendChild(titleText);

  // Crear el elemento p con la clase 'card-text' y texto
  var textElement = document.createElement("p");
  textElement.style.height = "48px";
  textElement.className = "card-text";
  var textNode = document.createTextNode(`${profesor.descripcion}`);
  textElement.appendChild(textNode);

  // Crear el elemento a con la clase 'btn btn-primary', atributo href y texto
  var linkElement = document.createElement("a");
  linkElement.className = "btn btn-primary";
  linkElement.href = "";
  linkElement.setAttribute("prf-id", `${profesor.id}`);
  linkElement.addEventListener("click", (evento) => {
    evento.preventDefault();
    const cardprofesores = document
      .querySelector(".l-container")
      .querySelectorAll(".card");
    cardprofesores.forEach((card) => {
      if (card.id !== profesor.id) {
        card.classList.add("displayNone");
        printCitas(document.querySelector(".l-container"), profesor.id);
      }
    });
  });
  var linkText = document.createTextNode("Disponibilidad");
  linkElement.appendChild(linkText);

  // Construir la estructura del elemento card
  cardElement.appendChild(imgElement);
  cardElement.appendChild(cardBodyElement);
  cardBodyElement.appendChild(titleElement);
  cardBodyElement.appendChild(textElement);
  cardBodyElement.appendChild(linkElement);

  // Añadir el elemento card al cuerpo del documento
  document.querySelector(".l-container").appendChild(cardElement);
}

function crearNodoParaPintarCitas(nodoHTML) {
  debugger;

  const existSection = document.querySelector("body > main > div > section");
  console.log(existSection);

  if (existSection) {
    nodoHTML.removeChild(existSection);
  }
  let sectionElement = document.createElement("section");
  sectionElement.classList.add("placeSection");

  // Crear el elemento div con la clase 'card text-center'
  let cardElement = document.createElement("div");
  cardElement.className = "card text-center";

  // Crear el elemento div con la clase 'card-header'
  let cardHeaderElement = document.createElement("div");
  cardHeaderElement.className = "card-header";

  // Crear el elemento ul con la clase 'nav nav-tabs card-header-tabs gap-1'
  const ulElement = document.createElement("ul");
  ulElement.className = "nav nav-tabs card-header-tabs gap-1";

  // Crear los elementos li y a para cada día de la semana
  let daysOfWeek = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];
  for (var i = 0; i < daysOfWeek.length; i++) {
    const liElement = document.createElement("li");
    liElement.className = "nav-item";

    const aElement = document.createElement("a");
    aElement.className = "nav-link" + (i === 0 ? " active" : ""); // Agregar la clase 'active' al primer día
    aElement.textContent = daysOfWeek[i];

    liElement.appendChild(aElement);
    ulElement.appendChild(liElement);
  }

  // Crear el elemento div con la clase 'card-body'
  const cardBodyElement = document.createElement("div");
  cardBodyElement.className = "card-body";

  // Construir la estructura del objeto
  cardHeaderElement.appendChild(ulElement);
  cardElement.appendChild(cardHeaderElement);
  cardElement.appendChild(cardBodyElement);
  sectionElement.appendChild(cardElement);

  // Añadir el elemento section al cuerpo del documento
  nodoHTML.appendChild(sectionElement);
}

function ponerCitas(dia, citas, nodo) {
  let citasPintar = Array(...citas);

  citasPintar = citasPintar.filter((cita) => cita.day.includes(dia));
  console.log(citasPintar);
  citasPintar.forEach((cita) => {
    nodo.innerHTML += `
        <div class="card" id=${cita.id}  prof-id=${cita.profesoreId}>
          <div class="card-body">
          <div class="d-flex align-items-center justify-content-between">
          <img width="45" height="15" src="../../assets/brand/wiriN.png">
          <div>
          <p>${cita.date}</p>
          <p>${cita.hour ?? "Por definir"}</p>
          </div>
          
          </div>
            <h5 class="card-title">${
              cita.title ?? `${decodeURI(location.hash).slice(1)}`
            }</h5>
            <p class="card-text">${
              cita.numberparticipant >= 0 && cita.numberparticipant < 5
                ? "Este espacio todavia puede ser reservado para tí"
                : "El espacio esta lleno"
            }</p>
            ${
              cita.numberparticipant >= 0 && cita.numberparticipant < 5
                ? `<a href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"">Reservar Cita</a>`
                : `<h5 class="card-title"> ${cita.numberparticipant}/5 Participantes en la sala</h5>`
            }
          </div>
         </div>
        `;
  });
  nodo.querySelectorAll(".placeSection a").forEach((alinkConFormadeBoton) => {
    alinkConFormadeBoton.addEventListener("click", async (evento) => {
      console.log(evento.target.parentNode.parentElement.id);
      const dataCita = await getClaseConInfoProfe(
        evento.target.parentNode.parentElement.id
      );
      console.log(dataCita);
      citaReservar = { ...dataCita };
      modalTitle.textContent = `${decodeURI(location.hash).slice(1)}`;
      modalcontenido.innerHTML = `
  <p> Estas a punto de reservan una cita con el  profesor ${dataCita.profesore.nombre} </p>
  <p> Para el dia: ${dataCita.date} </p>
  <p> A las ${dataCita.hour} <p>
  `;
    });
  });
}
