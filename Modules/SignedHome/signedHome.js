//nodos

const listaTemas = document.querySelector('#nav > div > div.d-flex.gap-1.align-items-start > div:nth-child(2) > ul')
const html = document.querySelector('html')


//EVENTOS

window.addEventListener('DOMContentLoaded', () => {
  location.hash = 'Reservas'
  navigation()
}, false);
window.addEventListener('hashchange', navigation, false);

//MODO OSCURO
listaTemas.addEventListener('click', (evento) => {
  evento.preventDefault()
  const logo = document.querySelector('#nav > div > a > img');
  const logoFooter = document.querySelector('body > footer > section:nth-child(2) > div > div > div.col-md-3.col-lg-4.col-xl-3.mx-auto.mb-4 > h6 > img');
  if (evento.target.id == 'darkTheme') {
    html.setAttribute('data-bs-theme', "dark");
    logo.src = '../../assets/brand/LogoN.png';
    logoFooter.src = '../../assets/brand/LogoN.png';

  } else {
    html.setAttribute('data-bs-theme', "");
    logo.src = '../../assets/brand/WIRI.png';
    logoFooter.src = '../../assets/brand/WIRI.png';
  }
})


//MODELS A MODELS
async function getClases() {
  const url = 'http://localhost:3000/materias'
  const response = await fetch(url)
  const data = await response.json()
  return data
}


async function getProfesores(materia) {
  const url = `http://localhost:3000/profesores?materia=${materia}`
  console.log(url)
  const response = await fetch(url)
  const data = await response.json()
  console.log(data)
  return data
}


async function getCitasPorProfesor(idprof) {
  const url = `http://localhost:3000/citas?prof-id=${idprof}`
  console.log(url)
  const response = await fetch(url)
  const data = await response.json()
  console.log(data)
  return data
}

//---------------------------//

//NAVEGACION EN MODULO SIGNED HOME
function navigation() {
  if (location.hash.startsWith('#Reservas')) {
    getClases().then((response) => {
      printClases(response)
    })
  } else {
    let urlSearch = decodeURI(location.hash.slice(1)).replace(' ', '-')
    console.log((urlSearch))
    document.querySelector('.l-container').innerHTML = '';
    try {
      getProfesores(urlSearch).then(response => {
        response.forEach(profesor => {
          pintarProfesores(profesor)
        })
      })
    } catch {
      console.log('ERROR')
    }
  }
}






function navToReservas(nameclase) {
  location.hash = nameclase
}


async function printCitas(nodoHTML, idprofesor) {
  debugger

 
  let citas = await getCitasPorProfesor(idprofesor)
  console.log(await citas)
  crearNodoParaPintarCitas(nodoHTML)
  const cardbodyContainer = document.querySelector('body > main > div > section > div > div.card-body')
  ponerCitas('Lunes', citas, cardbodyContainer)
  

  const linklist = document.querySelector('body > main > div > section > div > div.card-header > ul').querySelectorAll('li')
  linklist.forEach((listItem) => {
    listItem.addEventListener('click', () => {
      cardbodyContainer.innerHTML = ''
      
      linklist.forEach((link) => {
        link.querySelector('a').classList.remove('active')
      })
      listItem.querySelector('a').classList.add('active')
      debugger
      let citasPintar = Array(...citas)
      console.log(listItem.textContent)
      citasPintar = citasPintar.filter(cita => cita.day === listItem.textContent)
      console.log(citasPintar)
      citasPintar.forEach(cita => {
        
        cardbodyContainer.innerHTML += `
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Special title treatment</h5>
            <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
            <a href="#" class="btn btn-primary">Go somewhere</a>
          </div>
         </div>
        `
      })
    })

  })

}

function printClases(respuesta) {
  document.querySelector('.l-container').innerHTML = ''
  respuesta.forEach((clase) => {
    document.querySelector('.l-container').innerHTML += `
          <div class="b-game-card">
          <div onClick="navToReservas('${clase.nameMaterias}')" class="b-game-card__cover">
            <img src="../../assets/programing.jpg" alt="">
          </div>
          <div class="cardFoot">
            ${clase.nameMaterias}
          </div>
        </div>
          `
  }
  )
}

function pintarProfesores(profesor) {
  var cardElement = document.createElement('div');
  cardElement.className = 'card';
  cardElement.style.width = '17rem';
  cardElement.id = `${profesor.id}`

  // Crear el elemento img con la clase 'card-img-top', atributo src y alt
  var imgElement = document.createElement('img');
  imgElement.className = 'card-img-top';
  console.log(profesor.img)
  imgElement.src = `${profesor.img}`;  // Coloca la URL correcta de la imagen
  imgElement.alt = `${profesor.nombre}`;  // Coloca el texto alternativo correcto
  imgElement.style.width = '268.800px'
  imgElement.style.height = '358.688px'


  // Crear el elemento div con la clase 'card-body'
  var cardBodyElement = document.createElement('div');
  cardBodyElement.className = 'card-body';
  cardBodyElement.style.height = '160px'
  imgElement.style.width = '269.800px'

  // Crear el elemento h5 con la clase 'card-title' y texto
  var titleElement = document.createElement('h5');
  titleElement.className = 'card-title';
  var titleText = document.createTextNode(`${profesor.nombre}`);
  titleElement.appendChild(titleText);


  // Crear el elemento p con la clase 'card-text' y texto
  var textElement = document.createElement('p');
  textElement.style.height = '48px'
  textElement.className = 'card-text';
  var textNode = document.createTextNode(`${profesor.descripcion}`);
  textElement.appendChild(textNode);

  // Crear el elemento a con la clase 'btn btn-primary', atributo href y texto
  var linkElement = document.createElement('a');
  linkElement.className = 'btn btn-primary';
  linkElement.href = '';
  linkElement.setAttribute('prf-id', `${profesor.id}`)
  linkElement.addEventListener('click', (evento) => {
    evento.preventDefault()
    const cardprofesores = document.querySelector('.l-container').querySelectorAll('.card')
    cardprofesores.forEach(card => {
      if (card.id !== profesor.id) {
        card.classList.add('displayNone')
        printCitas(document.querySelector('.l-container'), profesor.id)
      }
    })

  })
  var linkText = document.createTextNode('Disponibilidad');
  linkElement.appendChild(linkText);

  // Construir la estructura del elemento card
  cardElement.appendChild(imgElement);
  cardElement.appendChild(cardBodyElement);
  cardBodyElement.appendChild(titleElement);
  cardBodyElement.appendChild(textElement);
  cardBodyElement.appendChild(linkElement);

  // Añadir el elemento card al cuerpo del documento
  document.querySelector('.l-container').appendChild(cardElement);
}

function crearNodoParaPintarCitas(nodoHTML) {

  const existSection = document.querySelector('body > main > div > section')
  console.log(existSection)

  if (existSection) {
    nodoHTML.removeChild(existSection)
  }
  let sectionElement = document.createElement('section');
  sectionElement.classList.add('placeSection');

  // Crear el elemento div con la clase 'card text-center'
  let cardElement = document.createElement('div');
  cardElement.className = 'card text-center';

  // Crear el elemento div con la clase 'card-header'
  cardHeaderElement = document.createElement('div');
  cardHeaderElement.className = 'card-header';

  // Crear el elemento ul con la clase 'nav nav-tabs card-header-tabs gap-1'
  const ulElement = document.createElement('ul');
  ulElement.className = 'nav nav-tabs card-header-tabs gap-1';

  // Crear los elementos li y a para cada día de la semana
  let daysOfWeek = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
  for (var i = 0; i < daysOfWeek.length; i++) {
    const liElement = document.createElement('li');
    liElement.className = 'nav-item';

    const aElement = document.createElement('a');
    aElement.className = 'nav-link' + (i === 0 ? ' active' : ''); // Agregar la clase 'active' al primer día
    aElement.textContent = daysOfWeek[i];

    liElement.appendChild(aElement);
    ulElement.appendChild(liElement);
  }

  // Crear el elemento div con la clase 'card-body'
  const cardBodyElement = document.createElement('div');
  cardBodyElement.className = 'card-body';

  // Construir la estructura del objeto
  cardHeaderElement.appendChild(ulElement);
  cardElement.appendChild(cardHeaderElement);
  cardElement.appendChild(cardBodyElement);
  sectionElement.appendChild(cardElement);

  // Añadir el elemento section al cuerpo del documento
  nodoHTML.appendChild(sectionElement)

}

function ponerCitas(dia, citas, nodo){
  let citasPintar = Array(...citas)
      
      citasPintar = citasPintar.filter(cita => cita.day === dia)
      console.log(citasPintar)
      citasPintar.forEach(cita => {
        
        nodo.innerHTML += `
        <div class="trip-result"><div class="row trip-row"><!----> <div class="travel-operator col-sm-3 col-md-3"><img src="https://cdn.pinbus.com/common/img/operadoras/svg/copetran.svg" alt="Copetran LTDA" class="operator-logo img-responsive" data-gtm-vis-recent-on-screen1714929_64="4025" data-gtm-vis-first-on-screen1714929_64="4025" data-gtm-vis-total-visible-time1714929_64="100" data-gtm-vis-has-fired1714929_64="1"> <!----> <!----></div> <div class="col-md-9 travel-connection-wrapper"><div class="travel-connection-inner trip-info-box"><div class="travel-connection" style="display: none;"><img src="/../assets/img/connections/dos-pisos.svg" alt="Bus Doble Piso">
                        Doble Piso
                    </div> <div class="travel-connection" style="display: none;"><img src="/../assets/img/connections/directo-2.svg" alt="Bus Directo">
                        Directo
                    </div> <div class="travel-connection" style="display: none;"><img src="/../assets/img/connections/en-transito-1.svg" alt="Bus en tránsito" style="height: 22px;">
                        En tránsito
                    </div> <div data-toggle="tooltip" data-placement="bottom" title="Revisa condiciones en políticas del viaje" class="travel-connection" style="display: none;"><img src="/../assets/img/connections/reembolsable.svg" alt="Reembolsable">
                        Reembolsable
                    </div> <div class="travel-connection" style="display: none;"><img src="/../assets/img/connections/flechas_conexion.svg" alt="Conexión">
                        0 Conexiones
                    </div></div></div></div> <div class="row trip-row trip-hours"><div class="col-md-6"><div class="row"><div class="duration-box"><div style="position: relative;"><label class="danger" style="height: 16px; display: block; text-align: center; margin: 8px 0px 2px;"><span style="display: none;">18 Sillas Disp.</span></label> <span class="travel-duration">4h 45m (Aprox)</span></div></div> <div class="col-md-7 trip-info-box"><label>Salida</label> <h4>10:00 p.m.</h4></div> <div class="col-md-5 trip-info-box"><label>Llegada</label> <h4 data-toggle="tooltip" data-placement="bottom" title="" data-original-title="Llegada el domingo 4 de febrero de 2024">02:45 a.m.<span class="plusday"><img src="/../assets/img/connections/plusday.svg" alt="Un día más"></span></h4></div></div> <div class="row"><div class="col-md-7 trip-info-box"><p>Terminal del Norte</p> <!----></div> <div class="col-md-5 trip-info-box"><p>Terminal de Cimitarra</p></div></div></div> <div class="col-md-3"><label>Tipo de bus</label> <div class="travel-services"><h4 data-toggle="tooltip" data-placement="top" title="" class="bus-service-name" data-original-title="Sprinter - Basico">Sprinter - Basico</h4> <div class="bus-service-container"><a href="#" data-toggle="tooltip" data-placement="top" title="" data-original-title="Aire Acondicionado"><img src="/../assets/img/operadoras/servicios/air_conditioner.svg"></a><a href="#" data-toggle="tooltip" data-placement="top" title="Toma Corriente"><img src="/../assets/img/operadoras/servicios/socket_energy.svg"></a><a href="#" data-toggle="tooltip" data-placement="top" title="Wifi"><img src="/../assets/img/operadoras/servicios/wifi.svg"></a> <!----></div></div></div> <div class="col-md-3 text-right"><label>Precio desde</label> <div style="display: flex; align-items: center; justify-content: end;"><small class="" style="display: none;">$50,000</small> <h4 style="color: rgb(0, 107, 177);">$50,000</h4> <img src="/../assets/img/badge_descuento.svg" alt="Descuento" style="width: 16px; margin-left: 5px; display: none;"></div> <p><!----></p></div></div> <div class="row trip-row"><div class="col-md-9 trip-details"><div class="button-container"><button class="det det-default"><span class="">Terminales</span></button> <div class="border"></div> <button class="det det-default"><span class="">Fotos</span></button> <div class="border"></div> <button class="det det-default"><span class="">Servicios</span></button> <div class="border"></div> <button class="det det-default"><span class="">Calificaciones</span></button> <div class="border"></div> <button class="det det-default"><span class="">Políticas</span></button></div></div> <div class="col-md-3 btn-chairs"><button class="btn btn-primary btn-block" style="border-color: rgb(255, 79, 58); color: rgb(255, 255, 255); background-color: rgb(255, 79, 58);">
                    Ver Sillas
                </button> <!----></div></div> <!----> <!----> <!----> <div class="travel-details" style="display: none;"><div class="row-flex"><div class="col-xs-4 city"><h6><strong>Salida</strong></h6> <p class="p-dashed">10:00 p.m. Medellin</p> <p><strong>Terminal del Norte</strong></p></div>  <div class="col-xs-4 city duration"><h6 class="p-dashed"><strong>Duración de viaje</strong><br>
                        4h 45m (Aprox)
                    </h6></div>  <div class="col-xs-4 city"><h6><strong>Llegada</strong></h6> <p>02:45 a.m. Cimitarra</p> <p><strong>Terminal de Cimitarra</strong></p></div></div> <div class="row-flex"><div class="col-xs-4 city column"><img src="/../assets/img/connections/bus.svg" alt="Origen"></div>  <div class="col-xs-4 city duration column-no-image"></div>  <div class="col-xs-4 city"><img src="/../assets/img/connections/destino.svg" alt="Origen"></div></div></div> <div class="bus-details" style="display: none;"><ul role="tablist" class="nav nav-tabs nav-justified"><li class="active"><a href="#cambios65b7f2ed7d4b31159666384056628" data-toggle="tab">Cambios y Cancelaciones</a> <div class="border"></div></li> <li><a href="#equipaje65b7f2ed7d4b31159666384056628" data-toggle="tab">Equipaje Permitido</a> <div class="border"></div></li> <li><a href="#menores65b7f2ed7d4b31159666384056628" data-toggle="tab">Menores</a> <div class="border"></div></li> <li><a href="#reembolso65b7f2ed7d4b31159666384056628" data-toggle="tab">Reembolso</a> <div class="border"></div></li> <li><a href="#mascotas65b7f2ed7d4b31159666384056628" data-toggle="tab">Mascotas</a></li></ul> <div class="tab-content"><div id="cambios65b7f2ed7d4b31159666384056628" class="tab-pane active">En Copetran puedes desistir de tu viaje dando previo aviso en los términos del Contrato de Transporte de Pasajeros publicado en la página web www.copetran.com. Si solicitas un cambio de horario, realizar una cancelación o adelantar un proceso de devolución, debes radicar tu solicitud en el correo electrónico servicioalcliente@copetran.com, con mínimo tres (3) horas de anticipación a la hora de salida del viaje y desde el e-mail registrado en la compra. Ten en cuenta que radicando la solicitud con mínimo tres (3) horas de anticipación, tendrás derecho a:
                    <h4>Aplica Reembolso/Penalidad</h4>
                    Ten en cuenta que la empresa de transporte COPETRAN puede aplicar una penalidad por reembolso del 10% si la solicitud se hace con más de 6 horas antes del viaje (independiente la fecha de compra), 50% si la solicitud se hace de 5 a 1 hora antes del viaje, o 100% si la solicitud se hace con menos de 1 hora antes del viaje o pasada la hora, adicionalmente el cargo administrativo (Fee) no tiene devolución.
                </div> <div id="mascotas65b7f2ed7d4b31159666384056628" class="tab-pane">
                        Aire Acondicionado
                    </div><div class="item"><img src="/../../assets/img/operadoras/servicios/socket_energy.svg">
                        Toma Corriente
                    </div><div class="item"><img src="/../../assets/img/operadoras/servicios/wifi.svg">
                        Wifi
                    </div> <!----></div><div class="bus-services-tab"><div class="item"><img src="/../../assets/img/operadoras/servicios/tracing.svg">
                        Monitoreo 24 horas
                    </div> <div class="no-item"></div></div></div></div> <div class="bus-details" style="display: none;"><div><div class="image-slider"><div class="main-slider"><button><i class="fa fa-angle-left"></i></button> <img src="https://cdn.pinbus.com/common/img/operadoras/buses/copetran/sprinter/Perfil.webp" alt="Imagen del bus"> <button><i class="fa fa-angle-right"></i></button></div> <div class="thumbnail-slider"><div class="thumbnail-container" style="transform: translateX(0px);"><div><img src="https://cdn.pinbus.com/common/img/operadoras/buses/copetran/sprinter/Perfil.webp" alt="Miniatura bus"></div><div><img src="https://cdn.pinbus.com/common/img/operadoras/buses/copetran/sprinter/Sillas.webp" alt="Miniatura bus"></div></div></div> <div class="bullets"><span class="active"></span><span class=""></span></div></div> <p>Imágenes de referencia, las características del bus pueden cambiar por decisión de la empresa de transporte.</p></div></div> <div class="bus-details" style="display: none;"><div class="no-item">
                Aún no tenemos suficientes calificaciones para este servicio
            </div></div></div>
        `
      })
}
