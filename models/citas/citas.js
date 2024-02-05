export async function getClases() {
    const url = "http://localhost:3000/materias";
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }
  
  export async function pathClases(id, objeto) {
    const url = `http://localhost:3000/citas/${id}`;
    const response = await fetch(url, {
      method: "PATCH",
      body: objeto,
      headers: { "Content-type": "application/json; charset=UTF-8" },
    });
  }
  
  export async function getClaseConInfoProfe(idCita) {
    const response = await fetch(
      `http://localhost:3000/citas/${idCita}/?_embed=profesore`
    );
    const data = await response.json();
    return data;
  }
  
  export async function getCitasPorProfesor(idprof) {
    const url = `http://localhost:3000/citas?profesoreId=${idprof}`;
    console.log(url);
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return data;
  }
  
  export async function getTodaslasCitasConProfesores(userid = "f406") {
    const url = "http://localhost:3000/citas?_embed=profesore";
    const response = await fetch(url);
    const respuesta = await response.json();
    console.log(respuesta);
    console.log(userid);
    const respuestfiltradaIdUsuario = respuesta.filter((cita) =>
      cita.users.includes(userid)
    );
    console.log(respuestfiltradaIdUsuario);
    return respuestfiltradaIdUsuario;
  }