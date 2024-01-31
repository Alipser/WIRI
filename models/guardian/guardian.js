(() => {
  const isAuth = Boolean(localStorage.getItem("isAuth"));

  if (window.location.href == "http://127.0.0.1:5500/") {
    window.location = "http://127.0.0.1:5500/index.html";
  }

  console.log(
    window.location.href !== "./index.html",
    window.location.href,
    "http://127.0.0.1:5500/index.html"
  );

  if (window.location.href == "http://127.0.0.1:5500/index.html" && isAuth) {
    window.location =
      "http://127.0.0.1:5500/Modules/SignedHome/signedHome.html";
  } else if (
    window.location.href !== "http://127.0.0.1:5500/index.html" &&
    !isAuth
  ) {
    window.location = "http://127.0.0.1:5500/index.html";
  } else {
    console.log("por ahora el guardian no hace nada en loggin");
  }
})();
