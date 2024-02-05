//post funcion 

export async function postCita(citas) {
    const url = "http://localhost:3000/citas";
    const response = await fetch(url, {
      method: "POST",
      body: citas,
      headers: { "Content-type": "application/json; charset=UTF-8" },
    });
    console.log(response);
  }


export async function getCitas(citas){
  const url= "http://localhost:3000/citas";
  const response = await fetch(url, {
    method: "GET",
    body: citas,
    headers:{ "Content-type": "application/json; charset=UTF-8" },
});
  return await response.json()
}