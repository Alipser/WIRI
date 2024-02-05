//SELECTORES

import { postUser, getUsersbyEmail } from "../CRUD_USUARIOS/users.js";
import { avisos, clearDiv } from "../Alertas/alertas.js";

const formulario = document.querySelector(".form");
const btnEnviar = document.querySelector(".btn-btn-primary");

const camposForm = document.querySelectorAll(".form-control");
const nombreInput = document.querySelector("#examplename");
const apellidosInput = document.querySelector("#examplelastname");
const emailInput = document.querySelector("#exampleInputEmail1");
const paswordInput = document.querySelector("#exampleInputPassword1");
const paswordInput2 = document.querySelector("#exampleInputPassword2");

const regexCorreo = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const regexPassword =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&.]|[^ ]){8,15}$/;

let alertContraExist = false;

emailInput.addEventListener("blur", () => {
  const isValidCorreo = regexCorreo.test(emailInput.value);
  if (isValidCorreo) {
    emailInput.classList.remove("is-invalid");
    emailInput.classList.add("is-valid");
  } else {
    emailInput.classList.add("is-invalid");
    emailInput.classList.remove("is-valid");
  }
});

paswordInput2.addEventListener("blur", () => {
  
  if (alertContraExist) {
    const passAreTheSame = paswordInput2.value === paswordInput.value;
    const pass2Isvalid = regexPassword.test(paswordInput2.value);
    if (passAreTheSame && pass2Isvalid) {
      formulario.removeChild(document.querySelector(".ocasionalAlert"));
      paswordInput.classList.remove("is-invalid");
      paswordInput.classList.add("is-valid");
      paswordInput2.classList.remove("is-invalid");
      paswordInput2.classList.add("is-valid");
      alertContraExist = false;
    }
  } else {
    const isValidpass2 = regexPassword.test(paswordInput2);
    const pass1pass2Same = paswordInput2.value === paswordInput.value;

    console.log(pass1pass2Same);

    if (isValidpass2 && pass1pass2Same) {
      paswordInput.classList.remove("is-invalid");
      paswordInput.classList.add("is-valid");
      paswordInput2.classList.remove("is-invalid");
      paswordInput2.classList.add("is-valid");
    } else {
      paswordInput.classList.add("is-invalid");
      paswordInput.classList.remove("is-valid");
      paswordInput2.classList.add("is-invalid");
      paswordInput2.classList.remove("is-valid");
    }
  }
});

//EVENTOS
btnEnviar.addEventListener("click", async (event) => {
  event.preventDefault();
  let registroUsuario = {
    nombre: "",
    apellido: "",
    email: "",
    contrasena: "",
    contrasena2: "",
  };

  registroUsuario.nombre = String(nombreInput.value).trim();
  registroUsuario.apellido = String(apellidosInput.value).trim();
  registroUsuario.email = String(emailInput.value).trim().toLocaleLowerCase();
  registroUsuario.contrasena = paswordInput.value;
  registroUsuario.contrasena2 = paswordInput2.value;

  const someIsInvalid = Object.values(registroUsuario).some(
    (value) => value === ""
  );

  if (!someIsInvalid) {
    const validacionCorreo = regexCorreo.test(registroUsuario.email);
    if (!validacionCorreo) {
      emailInput.classList.add("is-invalid");
      avisos("Correo no valido", false);
    } else if (registroUsuario.contrasena !== registroUsuario.contrasena2) {
      avisos("Contraseñas no coinciden", false);
    } else {
      if (regexPassword.test(registroUsuario.contrasena)) {
        const data = await getUsersbyEmail(registroUsuario.email);
        if (data.length > 0) {
          avisos("El correo ya esta registrado", false);
          emailInput.classList.add("is-invalid");
          emailInput.classList.remove("is-valid");
        } else {
          const registroUsuarioString = JSON.stringify(registroUsuario);
          postUser(registroUsuarioString);

          avisos("Usuario creado exitosamente", true);

          setTimeout(() => {
            window.location.href = "http://127.0.0.1:5500/";
          }, 2000);
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
        }
      }
    }
  } else {
    avisos("Todos los campos son obligatorios", false);
  }
});
