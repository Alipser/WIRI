//nodos

const listaTemas = document.querySelector('#nav > div > div.d-flex.gap-1.align-items-start > div:nth-child(2) > ul');
const html = document.querySelector('html');


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
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Special title treatment</h5>
            <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
            <a href="#" class="btn btn-primary">Go somewhere</a>
          </div>
         </div>
        `
      })
}
