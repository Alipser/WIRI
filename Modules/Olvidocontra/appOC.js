import { patchUser, getUsersbyEmail } from "../CRUD_USUARIOS/users.js";
import { avisos, clearDiv } from "../Alertas/alertas.js";

//SELECTORES

const formulario = document.querySelector(".form");
const btnEnviar = document.querySelector(".btn-btn-primary");

const camposForm = document.querySelectorAll(".form-control");
const emailInput = document.querySelector("#exampleInputEmail1");
const paswordInput = document.querySelector("#exampleInputPassword1");
const paswordInput2 = document.querySelector("#exampleInputPassword2");

const regexCorreo = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const regexPassword =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&.]|[^ ]){8,15}$/;

console.log(regexPassword);
let alertContraExist = false;

//EVENTOS
btnEnviar.addEventListener("click", async (event) => {
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
    const validacionCorreo = regexCorreo.test(registroUsuario.email);
    if (!validacionCorreo) {
      avisos("Correo no valido", false);
    } else if (registroUsuario.contrasena !== registroUsuario.contrasena2) {
      avisos("Contraseñas no coinciden", false);
    } else {
      debugger;
      regexPassword.test(registroUsuario.contrasena2);
      if (regexPassword.test(registroUsuario.contrasena)) {
        const data = await getUsersbyEmail(registroUsuario.email);
        const idUser = data[0].id;
        if (data.length > 0) {
          avisos("El correo ya esta registrado", true);
          emailInput.classList.add("is-invalid");
          emailInput.classList.remove("is-valid");

          const registroUsuarioString = JSON.stringify(registroUsuario);
          patchUser(idUser, registroUsuarioString);
          setTimeout(() => {
            window.location.href = "http://127.0.0.1:5500/";
          }, 2000);
          avisos("Usuario creado exitosamente", true);
        } else {
          avisos("El correo no esta registrado", false);
          emailInput.classList.add("is-invalid");
          emailInput.classList.remove("is-valid");
        }
      } else {
        avisos(`La contrsaeña no tiene el formato correcto`, false);
        if (!alertContraExist) {
          const pieform = document.querySelector(
            "body > main > section.login > div > form > div.pieForm"
          );
          const prueba = document.createElement("div");
          prueba.classList.add("ocasionalAlert");
          prueba.innerHTML = `
          <p class="link-danger link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover mb-0">La contraseña debe tener:</p>
          <p class="link-danger link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover mb-0">1  Mayuscula </p>
          <p class="link-danger link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover mb-0">1  Caracter especial </p>
          <p class="link-danger link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover mb-0">8  Caracteres Mínimo </p>
          <p class="link-danger link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover mb-0">15 Caracteres Máximo </p>
          <p class="link-danger link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover mb-3"> Las contraseñas deben coincidir</p>
          `;
          formulario.insertBefore(prueba, pieform);
          alertContraExist = true;
          debugger;
        }
      }
    }
  } else {
    avisos("Todos los campos son obligatorios", false);
  }
});

paswordInput2.addEventListener("blur", () => {
  if (alertContraExist) {
    const passAreTheSame = paswordInput2.value === paswordInput.value;
    const pass2Isvalid = regexPassword.test(paswordInput2.value);
    if (passAreTheSame && pass2Isvalid) {
      formulario.removeChild(document.querySelector(".ocasionalAlert"));
      paswordInput.classList.add("isvalid");
      paswordInput2.classList.add("isvalid");
      alertContraExist = false;
    }
  }
});

// function avisos(texto, condicion) {
//   const alert = document.createElement(`div`);
//   const icono = document.createElement("i");
//   const alertTitulo = document.createElement("p");
//   const hr = document.createElement("hr");
//   alertTitulo.textContent = texto;
//   alert.classList.add("alert");
//   icono.classList.add("bx");
//   alert.setAttribute("role", "alert");
//   alertTitulo.classList.add("alert-heading");

//   if (condicion == true) {
//     alert.classList.add("alert-success");
//     icono.classList.add("bx-check-circle");
//     icono.classList.add("check");
//   } else {
//     alert.classList.add("alert-danger");
//     icono.classList.add("bx");
//     icono.classList.add("bx-x-circle");
//     icono.classList.add("check");
//   }

//   clearDiv();
//   alert.appendChild(icono);
//   alert.appendChild(alertTitulo);
//   alert.appendChild(hr);
//   alerta.appendChild(alert);

//   setTimeout(() => {
//     alert.style.display = "none";
//   }, 2000);
// }

// function clearDiv() {
//   while (alerta.firstChild) {
//     alerta.removeChild(alerta.firstChild);
//   }
// }
