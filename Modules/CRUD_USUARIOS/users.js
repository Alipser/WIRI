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
}

export async function getMultipleUsers() {
  const url = `http://localhost:3000/user/`;
  const response = await fetch(url);
  const dato = await response.json();
  return await dato;
}
