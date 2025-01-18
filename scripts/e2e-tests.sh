#!/bin/bash

exclude_dirs="examples/vanilla"

for dir in examples/*; do
  if [ -d "$dir" ] && ! [[ $exclude_dirs =~ $dir ]]; then
    echo "Running e2e tests in $dir"
    (SERVER_DIR="$dir" npm run test)
  fi
done
