#!/bin/bash

# array of directories to exclude
exclude_dirs=("examples/webpack" "examples/blazor" "examples/gatsbyjs" "examples/laravel" "examples/salesforce" "examples/wasm-benchmark" "examples/electron-nodeintegration" "examples/electron" "examples/asp-net" "examples/svelte-kit" "examples/vue-composition-api" "examples/svelte" "examples/react")1b6ac637005424345fb861bf7e2d6d69e

failed=()

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
      if ! (SERVER_DIR="$dir" npm run test); then
        failed+=("$dir")
      fi
    fi
  fi
done

if [ ${#failed[@]} -ne 0 ]; then
  echo ""
  echo "❌ ${#failed[@]} example(s) failed:"
  for dir in "${failed[@]}"; do
    echo "  - $dir"
  done
  exit 1
fi

echo ""
echo "✅ All examples passed."
