#!/bin/sh
set -eu
name="$1"
version="$2"
slug="$3"
dir=$(mktemp -d)
trap 'rm -rf "$dir"' EXIT
PACKAGE="jsr:$name@$version" DENO_DIR="$dir/deno" JSR_URL="https://jsr.io" \
  deno run --no-lock --minimum-dependency-age=0 --allow-env --allow-read \
  ".forgejo/scripts/release/jsr/probes/$slug.ts"
