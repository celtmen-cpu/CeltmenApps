# Outils

## `optimize-images.sh`

Génère `assets/optimized` à partir des originaux de `assets/source`, en deux
formats par image :

- `.webp` — servi aux navigateurs récents (le plus léger)
- `.png` / `.jpg` — repli universel, utilisé par `<picture>`

```bash
bash tools/optimize-images.sh     # nécessite ImageMagick (magick)
```

Tailles générées : icônes 384 px (affichées jusqu'à 160 px), captures 1000 px sur
le plus grand côté, bannière 1200 px, favicon 192 px, icône de source 512 px.
Les métadonnées EXIF sont supprimées (`-strip`) : les images ne sont pas
réduites et l'orientation est déjà « normale » dans les originaux.

Résultat : 14 Mo → 784 Ko. Après avoir ajouté une image dans `assets/source`,
ajoutez-la à la liste correspondante du script puis relancez-le.

## `tests/`

### `check-i18n.js` — aucune dépendance

```bash
node tools/tests/check-i18n.js
```

Vérifie :

1. la parité stricte des dictionnaires `fr` / `en` (aucune clé manquante, aucune valeur vide) ;
2. toutes les clés `data-i18n*` des 8 pages HTML ;
3. toutes les clés utilisées en JavaScript (`I18N.t("…")`) ;
4. toutes les clés dynamiques `apps.<id>.<champ>` ;
5. tous les liens et ressources internes (y compris `assets/optimized`) ;
6. toutes les URL de `source.json`, qui doit toujours pointer vers des fichiers existants.

Il échoue (code 1) dès qu'une seule chose est introuvable.

### `i18n.dom.test.js` — jsdom

```bash
cd tools/tests && npm install && npm test
```

Charge chaque page dans un vrai DOM (jsdom), avec un navigateur simulé en
français ou en anglais, et vérifie :

- la détection automatique de la langue **sans aucune action de l'utilisateur** ;
- le rendu réel du catalogue, de la recherche et de la fiche détaillée ;
- que **chaque** `data-i18n*` de **chaque** page correspond exactement au
  dictionnaire, dans les deux langues ;
- le changement de langue manuel (sélecteur) et sa mémorisation ;
- l'absence de clé manquante (aucun avertissement `[i18n]` dans la console) ;
- le clic de téléchargement des plateformes.

85 tests au total.