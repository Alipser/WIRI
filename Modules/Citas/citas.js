import { avisos } from "../Alertas/alertas.js";
import { postCita, getCitas } from "../../models/citas/citasmodel.js";

//SELECTORES
const formulario = document.querySelector(".form");
const claseInput = document.getElementById("clase");
const fechaInput = document.getElementById("Fecha");
const horarioInput = document.getElementById("horario");
const participantesInput = document.getElementById("participantes");
const cardsContainer = document.querySelector(".cards-container");
const btnVerEspacion = document.getElementById("verEspacios");

//EVENTOS
formulario.addEventListener("submit", async (event) => {
  event.preventDefault();

  const fechaActual = new Date();
  const año = fechaActual.getFullYear();
  const mes = (fechaActual.getMonth() + 1).toString().padStart(2, '0'); 
  const dia = fechaActual.getDate().toString().padStart(2, '0');
  const hora = fechaActual.getHours().toString().padStart(2, '0');
  const minutos = fechaActual.getMinutes().toString().padStart(2, '0');
  const segundos = fechaActual.getSeconds().toString().padStart(2, '0');
  const idLink = `${año}${mes}${dia}_${hora}${minutos}${segundos}`;

  let espacioGenerado = {

    class:"",
    profesoreId: "",
      day: "",
      date: "",
      id: "",
      numberparticipant: "",
      link: `https://meet.jit.si/${idLink}`,
      duracion: "",
      users: [
        ""
      ]
};


  espacioGenerado.class = String(claseInput.value).trim();
  espacioGenerado.date = fechaInput.value;
  espacioGenerado.duracion = String(horarioInput.value).trim();
  espacioGenerado.numberparticipant = participantesInput.value;

  
  
  const todosEstanLLenos =
    espacioGenerado.numberparticipant !== "" &&
    espacioGenerado.class !== "" &&
    espacioGenerado.duracion !== "" && 
    espacioGenerado.date !== ""

  if (!todosEstanLLenos) {
      avisos("Todos los campos son abligatorios",false);
  } else{
    const espacioGeneradoString = JSON.stringify(espacioGenerado);
          postCita(espacioGeneradoString);
    avisos("OK", true)
  } 

  
  const data = (await getCitas());
    pintarCitas(data)

});

btnVerEspacion.addEventListener("click",async (event)=>{
    event.preventDefault();
    const data = (await getCitas());
    pintarCitas(data)
})




function pintarCitas(data){
    data.forEach((card)=>{
        cardsContainer.innerHTML +=`
        <div class="card" style="width: 18rem;">
        <img src="https://img.freepik.com/premium-vector/cute-astronaut-jumping-space-cartoon-vector-icon-illustration-science-technology-icon-isolated_138676-5751.jpg?size=338&ext=jpg" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">Horario Generado</h5>
          <p class="card-text">Clase: <span>${card.class} </span></p>
          <p class="card-text">Fecha: <span></span>${card.date} </p>
          <p class="card-text">Hora: <span></span>${card.duracion} </p>
          <p class="card-text">Participantes: <span>${card.numberparticipant} </span></p>

          <a href="${card.link} " class="btn btn-primary">Ir a la reunion</a>
        </div>`
    })
}
