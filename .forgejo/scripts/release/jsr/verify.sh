#!/bin/sh
set -eu
registry="$1"
name="$2"
version="$3"
if [ "$registry" = "jsr" ]; then
  probe="https://jsr.io/$name/meta.json"
  extra="https://jsr.io/$name/${version}_meta.json"
else
  probe="https://registry.npmjs.org/$(printf '%s' "$name" | sed 's|/|%2f|')"
  extra="$probe"
fi
tries=10
while :; do
  if curl -fsSL -H "Cache-Control: no-cache" "$probe" | grep -qF "\"$version\"" &&
    curl -fsSL -o /dev/null -H "Cache-Control: no-cache" "$extra"; then
    echo "$registry verify: $name@$version live"
    exit 0
  fi
  tries=$((tries - 1))
  if [ "$tries" -le 0 ]; then
    echo "$registry verify: $name@$version not visible after retries" >&2
    exit 1
  fi
  echo "$registry verify: waiting for $name@$version"
  sleep 6
done
