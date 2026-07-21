#!/bin/sh
set -eu
registry="$1"
name="$2"
version="$3"
slug="$4"
dir=$(mktemp -d)
trap 'rm -rf "$dir"' EXIT
if [ "$registry" = "jsr" ]; then
  PACKAGE="jsr:$name@$version" DENO_DIR="$dir/deno" JSR_URL="https://jsr.io" \
    deno run --no-lock --minimum-dependency-age=0 --allow-env --allow-read \
    ".forgejo/scripts/release/jsr/probes/$slug.ts"
  exit 0
fi
probe="$PWD/.forgejo/scripts/release/jsr/probes/$slug.mjs"
cd "$dir"
npm init -y >/dev/null 2>&1
npm install --no-audit --no-fund --silent "$name@$version" react@19 >/dev/null
PACKAGE="$name" node "$probe"
