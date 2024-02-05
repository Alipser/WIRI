export async function getProfesores(materia) {
    const url = `http://localhost:3000/profesores?materia=${materia}`;
    console.log(url);
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return data;
  }

  export async function getProfesoresid(id) {
    const url = `http://localhost:3000/profesores/${id}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return data;
  }