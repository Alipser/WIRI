//SELECTORES

const formulario = document.querySelector(".form");
const btnEnviar = document.querySelector(".btn-btn-primary");

const camposForm = document.querySelectorAll(".form-control");
const emailInput = document.querySelector("#exampleInputEmail1");
const paswordInput = document.querySelector("#exampleInputPassword1");
const paswordInput2 = document.querySelector("#exampleInputPassword2");
const alerta = document.querySelector(".alerta");

//EVENTOS
btnEnviar.addEventListener("click", (event) => {
  event.preventDefault();
  let registroUsuario = {
    email: "",
    contrasena: "",
    contrasena2: "",
  };

  registroUsuario.email = emailInput.value;
  registroUsuario.contrasena = paswordInput.value;
  registroUsuario.contrasena2 = paswordInput2.value;

  const someIsInvalid = Object.values(registroUsuario).some(
    (value) => value === ""
  );

  if (!someIsInvalid) {
    const regexCorreo = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const validacionCorreo = regexCorreo.test(registroUsuario.email);
    if (!validacionCorreo) {
      avisos("Correo no valido", false);
    } else if (registroUsuario.contrasena !== registroUsuario.contrasena2) {
      avisos("Contraseñas no coinciden", false);
    } else {
      const registroUsuarioString = JSON.stringify(registroUsuario);
      console.log(registroUsuarioString);

      localStorage.setItem("usuario", registroUsuarioString);

      avisos("Contraseña actualizada correctamente", true);
    }
  } else {
    avisos("Todos los campos son obligatorios", false);
  }
  formulario.reset();
});



function avisos(texto, condicion) {
  const alert = document.createElement(`div`);
  const icono = document.createElement("i");
  const alertTitulo = document.createElement("p");
  const hr = document.createElement("hr");
  alertTitulo.textContent = texto;
  alert.classList.add("alert");
  icono.classList.add("bx");
  alert.setAttribute("role", "alert");
  alertTitulo.classList.add("alert-heading");

  if (condicion == true) {
    alert.classList.add("alert-success");
    icono.classList.add("bx-check-circle");
    icono.classList.add("check");
  } else {
    alert.classList.add("alert-danger");
    icono.classList.add("bx");
    icono.classList.add("bx-x-circle");
    icono.classList.add("check");
  }

  clearDiv();
  alert.appendChild(icono);
  alert.appendChild(alertTitulo);
  alert.appendChild(hr);
  alerta.appendChild(alert);

  setTimeout(() => {
    alert.style.display = "none";
  }, 2000);
}

function clearDiv() {
  while (alerta.firstChild) {
    alerta.removeChild(alerta.firstChild);
  }
}


