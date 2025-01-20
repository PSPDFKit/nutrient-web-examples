#!/bin/bash

# array of directories to exclude
exclude_dirs=("examples/vanilla" "examples/webpack", "examples/blazor", "examples/gatsbyjs")

for dir in examples/*; do
  if [ -d "$dir" ] && [[ ! " ${exclude_dirs[@]} " =~ " ${dir} " ]]; then
    echo "Running e2e tests in $dir"
    (SERVER_DIR="$dir" npm run test)
  fi
done
