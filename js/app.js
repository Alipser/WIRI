import { avisos, clearDiv } from "../Modules/Alertas/alertas.js";
import {getUsersbyEmail} from '../Modules/CRUD_USUARIOS/users.js'

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
          localStorage.setItem('isAuth', 'true')
          localStorage.setItem('dataUser', JSON.stringify(dataUser[0]))
          setTimeout(()=>{
            window.location.href='./Modules/SignedHome/signedHome.html'
            console.log('paso el segundo')
          } ,1000)
        ;
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

