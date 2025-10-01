#!/bin/bash
set -euo pipefail

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

Green='\033[0;32m'
Yellow='\033[0;33m'
NoColor='\033[0m'

upgrade_npm_in_example() {
  local directory=$1

  pushd "${SCRIPT_DIR}/../examples/${directory}/"  > /dev/null

  echo -e "\n${Green}Upgrading npm in ${Yellow}${directory}${Green} example${NoColor}"

  npm install @nutrient-sdk/viewer@latest --save --save-exact

  npm install

  npm audit fix --package-lock-only --audit-level=none

  popd > /dev/null
}

upgrade_npm_in_framework() {
  local framework=$1
  local variant=$2

  pushd "${SCRIPT_DIR}/../frameworks/${framework}/${variant}/"  > /dev/null

  echo -e "\n${Green}Upgrading npm in ${Yellow}frameworks/${framework}/${variant}${Green}${NoColor}"

  # Note: Frameworks use CDN installation, so no package update needed
  # Just run npm install and audit fix
  npm install

  npm audit fix --package-lock-only --audit-level=none

  popd > /dev/null
}

upgrade_version_in_gatsbyjs() {
  node ./scripts/update-version-in-gatsby.js
}

upgrade_version_in_salesforce() {
  node ./scripts/update-version-in-salesforce.js
}

# Update examples/ directory (package-based installations)
upgrade_npm_in_example "webpack"
upgrade_npm_in_example "pwa"
upgrade_npm_in_example "electron"
upgrade_npm_in_example "typescript"
upgrade_npm_in_example "elm"
upgrade_npm_in_example "gatsbyjs"
upgrade_npm_in_example "electron-nodeintegration"
upgrade_npm_in_example "laravel"
upgrade_npm_in_example "vite"
upgrade_npm_in_example "salesforce"
upgrade_version_in_gatsbyjs
upgrade_version_in_salesforce

# Update frameworks/ directory (CDN-based installations)
# Note: These use CDN, so we only update dependencies, not the Nutrient SDK itself
upgrade_npm_in_framework "react" "JS"
upgrade_npm_in_framework "react" "TS"
upgrade_npm_in_framework "vue" "JS"
upgrade_npm_in_framework "vue" "TS"
upgrade_npm_in_framework "svelte" "JS"
upgrade_npm_in_framework "svelte" "TS"
upgrade_npm_in_framework "solid" "js"
upgrade_npm_in_framework "solid" "ts"
upgrade_npm_in_framework "angular" "TS"
upgrade_npm_in_framework "next" "JS"
upgrade_npm_in_framework "next" "TS"
upgrade_npm_in_framework "nuxt" "JS"
upgrade_npm_in_framework "nuxt" "TS"
upgrade_npm_in_framework "sveltekit" "js"
upgrade_npm_in_framework "sveltekit" "ts"
upgrade_npm_in_framework "vanilla" "js"
upgrade_npm_in_framework "vanilla" "ts"
