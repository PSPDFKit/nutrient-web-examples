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

upgrade_version_in_gatsbyjs() {
  node ./script/update-version-in-gatsby.js
}

upgrade_version_in_salesforce() {
  node ./script/update-version-in-salesforce.js
}

upgrade_npm_in_example "webpack"
upgrade_npm_in_example "react"
upgrade_npm_in_example "vue"
upgrade_npm_in_example "pwa"
upgrade_npm_in_example "electron"
upgrade_npm_in_example "typescript"
upgrade_npm_in_example "elm"
upgrade_npm_in_example "nextjs"
upgrade_npm_in_example "gatsbyjs"
upgrade_npm_in_example "svelte"
upgrade_npm_in_example "angular"
upgrade_npm_in_example "electron-nodeintegration"
upgrade_npm_in_example "nuxtjs"
upgrade_npm_in_example "laravel"
upgrade_npm_in_example "vite"
upgrade_npm_in_example "salesforce"
upgrade_version_in_gatsbyjs
upgrade_version_in_salesforce
