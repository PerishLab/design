#!/bin/sh
set -eu
name="$1"
version="$2"
symbols="$3"
dir=$(mktemp -d)
trap 'rm -rf "$dir"' EXIT
DENO_DIR="$dir/deno" JSR_URL="https://jsr.io" deno eval --no-lock --minimum-dependency-age=0 \
  "const held = await import('jsr:$name@$version');
   for (const symbol of '$symbols'.split(',')) {
     if (typeof held[symbol] !== 'function') {
       throw new Error('mod surface missing ' + symbol);
     }
   }
   console.log('jsr smoke: $name@$version import ok');"
