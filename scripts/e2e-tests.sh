#!/bin/bash

# array of directories to exclude
exclude_dirs=("examples/webpack" "examples/blazor" "examples/gatsbyjs" "examples/laravel" "examples/salesforce" "examples/wasm-benchmark" "examples/electron-nodeintegration" "examples/electron" "examples/asp-net")

# Test examples/
for dir in examples/*; do
  if [ -d "$dir" ]; then
    skip=false
    for exclude in "${exclude_dirs[@]}"; do
      if [[ "$dir" == "$exclude" ]]; then
        skip=true
        break
      fi
    done
    if [ "$skip" = false ]; then
      echo "Running e2e tests in $dir"
      (SERVER_DIR="$dir" npm run test)
    fi
  fi
done

# Test frameworks/*/*
for dir in frameworks/*/*; do
  if [ -d "$dir" ]; then
    echo "Running e2e tests in $dir"
    (SERVER_DIR="$dir" npm run test)
  fi
done
