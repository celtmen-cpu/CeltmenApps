/* Affiche la bonne app selon ?app= dans l'URL */
(function () {
  "use strict";
  var data = window.DOWNLOAD_APPS || {};
  var id = "night-rush";
  try {
    var q = new URLSearchParams(location.search).get("app");
    if (q && data[q]) id = q;
  } catch (e) {}
  var app = data[id] || data["night-rush"];
  document.title = "Telechargement " + app.name;
  document.getElementById("metaTitle").textContent = "Telechargement " + app.name;
  document.getElementById("appTitle").textContent = "Telechargement " + app.name;
  document.getElementById("appNote").textContent = app.note;
  document.getElementById("appVer").textContent = app.version;
  var logo = document.getElementById("appLogo");
  logo.src = app.logo;
  logo.alt = app.name;
  logo.onerror = function () { this.onerror = null; this.src = "assets/optimized/logoCeltmen.png"; };

  function wire(btnId, url, label) {
    var b = document.getElementById(btnId);
    if (url && url !== "" && url !== "LIEN-A-METTRE-ICI") {
      b.addEventListener("click", function () { window.location.href = url; });
    } else {
      b.classList.add("todo");
      b.title = "Bientot disponible";
      b.addEventListener("click", function () {
        alert("Lien " + label + " bientot disponible pour " + app.name + ".");
      });
    }
  }
  wire("btnAndroid", app.links.android, "Android");
  wire("btnIos", app.links.ios, "iOS");
  wire("btnWin", app.links.windows, "Windows");
  wire("btnMac", app.links.mac, "Mac");
})();
