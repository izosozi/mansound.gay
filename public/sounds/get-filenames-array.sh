#!/bin/sh

files=()
for file in *; do
  files+=("'$file',")
done

echo "[${files[*]}]"

