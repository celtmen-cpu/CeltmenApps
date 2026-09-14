/*!
 * Vérifications statiques des traductions et des ressources.
 * ---------------------------------------------------------------------------
 * Aucune dépendance : node tools/tests/check-i18n.js
 *
 *  1. parité stricte des dictionnaires fr / en
 *  2. toutes les clés du HTML (data-i18n*) existent
 *  3. toutes les clés utilisées depuis le JS existent
 *  4. tous les champs dynamiques apps.<id>.* existent
 *  5. toutes les pages chargent i18n.js
 *  6. tous les liens/ressources internes existent sur le disque
 */
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..", "..");
const I18N = require(path.join(root, "i18n.js"));

const PAGES = [
  "index.html",
  "store/index.html",
  "store/app.html",
  "store/night-rush.html",
  "store/havok-app.html",
  "store/privacy.html",
  "NightRush/index.html",
  "NightRush/privacy.html"
];

const SCRIPTS = ["i18n.js", "store/apps.js", "store/app.js"];

const ATTRS = [
  "data-i18n",
  "data-i18n-html",
  "data-i18n-placeholder",
  "data-i18n-alt",
  "data-i18n-label",
  "data-i18n-title",
  "data-i18n-content"
];

let errors = 0;
function fail(message) {
  console.log("  ✗ " + message);
  errors++;
}

function flatten(node, prefix = "", out = {}) {
  Object.keys(node).forEach((key) => {
    const value = node[key];
    const full = prefix ? prefix + "." + key : key;
    if (value && typeof value === "object") { flatten(value, full, out); } else { out[full] = value; }
  });
  return out;
}

const fr = flatten(I18N.translations.fr);
const en = flatten(I18N.translations.en);

/* --- 1. Parité fr / en -------------------------------------------------- */

Object.keys(fr).forEach((key) => { if (!(key in en)) { fail("clé absente en anglais : " + key); } });
Object.keys(en).forEach((key) => { if (!(key in fr)) { fail("clé absente en français : " + key); } });
Object.keys(fr).forEach((key) => {
  if (typeof fr[key] !== "string" || !fr[key].trim()) { fail("valeur française vide : " + key); }
  if (typeof en[key] !== "string" || !en[key].trim()) { fail("valeur anglaise vide : " + key); }
});
console.log("Parité fr/en : " + Object.keys(fr).length + " clés dans chaque langue");

/* --- 2. Clés du HTML ---------------------------------------------------- */

const used = new Map();
PAGES.forEach((page) => {
  const file = path.join(root, page);
  if (!fs.existsSync(file)) { fail("page manquante : " + page); return; }
  const html = fs.readFileSync(file, "utf8");

  ATTRS.forEach((attr) => {
    const re = new RegExp(attr + '="([^"]+)"', "g");
    let match;
    while ((match = re.exec(html)) !== null) {
      const key = match[1];
      if (!(key in fr)) { fail(page + " → clé inconnue : " + key); }
      used.set(key, (used.get(key) || 0) + 1);
    }
  });

  if (!/i18n\.js/.test(html)) { fail(page + " ne charge pas i18n.js"); }
  if (!/class="i18n-pending"|i18n-pending/.test(html)) {
    console.log("  ! " + page + " n'utilise pas la classe i18n-pending (pas de flash de langue)");
  }
});
console.log("Clés utilisées dans les " + PAGES.length + " pages : " + used.size);

const unused = Object.keys(fr).filter((k) => !used.has(k) && !/^apps\.|^categories\.|^privacy\./.test(k));
/* --- 3. Clés utilisées depuis le JS ------------------------------------- */

SCRIPTS.forEach((script) => {
  /* Les commentaires contiennent des exemples : on les retire avant l'analyse */
  const src = fs.readFileSync(path.join(root, script), "utf8")
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/(^|[^:])\/\/.*$/gm, "$1");
  const re = /I18N\.t\(\s*"([^"]+)"/g;
  const seen = new Set();
  let match;
  while ((match = re.exec(src)) !== null) { seen.add(match[1]); }
  seen.forEach((key) => { if (!(key in fr)) { fail(script + " → clé inconnue : " + key); } });
  console.log(script + " : " + seen.size + " clés I18N.t() vérifiées");
});

/* --- 4. Clés dynamiques apps.<id>.<champ> ------------------------------- */

const REQUIRED = {
  "night-rush": ["name", "subtitle", "description", "size", "version", "age", "minIOS", "platforms",
    "screensAlt1", "screensAlt2", "screensAlt3", "f1Title", "f1Desc", "f2Title", "f2Desc", "f3Title",
    "f3Desc", "f4Title", "f4Desc", "privacyShort", "privacyLink"],
  "havok-app": ["name", "subtitle", "description", "size", "version", "age", "minIOS", "platforms",
    "screensAlt1", "screensAlt2", "screensAlt3", "screensAlt4", "f1Title", "f1Desc", "f2Title", "f2Desc",
    "privacyShort", "privacyLink"]
};
Object.keys(REQUIRED).forEach((id) => {
  REQUIRED[id].forEach((field) => {
    const key = "apps." + id + "." + field;
    if (!(key in fr)) { fail("clé dynamique manquante : " + key); }
    if (!(key in en)) { fail("clé dynamique manquante en anglais : " + key); }
  });
});
console.log("Clés apps.<id>.* vérifiées : " +
  Object.keys(REQUIRED).reduce((n, id) => n + REQUIRED[id].length, 0) + " champs");

/* --- 5. Liens et ressources internes ------------------------------------ */

const EXTERNAL = /^(https?:|mailto:|tel:|#|data:)/;
let checked = 0;

function assetExists(fromDir, url) {
  const clean = decodeURIComponent(url.split("#")[0].split("?")[0]);
  if (!clean) { return true; }
  const target = path.resolve(fromDir, clean);
  return fs.existsSync(target) ||
    fs.existsSync(target.replace(/\/$/, "") + ".html") ||
    fs.existsSync(path.join(target, "index.html"));
}

PAGES.forEach((page) => {
  const dir = path.dirname(path.join(root, page));
  const html = fs.readFileSync(path.join(root, page), "utf8");
  const re = /(?:href|src|srcset)="([^"]+)"/g;
  let match;
  while ((match = re.exec(html)) !== null) {
    const url = match[1];
    if (EXTERNAL.test(url)) { continue; }
    checked++;
    if (!assetExists(dir, url)) { fail(page + " → ressource manquante : " + url); }
  }
});

/* Ressources construites dans le JS (assets/optimized) */
SCRIPTS.forEach((script) => {
  const dir = path.join(root, path.dirname(script));
  const src = fs.readFileSync(path.join(root, script), "utf8");
  const re = /"(\.\.\/[^"]+\.(?:webp|png|jpe?g|css|js))"/g;
  let match;
  while ((match = re.exec(src)) !== null) {
    checked++;
    if (!assetExists(dir, match[1])) { fail(script + " → ressource manquante : " + match[1]); }
  }
});

console.log("Ressources internes vérifiées : " + checked);

/* --- 6. URLs du flux source.json ---------------------------------------- */

const FEED_PREFIX = "https://celtmen-apps.pages.dev/";
const feed = JSON.parse(fs.readFileSync(path.join(root, "source.json"), "utf8"));
const feedUrls = JSON.stringify(feed).match(new RegExp(FEED_PREFIX.replace(/\./g, "\\.") + "[^\"]+", "g")) || [];
const uniqueUrls = [...new Set(feedUrls)];
uniqueUrls.forEach((url) => {
  const relative = decodeURIComponent(url.slice(FEED_PREFIX.length));
  if (!fs.existsSync(path.join(root, relative))) { fail("source.json → ressource manquante : " + relative); }
});
console.log("URLs du flux source.json vérifiées : " + uniqueUrls.length);

/* --- Résultat ----------------------------------------------------------- */

console.log(errors === 0 ? "\n✅ TRADUCTIONS ET RESSOURCES OK" : "\n❌ " + errors + " erreur(s)");
process.exit(errors === 0 ? 0 : 1);
console.log("Clés définies mais inutilisées (info) : " + (unused.length ? unused.join(", ") : "aucune"));