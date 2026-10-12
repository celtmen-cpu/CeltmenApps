/* Recherche + filtres de la page d'accueil Celtmen Apps */
(function () {
  "use strict";
  var APPS = window.APPS_DATA || [];
  var activeCat = "all";
  var box = document.getElementById("apps");
  var input = document.getElementById("search");
  var count = document.getElementById("count");
  var labels = { games: "Jeux", entertainment: "Divertissement" };
  function label(c) { return labels[c] || c; }

  function render() {
    var q = (input.value || "").trim().toLowerCase();
    var shown = 0;
    box.innerHTML = "";
    APPS.forEach(function (a) {
      if (activeCat !== "all" && a.category !== activeCat) return;
      var hay = (a.name + " " + a.subtitle + " " + a.developer + " " + label(a.category)).toLowerCase();
      if (q && hay.indexOf(q) === -1) return;
      shown++;
      var card = document.createElement("article");
      card.className = "card";
      var img = document.createElement("img");
      img.src = a.icon; img.alt = a.name; img.loading = "lazy";
      img.onerror = function () { this.onerror = null; this.src = "assets/optimized/logoCeltmen.png"; };
      var div = document.createElement("div");
      var h = document.createElement("h2"); h.textContent = a.name;
      var p = document.createElement("p"); p.className = "sub";
      p.textContent = a.subtitle + (a.version ? " - v" + a.version : "");
      var b = document.createElement("span"); b.className = "badge";
      b.textContent = label(a.category) + " - " + a.developer;
      var link = document.createElement("a"); link.className = "get";
      link.href = a.link; link.textContent = "Obtenir";
      div.appendChild(h); div.appendChild(p); div.appendChild(b);
      div.appendChild(document.createElement("br")); div.appendChild(link);
      card.appendChild(img); card.appendChild(div);
      box.appendChild(card);
    });
    count.textContent = shown === 0 ? "Aucun resultat" : (shown + (shown > 1 ? " applications" : " application"));
    if (shown === 0) {
      var e = document.createElement("div");
      e.className = "empty";
      e.innerHTML = "<strong>Aucune app trouvee</strong>Essayez un autre mot-cle (ex : rush, jeu, sentinal).";
      box.appendChild(e);
    }
  }

  input.addEventListener("input", render);
  document.getElementById("filters").addEventListener("click", function (ev) {
    var btn = ev.target.closest ? ev.target.closest("button") : null;
    if (!btn) return;
    activeCat = btn.getAttribute("data-cat");
    var all = this.querySelectorAll("button");
    for (var i = 0; i < all.length; i++) {
      if (all[i] === btn) all[i].classList.add("on");
      else all[i].classList.remove("on");
    }
    render();
  });

  // Enrichit depuis source.json si dispo (donnees a jour)
  fetch("source.json", { cache: "no-store" }).then(function (r) {
    if (!r.ok) throw 0;
    return r.json();
  }).then(function (d) {
    if (!d || !d.apps || !d.apps.length) return;
    APPS = d.apps.map(function (a) {
      var v = (a.versions && a.versions[0]) || {};
      var link = v.downloadURL || "#";
      if (/nighrush/i.test(a.bundleIdentifier || "")) link = "NightRush/";
      return {
        name: a.name,
        subtitle: a.subtitle || a.localizedDescription || "",
        developer: a.developerName || "Celtmen",
        category: a.category || "entertainment",
        icon: a.iconURL,
        link: link,
        version: v.version || ""
      };
    });
    window.APPS_DATA = APPS;
    render();
  }).catch(function () {});

  try {
    var q0 = new URLSearchParams(location.search).get("q");
    if (q0) input.value = q0;
  } catch (e) {}

  render();
})();
