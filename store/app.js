/*!
 * Celtmen Apps - fiche détaillée d'une application (app.html?id=<id>)
 * ---------------------------------------------------------------------------
 * Rendu 100% DOM (textContent/createElement) : pas de concaténation de HTML,
 * donc pas d'injection possible et un rendu plus rapide. Tous les textes
 * viennent de i18n.js et sont remis à jour au changement de langue.
 */
(function (global) {
  "use strict";

  var container = document.getElementById("app");
  if (!container) {
    return;
  }

  var id = new URLSearchParams(global.location.search).get("id");
  var app = global.StoreData ? global.StoreData.find(id) : null;

  function text(tag, className, content) {
    var node = document.createElement(tag);
    if (className) {
      node.className = className;
    }
    node.textContent = content;
    return node;
  }

  function backLink() {
    var link = text("a", "back-link", "\u2190 " + global.I18N.t("ui.backStore"));
    link.href = "index.html";
    return link;
  }

  function setMeta(description) {
    var meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute("content", description);
    }
  }

  function notFound() {
    document.title = global.I18N.t("ui.notFoundTitle") + " - " + global.I18N.t("ui.brand");

    var section = document.createElement("div");
    section.className = "section";
    section.appendChild(text("h1", null, global.I18N.t("ui.notFoundTitle")));
    section.appendChild(text("p", null, global.I18N.t("ui.notFoundText")));

    container.appendChild(backLink());
    container.appendChild(section);
  }

  function hero(data) {
    var box = document.createElement("div");
    box.className = "hero";

    box.appendChild(global.StoreData.picture(app.icon, data.name));

    var info = document.createElement("div");
    info.appendChild(text("h1", null, data.name));
    info.appendChild(text("p", null, data.subtitle));
    info.appendChild(text("p", null, global.I18N.t("ui.by") + " " + data.developer));

    var get = text("a", "button", global.I18N.t("ui.get"));
    get.href = app.link;
    get.target = "_blank";
    get.rel = "noopener";
    info.appendChild(get);

    box.appendChild(info);
    return box;
  }

  function infoGrid(data) {
    var section = document.createElement("div");
    section.className = "section";

    var grid = document.createElement("div");
    grid.className = "info-grid";

    [
      { value: data.age, label: global.I18N.t("ui.age") },
      { value: data.size, label: global.I18N.t("ui.size") },
      { value: data.version, label: global.I18N.t("ui.version") }
    ].forEach(function (item) {
      var box = document.createElement("div");
      box.className = "info-box";
      box.appendChild(text("strong", null, item.value));
      box.appendChild(text("span", null, item.label));
      grid.appendChild(box);
    });

    section.appendChild(grid);
    return section;
  }

  function screenshots(data) {
    var section = document.createElement("div");
    section.className = "section";
    section.appendChild(text("h2", null, global.I18N.t("ui.screenshots")));

    var screens = document.createElement("div");
    screens.className = "screens";

    app.screenshots.forEach(function (shot, index) {
      screens.appendChild(global.StoreData.picture(shot, data.screensAlt[index] || data.name, {
        width: app.shotSize.width,
        height: app.shotSize.height,
        lazy: true
      }));
    });

    section.appendChild(screens);
    return section;
  }

  function description(data) {
    var section = document.createElement("div");
    section.className = "section";
    section.appendChild(text("h2", null, global.I18N.t("ui.description")));
    section.appendChild(text("p", null, data.description));
    return section;
  }

  function render() {
    container.textContent = "";

    if (!app) {
      setMeta(global.I18N.t("meta.appDesc"));
      notFound();
      return;
    }

    var data = global.StoreData.localize(app);
    document.title = data.name + " - " + global.I18N.t("ui.brand");
    setMeta(data.description);

    container.appendChild(backLink());
    container.appendChild(hero(data));
    container.appendChild(infoGrid(data));
    container.appendChild(screenshots(data));
    container.appendChild(description(data));
  }

  global.I18N.onChange(render);
  render();

})(window);