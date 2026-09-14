/*!
 * Celtmen Apps - catalogue du store
 * ---------------------------------------------------------------------------
 * - expose les données brutes (window.StoreData) utilisées par app.js
 * - rend la liste des applications de store/index.html (bilingue via I18N)
 *
 * Les textes ne sont PAS stockés ici : ils viennent de i18n.js, ce qui évite
 * toute duplication entre la liste, la fiche détaillée et les pages dédiées.
 */
(function (global) {
  "use strict";

  /* Assets optimisés (WebP + repli PNG/JPEG), générés par
     tools/optimize-images.sh à partir de assets/source. Servis par le même
     site (GitHub Pages) : chemins relatifs, aucun CDN externe. */
  var ICONS = "../assets/optimized/";

  /* Taille intrinsèque des icônes générées (voir tools/optimize-images.sh) */
  var ICON_SIZE = 384;

  var APPS = [
    {
      id: "night-rush",
      key: "apps.night-rush",
      developer: "Celtmen",
      categoryKey: "categories.games",
      link: "../NightRush/",
      page: "night-rush.html",
      icon: {
        webp: ICONS + "NightRush/logoNightRush.webp",
        fallback: ICONS + "NightRush/logoNightRush.png"
      },
      shotSize: { width: 1000, height: 460 },
      screenshots: [
        { webp: ICONS + "NightRush/ScreenShotGamePlay.webp", fallback: ICONS + "NightRush/ScreenShotGamePlay.jpg" },
        { webp: ICONS + "NightRush/ScreenShotSalon.webp", fallback: ICONS + "NightRush/ScreenShotSalon.jpg" },
        { webp: ICONS + "NightRush/ScreenShotClassement.webp", fallback: ICONS + "NightRush/ScreenShotClassement.jpg" }
      ],
      screensAltKeys: [
        "apps.night-rush.screensAlt1",
        "apps.night-rush.screensAlt2",
        "apps.night-rush.screensAlt3"
      ]
    },
    {
      id: "havok-app",
      key: "apps.havok-app",
      developer: "Alvin",
      categoryKey: "categories.entertainment",
      link: "https://github.com/celtmen-cpu/CeltmenApps/releases/download/1.1.0/havokAlvin.ipa",
      page: "havok-app.html",
      icon: {
        webp: ICONS + "HavoKapp/Icon-havok-default.webp",
        fallback: ICONS + "HavoKapp/Icon-havok-default.png"
      },
      shotSize: { width: 462, height: 1000 },
      screenshots: [
        { webp: ICONS + "HavoKapp/IMG_1087.webp", fallback: ICONS + "HavoKapp/IMG_1087.jpg" },
        { webp: ICONS + "HavoKapp/IMG_1088.webp", fallback: ICONS + "HavoKapp/IMG_1088.jpg" },
        { webp: ICONS + "HavoKapp/IMG_1089.webp", fallback: ICONS + "HavoKapp/IMG_1089.jpg" },
        { webp: ICONS + "HavoKapp/IMG_1090.webp", fallback: ICONS + "HavoKapp/IMG_1090.jpg" }
      ],
      screensAltKeys: [
        "apps.havok-app.screensAlt1",
        "apps.havok-app.screensAlt2",
        "apps.havok-app.screensAlt3",
        "apps.havok-app.screensAlt4"
      ]
    }
  ];

  /** Traduit un champ d'une application ("apps.<id>.<champ>"). */
  function value(app, field) {
    return global.I18N.t(app.key + "." + field);
  }

  /**
   * Construit un <picture> : WebP pour les navigateurs modernes, repli
   * PNG/JPEG sinon. Les dimensions intrinsèques réservent la place de l'image
   * avant son chargement (évite les sauts de mise en page).
   */
  function picture(media, alt, options) {
    options = options || {};
    var box = document.createElement("picture");
    var source = document.createElement("source");
    source.type = "image/webp";
    source.srcset = media.webp;
    box.appendChild(source);

    var image = document.createElement("img");
    image.src = media.fallback;
    image.alt = alt;
    image.width = options.width || ICON_SIZE;
    image.height = options.height || ICON_SIZE;
    image.decoding = "async";
    if (options.lazy) { image.loading = "lazy"; }
    box.appendChild(image);
    return box;
  }

  /** Renvoie tous les textes d'une application dans la langue courante. */
  function localize(app) {
    return {
      name: value(app, "name"),
      subtitle: value(app, "subtitle"),
      description: value(app, "description"),
      category: global.I18N.t(app.categoryKey),
      developer: app.developer,
      size: value(app, "size"),
      version: value(app, "version"),
      age: value(app, "age"),
      minIOS: value(app, "minIOS"),
      platforms: value(app, "platforms"),
      screensAlt: app.screensAltKeys.map(function (key) {
        return global.I18N.t(key);
      })
    };
  }

  function find(id) {
    for (var i = 0; i < APPS.length; i++) {
      if (APPS[i].id === id) {
        return APPS[i];
      }
    }
    return null;
  }

  global.StoreData = {
    apps: APPS,
    find: find,
    localize: localize,
    value: value,
    picture: picture,
    iconSize: ICON_SIZE
  };

  /* --- Liste des applications (store/index.html) --------------------------- */

  var container = document.getElementById("apps");
  if (!container) {
    return;
  }

  var searchInput = document.getElementById("search");
  var frame = null;

  function buildCard(app) {
    var data = localize(app);

    var card = document.createElement("article");
    card.className = "app";

    var info = document.createElement("div");
    info.className = "info";

    var title = document.createElement("h2");
    title.textContent = data.name;

    var subtitle = document.createElement("p");
    subtitle.textContent = data.subtitle;

    var view = document.createElement("a");
    view.className = "button";
    view.href = app.page;
    view.textContent = global.I18N.t("ui.view");

    info.appendChild(title);
    info.appendChild(subtitle);
    info.appendChild(view);
    card.appendChild(picture(app.icon, data.name, { lazy: true }));
    card.appendChild(info);
    return card;
  }

  function matches(app, query) {
    if (!query) {
      return true;
    }
    var data = localize(app);
    var haystack = data.name + " " + data.subtitle + " " + data.developer + " " + data.category;
    return haystack.toLowerCase().indexOf(query) !== -1;
  }

  function render() {
    var query = searchInput && searchInput.value ? searchInput.value.trim().toLowerCase() : "";
    var fragment = document.createDocumentFragment();
    var shown = 0;

    APPS.forEach(function (app) {
      if (!matches(app, query)) {
        return;
      }
      fragment.appendChild(buildCard(app));
      shown++;
    });

    container.textContent = "";

    if (shown === 0) {
      var empty = document.createElement("p");
      empty.className = "empty";
      empty.textContent = global.I18N.t("ui.noResults");
      container.appendChild(empty);
      return;
    }

    container.appendChild(fragment);
  }

  /* Regroupe les rendus sur une seule frame : évite de reconstruire la liste
     à chaque frappe quand l'utilisateur tape vite. */
  function scheduleRender() {
    if (frame !== null) {
      return;
    }
    if (global.requestAnimationFrame) {
      frame = global.requestAnimationFrame(function () {
        frame = null;
        render();
      });
    } else {
      frame = global.setTimeout(function () {
        frame = null;
        render();
      }, 16);
    }
  }

  if (searchInput) {
    searchInput.addEventListener("input", scheduleRender);
  }

  global.I18N.onChange(render);
  render();

})(window);