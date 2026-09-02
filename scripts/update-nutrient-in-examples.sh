#!/bin/bash
set -euo pipefail

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
# shellcheck source=./pnpm-helpers.sh
source "${SCRIPT_DIR}/pnpm-helpers.sh"

VERSION="${1:-}"

if [ -z "${VERSION}" ]; then
  echo "Usage: $0 <version>" >&2
  exit 1
fi

if ! [[ "${VERSION}" =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
  echo "Expected a semver version, got \"${VERSION}\"." >&2
  exit 1
fi

Green='\033[0;32m'
Yellow='\033[0;33m'
NoColor='\033[0m'

upgrade_npm_in_example() {
  local directory=$1

  pushd "${SCRIPT_DIR}/../examples/${directory}/"  > /dev/null

  echo -e "\n${Green}Upgrading ${Yellow}${directory}${Green} to ${Yellow}${VERSION}${NoColor}"

  if [ -f "pnpm-lock.yaml" ]; then
    require_local_pnpm_workspace "examples/${directory}"
    pnpm install "@nutrient-sdk/viewer@${VERSION}" --save --save-exact

    run_pnpm_audit_fix > /dev/null

    # pnpm 11 treats an unapproved dependency build as an error. Keep this
    # fail-fast so the automated bump never continues with only some examples
    # updated; stderr remains visible in the workflow log.
    run_pnpm_install_quietly --no-frozen-lockfile
  elif [ -f "package-lock.json" ]; then
    npm install "@nutrient-sdk/viewer@${VERSION}" --save --save-exact

    npm install > /dev/null

    npm audit fix > /dev/null || true
  else
    echo "examples/${directory} has no lockfile, so nothing would be installed." >&2
    exit 1
  fi

  popd > /dev/null

  node "${SCRIPT_DIR}/update-nutrient-in-cdn.js" "${directory}" "${VERSION}"
}

upgrade_npm_in_example "webpack"
upgrade_npm_in_example "react"
upgrade_npm_in_example "vue"
upgrade_npm_in_example "vue-composition-api"
upgrade_npm_in_example "pwa"
upgrade_npm_in_example "electron"
upgrade_npm_in_example "typescript"
upgrade_npm_in_example "elm"
upgrade_npm_in_example "nextjs"
upgrade_npm_in_example "gatsbyjs"
upgrade_npm_in_example "svelte"
upgrade_npm_in_example "svelte-kit"
upgrade_npm_in_example "angular"
upgrade_npm_in_example "electron-nodeintegration"
upgrade_npm_in_example "nuxtjs"
upgrade_npm_in_example "laravel"
upgrade_npm_in_example "vite"
upgrade_npm_in_example "salesforce"
upgrade_npm_in_example "javascript-vite"
upgrade_npm_in_example "typescript-vite"