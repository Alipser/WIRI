export async function postUser(user) {
  const url = "http://localhost:3000/user";
  const response = await fetch(url, {
    method: "POST",
    body: user,
    headers: { "Content-type": "application/json; charset=UTF-8" },
  });
  console.log(response);
}


// sirve para olvido contraseña
export async function patchUser(id, objeto) {
  const url = `http://localhost:3000/user/${id}`;
  const response = await fetch(url, {
    method: "PATCH",
    body: objeto,
    headers: { "Content-type": "application/json; charset=UTF-8" },
  });
  console.log(response);
}


//SERVIR PARA UN ADMINISTRADOR
export async function deleteUser(id) {
  const url = `http://localhost:3000/user/${id}`;
  const response = await fetch(url, {
    method: "DELETE",
  });
  console.log(response);
}


//PARA TARJETAS DE USUARIOS
export async function getUser(id) {
  const url = `http://localhost:3000/user/${id}`;
  const response = await fetch(url);
  const dato = response.json();
  return await dato;
}

export async function getMultipleUsers() {
  const url = `http://localhost:3000/user/`;
  const response = await fetch(url);
  const datos = await response.json();
  return await datos;
}


//Funcion que se llama en el login la intencion es obtener un usuario a partir de su id

export async function getUsersbyEmail(email) {
  //queryparam parametro de busqueda
  console.log(`http://localhost:3000/user?email=${email}`);
  const respuesta = await fetch(`http://localhost:3000/user?email=${email} `);
  const data = await respuesta.json();
  return data;
}

