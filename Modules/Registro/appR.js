//SELECTORES

import { postUser, getMultipleUsers } from "../CRUD_USUARIOS/users.js";
import { avisos, clearDiv} from "../Alertas/alertas.js"

const formulario = document.querySelector(".form");
const btnEnviar = document.querySelector(".btn-btn-primary");

const camposForm = document.querySelectorAll(".form-control");
const nombreInput = document.querySelector("#examplename");
const apellidosInput = document.querySelector("#examplelastname");
const emailInput = document.querySelector("#exampleInputEmail1");
const paswordInput = document.querySelector("#exampleInputPassword1");
const paswordInput2 = document.querySelector("#exampleInputPassword2");


//EVENTOS
btnEnviar.addEventListener("click", (event) => {
  event.preventDefault();
  let registroUsuario = {
    nombre: "",
    apellido: "",
    email: "",
    contrasena: "",
    contrasena2: "",
  };

  registroUsuario.nombre = nombreInput.value;
  registroUsuario.apellido = apellidosInput.value;
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
      emailInput.classList.add('is-invalid')
      avisos("Correo no valido", false);
    } else if (registroUsuario.contrasena !== registroUsuario.contrasena2) {
      avisos("Contraseñas no coinciden", false);
    } else {
      const registroUsuarioString = JSON.stringify(registroUsuario);
      postUser(registroUsuarioString);
      console.log(registroUsuarioString);

      // localStorage.setItem("usuario", registroUsuarioString);

      avisos("Usuario creado exitosamente", true);
    }
  } else {
    avisos("Todos los campos son obligatorios", false);
  }
  formulario.reset();
});



let data2 = getMultipleUsers();

data2.then((res) => {
  console.log(res);
});
