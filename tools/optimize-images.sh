#!/bin/bash
# Génère les versions optimisées des images (assets/optimized) à partir des
# originaux de assets/source. Deux formats par image :
#   - .webp : servi aux navigateurs modernes (le plus léger)
#   - .png/.jpg : repli universel (via <picture>)
# Usage : bash tools/optimize-images.sh   (depuis la racine du dépôt)
set -euo pipefail

cd "$(dirname "$0")/.."
SRC="assets/source"
OUT="assets/optimized"

command -v magick >/dev/null || { echo "ImageMagick (magick) est requis"; exit 1; }

rm -rf "$OUT"
mkdir -p "$OUT/NightRush" "$OUT/HavoKapp"

# --- Icônes / logos : 384 px (affichés jusqu'à 160 px, soit 2,4x pour le retina)
icons=(
  "NightRush/logoNightRush:$SRC/Night Rush/logoNightRush.PNG"
  "HavoKapp/Icon-havok-default:$SRC/HavoKapp/Icon-havok-default.png"
)
for entry in "${icons[@]}"; do
  name="${entry%%:*}"; file="${entry#*:}"
  magick "$file" -auto-orient -resize 384x384 -strip -quality 88 "$OUT/$name.webp"
  magick "$file" -auto-orient -resize 384x384 -strip -colors 256 "PNG8:$OUT/$name.png"
done

# --- Captures d'écran : 1000 px sur le plus grand côté, JPEG progressif en repli
shots=(
  "NightRush/ScreenShotGamePlay:$SRC/Night Rush/ScreenShotGamePlay.jpeg:1000x"
  "NightRush/ScreenShotSalon:$SRC/Night Rush/ScreenShotSalon.png:1000x"
  "NightRush/ScreenShotClassement:$SRC/Night Rush/ScreenShotClassement.png:1000x"
  "HavoKapp/IMG_1087:$SRC/HavoKapp/IMG_1087.jpeg:x1000"
  "HavoKapp/IMG_1088:$SRC/HavoKapp/IMG_1088.jpeg:x1000"
  "HavoKapp/IMG_1089:$SRC/HavoKapp/IMG_1089.jpeg:x1000"
  "HavoKapp/IMG_1090:$SRC/HavoKapp/IMG_1090.jpeg:x1000"
)
for entry in "${shots[@]}"; do
  name="${entry%%:*}"; rest="${entry#*:}"; file="${rest%%:*}"; size="${rest##*:}"
  magick "$file" -auto-orient -resize "$size" -strip -quality 80 "$OUT/$name.webp"
  magick "$file" -auto-orient -resize "$size" -strip -quality 78 -interlace Plane "$OUT/$name.jpg"
done

# --- Bannière (og:image) : 1200 px de large
magick "$SRC/Night Rush/banniereNighRush.PNG" -auto-orient -resize 1200x \
  -strip -quality 80 "$OUT/NightRush/banniereNighRush.jpg"

# --- Favicon (192 px, depuis le logo de marque Celtmen) ---
magick "$SRC/logoCeltmen.PNG" -auto-orient -resize 192x192 -strip -colors 256 \
  "PNG8:$OUT/favicon.png"

# --- Icône de marque (512 px) — apple-touch-icon + AltStore iconURL ---
magick "$SRC/logoCeltmen.PNG" -auto-orient -resize 512x512 -strip -define png:exclude-chunk=all \
  -colors 128 "$OUT/logoCeltmen.png"

# --- Bannière de la source (header.jpg pour source.json) ---
magick "$SRC/header.jpg" -auto-orient -resize 1200x -strip -quality 80 -interlace Plane \
  "$OUT/header.jpg"

find "$OUT" -type f | sort | while read -r f; do
  printf '  %-52s %6s  %s\n' "$f" "$(du -h "$f" | cut -f1)" "$(magick identify -format '%wx%h' "$f")"
done
printf 'Total : %s (originaux : %s)\n' "$(du -sh "$OUT" | cut -f1)" "$(du -sh "$SRC" | cut -f1)"