export function avisos(texto, condicion) {
  const alerta =
    document.querySelector(".alerta") ?? document.createElement("div");
  alerta.classList.add(".alerta");
  alerta.style.zIndex = "5";
  alerta.style.position = "absolute";
  alerta.style.fontSize = "16px";
  alerta.style.top = "10px";
  alerta.style.right = "10px";
  document.body.appendChild(alerta);

  const alert = document.createElement(`div`);
  const icono = document.createElement("i");
  const alertTitulo = document.createElement("p");
  const hr = document.createElement("hr");
  alertTitulo.textContent = texto;
  alert.classList.add("alert");
  icono.classList.add("bx");
  alert.setAttribute("role", "alert");
  alertTitulo.classList.add("alert-heading");

  if (condicion == true) {
    alert.classList.add("alert-success");
    icono.classList.add("bx-check-circle");
    icono.classList.add("check");
  } else {
    alert.classList.add("alert-danger");
    icono.classList.add("bx");
    icono.classList.add("bx-x-circle");
    icono.classList.add("check");
  }

  icono.style.color = "black";
  icono.style.fontSize = "32px";
  icono.style.display = "flex";
  icono.style.alignItems = "center";
  icono.style.justifyContent = "center";

  clearDiv(alerta);
  alert.appendChild(icono);
  alert.appendChild(alertTitulo);
  alert.appendChild(hr);
  alerta.appendChild(alert);

  setTimeout(() => {
    alert.style.display = "none";
    document.body.removeChild(alerta);
  }, 2000);
}

export function clearDiv(alerta) {
  while (alerta.firstChild) {
    alerta.removeChild(alerta.firstChild);
  }
}
