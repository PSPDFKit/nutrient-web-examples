#!/bin/bash
# Runs npm/pnpm install on all examples and frameworks

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Install dependencies in examples/
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

# Install dependencies in frameworks/*/*
for dir in frameworks/*/*; do
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
