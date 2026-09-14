# CeltmenStore

Site statique (GitHub Pages) : store d'applications, pages de téléchargement et
politiques de confidentialité. Aucune dépendance à l'exécution, aucun build.

## Structure

```
index.html              page d'accueil (redirige vers le store)
source.json             flux AltStore / SideStore
i18n.js                 moteur de traduction + dictionnaires fr / en
store/
  index.html            catalogue + recherche
  apps.js               données des applications + rendu des cartes
  app.html              fiche détaillée dynamique (app.html?id=night-rush)
  app.js                rendu de la fiche détaillée
  night-rush.html       page dédiée Night Rush
  havok-app.html        page dédiée HavoK App
  privacy.html          politique de confidentialité du store
  style.css, app-page.css
NightRush/              site de téléchargement du jeu + sa politique
assets/
  source/               images originales (jamais servies directement)
  optimized/            images optimisées, générées par tools/optimize-images.sh
tools/                  scripts d'optimisation et tests
```

## Langues (français / anglais)

La langue est détectée **automatiquement au chargement de la page**, sans aucune
action de l'utilisateur, dans cet ordre de priorité :

1. `?lang=en` dans l'URL
2. le choix mémorisé dans `localStorage` (uniquement après un choix manuel)
3. la langue du navigateur (`navigator.language`)
4. le français par défaut

Le sélecteur de langue en haut à droite permet de changer manuellement ; le choix
est alors mémorisé et appliqué à toutes les pages.

Pour traduire un texte dans le HTML, il suffit de le marquer :

```html
<h1 data-i18n="ui.about">À propos</h1>
<meta name="description" data-i18n-content="meta.storeDesc" content="…">
<input data-i18n-placeholder="ui.searchPlaceholder" placeholder="Rechercher…">
```

Attributs gérés : `data-i18n` (texte), `data-i18n-html` (texte avec balises),
`data-i18n-placeholder`, `data-i18n-alt`, `data-i18n-label`, `data-i18n-title`,
`data-i18n-content`. Tous les dictionnaires sont dans `i18n.js`.

## Images

Les originaux (`assets/source`, 14 Mo) ne sont jamais servis : les pages
utilisent `assets/optimized` (784 Ko, soit ~18× moins) en WebP avec repli
PNG/JPEG via `<picture>`. Régénérer après avoir ajouté une image :

```bash
bash tools/optimize-images.sh        # nécessite ImageMagick
```

## Tests

```bash
node tools/tests/check-i18n.js       # clés, parité fr/en, liens, ressources (sans dépendance)
cd tools/tests && npm install        # installe jsdom (uniquement pour les tests)
npm test                             # vérifie le rendu réel des 8 pages + la détection
```

Voir `tools/README.md` pour le détail.