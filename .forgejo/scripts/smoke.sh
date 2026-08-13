#!/bin/sh
set -eu

registry=https://git.perish.top/api/packages/PerishLab/npm/
root=$(pwd)
kind=$1
package=$2
version=$3
slug=$4
test "$kind" = npm
test "$slug" = design

seat=$(mktemp -d)
trap 'rm -rf "$seat"' EXIT HUP INT TERM
cp -R "$root/.forgejo/resources/smoke/." "$seat"
npm install --prefix "$seat" --ignore-scripts \
  --registry https://registry.npmjs.org/ --@perish:registry "$registry" \
  "svelte@^5.56.9" "sass@^1.101.0" "vite@^8.1.4" \
  "@sveltejs/vite-plugin-svelte@^7.3.0" \
  "$package@$version"
(
  cd "$seat"
  node smoke.js
)
printf '%s\n' "smoked $package@$version from Forgejo npm"
