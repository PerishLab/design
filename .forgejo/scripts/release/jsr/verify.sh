#!/bin/sh
set -eu
name="$1"
version="$2"
package="https://jsr.io/$name"
tries=10
while :; do
  if curl -fsSL -H "Cache-Control: no-cache" "$package/meta.json" | grep -qF "\"$version\":" &&
    curl -fsSL -o /dev/null -H "Cache-Control: no-cache" "$package/${version}_meta.json"; then
    echo "jsr verify: $name@$version live"
    exit 0
  fi
  tries=$((tries - 1))
  if [ "$tries" -le 0 ]; then
    echo "jsr verify: $name@$version not visible after retries" >&2
    exit 1
  fi
  echo "jsr verify: waiting for $name@$version"
  sleep 6
done
