/* Test fonctionnel : simule un vrai navigateur (jsdom) sur toutes les pages.
   Vérifie la détection automatique de la langue, le rendu et le changement de langue. */
const fs = require("fs");
const path = require("path");
const { JSDOM, VirtualConsole } = loadJsdom();

/* jsdom n'est pas une dépendance du site (100 % statique) : il ne sert qu'aux
   tests. Installez-le : npm i --prefix tools/tests jsdom  */
function loadJsdom() {
  const candidates = ["jsdom", path.join(__dirname, "node_modules/jsdom"),
    "/tmp/jsdomtest/node_modules/jsdom"];
  for (const candidate of candidates) {
    try { return require(candidate); } catch (e) { /* on essaie le suivant */ }
  }
  console.error("jsdom est requis pour ce test : npm i --prefix tools/tests jsdom");
  process.exit(2);
}

const root = path.resolve(__dirname, "..", "..");
const I18N_SRC = fs.readFileSync(path.join(root, "i18n.js"), "utf8");

let pass = 0, fail = 0;
function check(label, condition, extra) {
  if (condition) { pass++; console.log("  ✅ " + label + (extra ? " → " + extra : "")); }
  else { fail++; console.log("  ❌ " + label + (extra ? " → " + extra : "")); }
}

/** Charge une page + les scripts locaux qu'elle référence, comme un navigateur. */
function loadPage(relPath, { browserLang = "en-US", query = "", scripts = [] } = {}) {
  const full = path.join(root, relPath);
  let html = fs.readFileSync(full, "utf8");

  /* Scripts inline (ex. délégué de clic) : récupérés puis exécutés après les externes */
  const inline = [];
  html = html.replace(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g, function (_m, code) {
    inline.push(code);
    return "";
  });
  html = html.replace(/<script[^>]*\bsrc=[^>]*><\/script>/g, "");

  const warns = [];
  const vc = new VirtualConsole();
  vc.on("warn", (msg) => warns.push(String(msg)));
  vc.on("jsdomError", (err) => warns.push("jsdomError: " + err.message));

  const dom = new JSDOM(html, {
    url: "https://celtmen-cpu.github.io/CeltmenApps/" + relPath + query,
    runScripts: "outside-only",
    pretendToBeVisual: true,
    virtualConsole: vc
  });
  const w = dom.window;
  Object.defineProperty(w.navigator, "language", { value: browserLang, configurable: true });
  Object.defineProperty(w.navigator, "languages", { value: [browserLang], configurable: true });

  w.eval(I18N_SRC);
  scripts.forEach((s) => w.eval(fs.readFileSync(path.join(root, s), "utf8")));
  inline.forEach((code) => w.eval(code));
  return { w, warns, dom };
}

console.log("\n=== 1. store/index.html : langue du navigateur détectée SANS action ===");
async function main() {
{
  const { w, warns } = loadPage("store/index.html", {
    browserLang: "en-GB",
    scripts: ["store/apps.js"]
  });
  check("langue = en (navigateur en-GB, aucun clic)", w.I18N.getLocale() === "en", w.I18N.getLocale());
  check("attribut <html lang> = en-US", w.document.documentElement.lang === "en-US", w.document.documentElement.lang);
  check("classe i18n-pending retirée (page visible)", !w.document.documentElement.classList.contains("i18n-pending"));
  check("sous-titre traduit en anglais", w.document.querySelector(".header p").textContent === "Discover our apps",
    w.document.querySelector(".header p").textContent);
  check("placeholder de recherche traduit", w.document.getElementById("search").placeholder === "Search for an app…",
    w.document.getElementById("search").placeholder);
  check("2 cartes d'applications rendues", w.document.querySelectorAll("#apps .app").length === 2,
    String(w.document.querySelectorAll("#apps .app").length));
  check("carte 1 = Night Rush", w.document.querySelector("#apps .app h2").textContent === "Night Rush");
  check("bouton traduit = View", w.document.querySelector("#apps .app .button").textContent === "View",
    w.document.querySelector("#apps .app .button").textContent);
  check("sélecteur de langue présent (2 langues)", w.document.querySelectorAll("#lang-switcher option").length === 2);
  check("sélecteur sur 'en'", w.document.querySelector("#lang-switcher select").value === "en");
  check("aucune clé i18n manquante", warns.filter((m) => m.indexOf("manquante") !== -1).length === 0,
    warns.join(" | ") || "0 avertissement");

  console.log("\n=== 2. store/index.html : bascule vers le français ===");
  w.I18N.setLocale("fr");
  check("langue = fr", w.I18N.getLocale() === "fr");
  check("sous-titre traduit en français", w.document.querySelector(".header p").textContent === "Découvrez nos applications",
    w.document.querySelector(".header p").textContent);
  check("bouton traduit = Voir", w.document.querySelector("#apps .app .button").textContent === "Voir",
    w.document.querySelector("#apps .app .button").textContent);
  check("recherche VIDE affiche les 2 apps", w.document.querySelectorAll("#apps .app").length === 2);
  check("choix mémorisé dans localStorage", w.localStorage.getItem("celtmen-lang") === "fr",
    String(w.localStorage.getItem("celtmen-lang")));

  console.log("\n=== 3. store/index.html : recherche en français ===");
  w.document.getElementById("search").value = "havok";
  w.document.getElementById("search").dispatchEvent(new w.Event("input"));
  await new Promise((resolve) => {
    w.requestAnimationFrame(() => {
      w.requestAnimationFrame(() => {
        check("recherche 'havok' → 1 seul résultat", w.document.querySelectorAll("#apps .app").length === 1,
          String(w.document.querySelectorAll("#apps .app").length));
        check("résultat = HavoK App", w.document.querySelector("#apps .app h2").textContent === "HavoK App",
          w.document.querySelector("#apps .app h2").textContent);

        w.document.getElementById("search").value = "zzz";
        w.document.getElementById("search").dispatchEvent(new w.Event("input"));
        w.requestAnimationFrame(() => {
          w.requestAnimationFrame(() => {
            check("recherche sans résultat → message traduit",
              w.document.querySelector("#apps .empty").textContent === "Aucune application trouvée.",
              w.document.querySelector("#apps .empty").textContent);
            resolve();
          });
        });
      });
    });
  });
}


}


async function rest() {

/* ================== 4. store/app.html : fiche détaillée ================== */

console.log("\n=== 4. store/app.html : fiche détaillée (id=night-rush) ===");
{
  const { w, warns } = loadPage("store/app.html", {
    browserLang: "en-US",
    query: "?id=night-rush",
    scripts: ["store/apps.js", "store/app.js"]
  });
  const d = w.document;
  check("classe i18n-pending retirée", !d.documentElement.classList.contains("i18n-pending"));
  check("titre de l'onglet traduit", d.title === "Night Rush - Celtmen Apps", d.title);
  check("nom de l'app affiché", d.querySelector(".hero h1").textContent === "Night Rush");
  check("sous-titre traduit en anglais", d.querySelector(".hero .tagline, .hero p").textContent === "An endless runner game",
    d.querySelector(".hero .tagline, .hero p").textContent);
  check("bouton 'Obtenir' traduit = Get", d.querySelector(".hero .button").textContent === "Get",
    d.querySelector(".hero .button").textContent);
  check("3 blocs d'infos (âge/taille/version)", d.querySelectorAll(".info-grid .info-box").length === 3,
    String(d.querySelectorAll(".info-grid .info-box").length));
  check("3 captures d'écran avec alt traduit", d.querySelectorAll(".screens img").length === 3 &&
    d.querySelector(".screens img").alt === "Night Rush gameplay screenshot",
    d.querySelector(".screens img").alt);
  check("section description présente", d.querySelectorAll(".section h2").length >= 2,
    Array.from(d.querySelectorAll(".section h2")).map((h) => h.textContent).join(" / "));
  check("lien retour vers le store", d.querySelector(".back-link").getAttribute("href") === "index.html");
  check("aucune clé i18n manquante", warns.filter((m) => m.indexOf("manquante") !== -1).length === 0,
    warns.join(" | ") || "0 avertissement");

  console.log("--- bascule en français sur la fiche détaillée ---");
  w.I18N.setLocale("fr");
  check("sous-titre traduit en français", d.querySelector(".hero .tagline, .hero p").textContent === "Un jeu d'endless runner",
    d.querySelector(".hero .tagline, .hero p").textContent);
  check("bouton = Obtenir", d.querySelector(".hero .button").textContent === "Obtenir",
    d.querySelector(".hero .button").textContent);
  check("alt capture traduit", d.querySelector(".screens img").alt === "Capture d'écran du gameplay de Night Rush",
    d.querySelector(".screens img").alt);
  check("titre de l'onglet en français", d.title === "Night Rush - Celtmen Apps", d.title);
}

console.log("\n=== 5. store/app.html : application inconnue ===");
{
  const { w } = loadPage("store/app.html", {
    browserLang: "fr-FR",
    query: "?id=nexistepas",
    scripts: ["store/apps.js", "store/app.js"]
  });
  const d = w.document;
  check("message 'introuvable' affiché", d.querySelector(".section h1").textContent === "Application introuvable",
    d.querySelector(".section h1").textContent);
  check("titre de l'onglet adapté", d.title.indexOf("introuvable") !== -1, d.title);
  check("retour au store proposé", !!d.querySelector(".back-link"));
}

/* ===== 6. Vérification exhaustive : chaque data-i18n de chaque page ===== */

function lookup(dict, key) {
  var node = dict;
  var parts = String(key).split(".");
  for (var i = 0; i < parts.length && node != null; i++) { node = node[parts[i]]; }
  return node;
}

const ATTRS = [
  ["data-i18n", "textContent"],
  ["data-i18n-html", "innerHTML"],
  ["data-i18n-placeholder", "placeholder"],
  ["data-i18n-alt", "alt"],
  ["data-i18n-label", "aria-label"],
  ["data-i18n-title", "title"],
  ["data-i18n-content", "content"]
];

/* innerHTML/textContent sont des propriétés, les autres sont des attributs */
const PROPS = { textContent: 1, innerHTML: 1 };

function readValue(el, prop) {
  return PROPS[prop] ? String(el[prop]) : String(el.getAttribute(prop));
}

const STATIC_PAGES = [
  "index.html",
  "store/index.html",
  "store/night-rush.html",
  "store/havok-app.html",
  "store/privacy.html",
  "NightRush/index.html",
  "NightRush/privacy.html"
];

console.log("\n=== 6. Traduction exhaustive des 7 pages statiques (anglais puis français) ===");

STATIC_PAGES.forEach((page) => {
  const scripts = page === "store/index.html" ? ["store/apps.js"] : [];
  const { w, warns } = loadPage(page, { browserLang: "en-US", scripts });
  const d = w.document;

  let nodes = 0, mismatches = [];
  ["en", "fr"].forEach((locale) => {
    w.I18N.setLocale(locale);
    const dict = w.I18N.translations[locale];
    ATTRS.forEach(([attr, prop]) => {
      Array.from(d.querySelectorAll("[" + attr + "]")).forEach((el) => {
        const key = el.getAttribute(attr);
        const expected = lookup(dict, key);
        if (typeof expected !== "string") { return; }
        const actual = readValue(el, prop);
        /* innerHTML/textContent : on tolère les espaces de mise en forme */
        const ok = attr === "data-i18n-html" || attr === "data-i18n"
          ? actual.replace(/\s+/g, " ").trim() === expected.replace(/\s+/g, " ").trim()
          : actual === expected;
        if (!ok) { mismatches.push(locale + " " + attr + "=" + key + " → « " + actual.trim().slice(0, 40) + " »"); }
        if (locale === "en") { nodes++; }
      });
    });
  });

  const missing = warns.filter((m) => m.indexOf("manquante") !== -1);
  console.log("  " + page + " : " + nodes + " noeuds traduits dans les 2 langues");
  check(page + " → toutes les traductions exactes en fr ET en",
    mismatches.length === 0, mismatches.slice(0, 3).join(" ; ") || "0 écart");
  check(page + " → aucune clé manquante", missing.length === 0, missing.join(" | ") || "aucun");
  check(page + " → <html lang> suit la langue", d.documentElement.lang === "fr-FR", d.documentElement.lang);
  check(page + " → classe i18n-pending retirée", !d.documentElement.classList.contains("i18n-pending"));
});
/* ===== 7. Textes clés des pages statiques ===== */

console.log("\n=== 7. Textes clés (détection auto de la langue du navigateur) ===");
{
  const en = loadPage("NightRush/index.html", { browserLang: "en-US" });
  check("NightRush/index.html → titre en anglais",
    en.w.document.querySelector("h1").textContent === "Download Night Rush",
    en.w.document.querySelector("h1").textContent);
  check("NightRush/index.html → 4 plateformes proposées",
    en.w.document.querySelectorAll(".platforms button").length === 4,
    String(en.w.document.querySelectorAll(".platforms button").length));
  check("NightRush/index.html → langue = en sans aucune action", en.w.I18N.getLocale() === "en");

  const fr = loadPage("NightRush/index.html", { browserLang: "fr-FR" });
  check("NightRush/index.html → titre en français (navigateur fr)",
    fr.w.document.querySelector("h1").textContent === "Téléchargement Night Rush",
    fr.w.document.querySelector("h1").textContent);
  check("NightRush/index.html → langue = fr sans aucune action", fr.w.I18N.getLocale() === "fr");
}
{
  const p = loadPage("NightRush/privacy.html", { browserLang: "en-US" });
  check("NightRush/privacy.html → titre en anglais",
    p.w.document.querySelector("h1").textContent === "Privacy Policy — Night Rush",
    p.w.document.querySelector("h1").textContent);
  check("NightRush/privacy.html → 11 sections",
    p.w.document.querySelectorAll("h2").length === 11,
    String(p.w.document.querySelectorAll("h2").length));

  const st = loadPage("store/privacy.html", { browserLang: "en-US" });
  check("store/privacy.html → titre en anglais",
    st.w.document.querySelector("h1").textContent === "Privacy Policy",
    st.w.document.querySelector("h1").textContent);
  check("store/privacy.html → liens mailto injectés par les traductions",
    st.w.document.querySelectorAll('a[href^="mailto:"]').length >= 3,
    String(st.w.document.querySelectorAll('a[href^="mailto:"]').length));

  const home = loadPage("index.html", { browserLang: "en-US" });
  check("index.html (racine) → bouton en anglais",
    home.w.document.querySelector(".button").textContent === "Open the Store",
    home.w.document.querySelector(".button").textContent);
  check("index.html (racine) → lien vers store/ intact",
    home.w.document.querySelector(".button").getAttribute("href") === "store/");
}

/* ===== 8. Clic de téléchargement (délégation d'événement) ===== */

console.log("\n=== 8. Clic sur un bouton de plateforme ===");
{
  const { w, warns } = loadPage("NightRush/index.html", { browserLang: "fr-FR" });
  const before = warns.length;
  w.document.querySelector(".platforms button").dispatchEvent(
    new w.MouseEvent("click", { bubbles: true })
  );
  const navigated = warns.slice(before).some((m) => m.indexOf("navigation") !== -1);
  check("le clic déclenche bien une navigation (APK Android)", navigated,
    warns.slice(before).join(" | ") || "aucune navigation détectée");
  check("l'URL ciblée vient de data-url",
    w.document.querySelector(".platforms button").getAttribute("data-url").indexOf("android") !== -1,
    w.document.querySelector(".platforms button").getAttribute("data-url").slice(0, 60));
}

/* ===== 9. Sélecteur de langue (changement manuel) ===== */

console.log("\n=== 9. Sélecteur de langue (changement manuel) ===");
{
  const { w } = loadPage("store/index.html", { browserLang: "en-US", scripts: ["store/apps.js"] });
  const select = w.document.querySelector("#lang-switcher select");
  check("le sélecteur est bien un <select>", !!select && select.tagName === "SELECT");
  check("il propose Français et English",
    Array.from(select.options).map((o) => o.textContent).join(",") === "Français,English",
    Array.from(select.options).map((o) => o.textContent).join(","));
  select.value = "fr";
  select.dispatchEvent(new w.Event("change"));
  check("changer le sélecteur traduit la page en français",
    w.document.querySelector(".header p").textContent === "Découvrez nos applications",
    w.document.querySelector(".header p").textContent);
  check("la carte de l'app est retraduite", w.document.querySelector("#apps .app .button").textContent === "Voir",
    w.document.querySelector("#apps .app .button").textContent);

  /* Le style du sélecteur est injecté par i18n.js : on vérifie que le CSS est
     bien compris (jsdom ignore les règles invalides, donc un compte exact
     prouve que les 5 règles sont valides). */
  const style = w.document.getElementById("celtmen-lang-css");
  check("le style du sélecteur est injecté par i18n.js", !!style);
  const rules = Array.from(style.sheet.cssRules).map((r) => r.selectorText);
  check("les 6 règles CSS sont valides et conservées", rules.length === 6, rules.join(" | "));
  check("la règle .lang-switcher est bien analysée", rules.indexOf(".lang-switcher") !== -1);
  check("la flèche SVG est conservée dans background-image",
    /url\("data:image\/svg\+xml/.test(style.sheet.cssRules[1].style.backgroundImage),
    String(style.sheet.cssRules[1].style.backgroundImage).slice(0, 48));
}
/* ============== TESTS_6_A_9 ============== */

}


function summary() {
  console.log("\n" + "=".repeat(60));
  console.log((fail === 0 ? "✅ " : "❌ ") + pass + " test(s) réussi(s), " + fail + " échec(s)");
  process.exit(fail === 0 ? 0 : 1);
}

main().then(rest).then(summary);