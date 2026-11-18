#!/usr/bin/env bash
# Builds the static site and publishes out/ to the gh-pages branch, which
# GitHub Pages serves at https://dmitrykandratsenka.github.io.
#   bash scripts/deploy-pages.sh
set -euo pipefail
cd "$(dirname "$0")/.."
REMOTE="${PAGES_REMOTE:-https://github.com/DmitryKandratsenka/DmitryKandratsenka.github.io.git}"
NEXT_PUBLIC_SITE_URL=https://dmitrykandratsenka.github.io npm run build
touch out/.nojekyll
SHA=$(git rev-parse --short HEAD)
TMP=$(mktemp -d)
cp -R out/. "$TMP"
cd "$TMP"
git init -q -b gh-pages
git add -A
git -c user.name="$(git -C "$OLDPWD" config user.name)" -c user.email="$(git -C "$OLDPWD" config user.email)" \
  commit -q -m "Deploy $SHA"
git push -q -f "$REMOTE" gh-pages
cd - >/dev/null
rm -rf "$TMP"
echo "Published $SHA to gh-pages"
