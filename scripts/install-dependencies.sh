#!/bin/bash
# Runs npm/pnpm install on all examples

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

for dir in examples/*; do
  if [ -d "$dir" ]; then
    pushd "${SCRIPT_DIR}/../${dir}/" > /dev/null

    if [ -f "package.json" ]; then
      echo "Installing dependencies in $dir"

      if [ -f "pnpm-lock.yaml" ]; then
        pnpm install
      else
        npm install
      fi
    fi

    popd > /dev/null

  fi
done
