import { avisos, clearDiv } from "../Modules/Alertas/alertas.js";

//SELECTORES<<
const login = document.querySelector(".login");
const ingresar = document.querySelector("#btnLogin");
const usuarioGlobal = document.getElementById("usuario");
const passwordGlobal = document.getElementById("contrasena");

const url = "http://localhost:3000/user";

//EVENTOS
btnLogin.addEventListener("click", async (event) => {
  event.preventDefault();
  const email = usuarioGlobal.value;
  const password = passwordGlobal.value;

  const regexCorreo = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const isValidCorreo = regexCorreo.test(email);
  if (isValidCorreo) {
    const dataUser = await getUsersbyEmail(email);
    console.log(dataUser);
    if (dataUser.length > 0) {
      console.log("existe el suario");
      console.log(password, dataUser[0].contrasena);
      if (password === dataUser[0].contrasena) {
        console.log(
          "Las constraseñas son iguales y  deberia redirigir al home"
        );
      } else {
        avisos("La contraseña no coincide", false)
      }
    } else {
      console.log(
        avisos("El usuario no existe",false)
      );
    }
  } else {
    avisos("El correo no es valido", false);
  }
});

async function getUsersbyEmail(email) {
  //queryparam parametro de busqueda
  console.log(`${url}?email=${email}`);
  const respuesta = await fetch(`${url}?email=${email} `);
  const data = await respuesta.json();
  return data;
}
