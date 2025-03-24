#!/bin/bash
# Runs npm/pnpm install on all examples

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

for dir in examples/*; do
  if [ -d "$dir" ]; then
    echo "Installing dependencies in $dir"

    pushd "${SCRIPT_DIR}/../${dir}/" > /dev/null

    if [ -f "pnpm-lock.yaml" ]; then
      pnpm install
    elif [ -f "package-lock.json" ]; then
      npm install
    fi

    popd > /dev/null

  fi
done
