#!/bin/bash
# Runs npm/pnpm install on all examples
set -euo pipefail

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
# shellcheck source=./pnpm-helpers.sh
source "${SCRIPT_DIR}/pnpm-helpers.sh"

for dir in examples/*; do
  if [ -d "$dir" ]; then
    echo "Installing dependencies in $dir"

    pushd "${SCRIPT_DIR}/../${dir}/" > /dev/null

    if [ -f "pnpm-lock.yaml" ]; then
      require_local_pnpm_workspace "$dir"
      pnpm install "${PNPM_INSTALL_FLAGS[@]}"
    elif [ -f "package-lock.json" ]; then
      npm install
    fi

    popd > /dev/null

  fi
done
