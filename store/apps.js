/*!
 * Celtmen Apps - catalogue du store (FR / EN)
 * ---------------------------------------------------------------------------
 * Un seul fichier de données + rendu pour store/index.html.
 * Les textes viennent de i18n.js. Pas de duplication.
 */
(function (global) {
  "use strict";

  var APPS = [
    {
      id: "night-rush",
      key: "apps.night-rush",
      developer: "Celtmen",
      categoryKey: "categories.games",
      image: "../assets/optimized/NightRush/logoNightRush.png",
      page: "night-rush.html",
      screenshots: [
        "../assets/optimized/NightRush/ScreenShotGamePlay.jpg",
        "../assets/optimized/NightRush/ScreenShotSalon.jpg",
        "../assets/optimized/NightRush/ScreenShotClassement.jpg"
      ]
    }
  ];

  function find(id) {
    for (var i = 0; i < APPS.length; i++) {
      if (APPS[i].id === id) return APPS[i];
    }
    return null;
  }

  function localize(app) {
    return {
      name: global.I18N.t(app.key + ".name"),
      subtitle: global.I18N.t(app.key + ".subtitle"),
      description: global.I18N.t(app.key + ".description"),
      category: global.I18N.t(app.categoryKey),
      developer: app.developer,
      size: global.I18N.t(app.key + ".size"),
      version: global.I18N.t(app.key + ".version"),
      age: global.I18N.t(app.key + ".age"),
      minIOS: global.I18N.t(app.key + ".minIOS"),
      platforms: global.I18N.t(app.key + ".platforms"),
      screensAlt: [
        global.I18N.t(app.key + ".screensAlt1"),
        global.I18N.t(app.key + ".screensAlt2"),
        global.I18N.t(app.key + ".screensAlt3")
      ]
    };
  }

  global.StoreData = { apps: APPS, find: find, localize: localize };

  /* --- Rendu de la liste (store/index.html) ------------------------------ */

  var container = document.getElementById("apps");
  var searchInput = document.getElementById("search");
  if (!container) return;

  function card(app) {
    var data = localize(app);

    var article = document.createElement("article");
    article.className = "app";

    var img = document.createElement("img");
    img.src = app.image;
    img.alt = data.name;
    img.loading = "lazy";
    img.decoding = "async";

    var info = document.createElement("div");
    info.className = "info";

    var h2 = document.createElement("h2");
    h2.textContent = data.name;

    var p = document.createElement("p");
    p.textContent = data.subtitle;

    var a = document.createElement("a");
    a.className = "button";
    a.href = app.page;
    a.textContent = global.I18N.t("ui.view");

    info.appendChild(h2);
    info.appendChild(p);
    info.appendChild(a);
    article.appendChild(img);
    article.appendChild(info);
    return article;
  }

  function search(query) {
    var q = query ? query.toLowerCase() : "";
    var fragment = document.createDocumentFragment();
    var shown = 0;

    APPS.forEach(function (app) {
      var data = localize(app);
      var hay = (data.name + " " + data.subtitle + " " + data.developer + " " + data.category).toLowerCase();
      if (q && hay.indexOf(q) === -1) return;
      fragment.appendChild(card(app));
      shown++;
    });

    container.textContent = "";
    if (shown === 0) {
      var empty = document.createElement("p");
      empty.className = "empty";
      empty.textContent = global.I18N.t("ui.noResults");
      container.appendChild(empty);
    } else {
      container.appendChild(fragment);
    }
  }

  if (searchInput) searchInput.addEventListener("input", function () { search(searchInput.value); });

  global.I18N.onChange(function () { search(searchInput ? searchInput.value : ""); });
  search("");

})(window);