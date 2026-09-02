#!/bin/bash
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
EXPECTED_PACKAGE_MANAGER='pnpm@11.20.0+sha512.9a6f330a95b66446ea088faf1521405a8a01f07fde7124cc9958dfed52d4bb436737e65b08f85f37b46fcba375092558ac51262b816844b22f63406ed166bfee'

fail() {
  echo "FAIL: $*" >&2
  exit 1
}

actual_package_manager="$(node -p "require('${REPO_ROOT}/package.json').packageManager")"
[[ "$actual_package_manager" == "$EXPECTED_PACKAGE_MANAGER" ]] || \
  fail "packageManager is not pinned to the expected integrity hash"

for workflow in playwright.yml update-nutrient-sdk.yml; do
  workflow_path="${REPO_ROOT}/.github/workflows/${workflow}"
  grep -q 'name: Setup pnpm' "$workflow_path" || \
    fail "${workflow} does not set up pnpm"
  if grep -A3 'name: Setup pnpm' "$workflow_path" | grep -q 'version:'; then
    fail "${workflow} overrides the packageManager pnpm version"
  fi
done

grep -q 'run: pnpm install --frozen-lockfile && pnpm run install-dependencies' \
  "${REPO_ROOT}/.github/workflows/playwright.yml" || \
  fail "Playwright CI does not use the pinned pnpm for the root install"

if grep -Eq 'run: npm (run|exec)' "${REPO_ROOT}/.github/workflows/playwright.yml"; then
  fail "Playwright CI bypasses the pinned package manager"
fi
if grep -Eq '^npm (run|exec|install)' "${REPO_ROOT}/AGENTS.md"; then
  fail "AGENTS.md documents npm commands that Corepack rejects in this pnpm project"
fi

for script in audit-dependencies.sh install-dependencies.sh update-nutrient-in-examples.sh; do
  script_path="${REPO_ROOT}/scripts/${script}"
  grep -q 'pnpm-helpers.sh' "$script_path" || \
    fail "${script} does not load the pnpm guards"
  grep -q 'require_local_pnpm_workspace' "$script_path" || \
    fail "${script} does not reject pnpm examples without a local workspace file"
done

# shellcheck source=../scripts/pnpm-helpers.sh
source "${REPO_ROOT}/scripts/pnpm-helpers.sh"

fixture="$(mktemp -d)"
trap 'rm -rf "$fixture"' EXIT
cd "$fixture"

if require_local_pnpm_workspace "fixture" 2>workspace-error.txt; then
  fail "missing pnpm-workspace.yaml was accepted"
fi
grep -q 'pnpm-workspace.yaml' workspace-error.txt || \
  fail "missing-workspace failure did not explain the invariant"

touch pnpm-workspace.yaml
require_local_pnpm_workspace "fixture" || \
  fail "local pnpm-workspace.yaml was rejected"

mkdir bin
cat > bin/pnpm <<'PNPM'
#!/bin/bash
printf '%s\n' "$*" > "${PNPM_ARGS_FILE}"
echo "simulated audit failure" >&2
exit 42
PNPM
chmod +x bin/pnpm
export PATH="${fixture}/bin:${PATH}"
export PNPM_ARGS_FILE="${fixture}/pnpm-args.txt"

set +e
run_pnpm_audit_fix >audit-stdout.txt 2>audit-stderr.txt
status=$?
set -e

[[ "$status" -eq 42 ]] || fail "pnpm audit failure status was swallowed"
[[ "$(cat pnpm-args.txt)" == 'audit --fix=override' ]] || \
  fail "pnpm audit fix used unexpected arguments"
grep -q 'simulated audit failure' audit-stderr.txt || \
  fail "pnpm audit failure details were hidden"

set +e
run_pnpm_install_quietly --no-frozen-lockfile >install-stdout.txt 2>install-stderr.txt
status=$?
set -e

[[ "$status" -eq 42 ]] || fail "pnpm install failure status was swallowed"
[[ "$(cat pnpm-args.txt)" == 'install --no-frozen-lockfile' ]] || \
  fail "pnpm install used unexpected arguments"
grep -q 'simulated audit failure' install-stderr.txt || \
  fail "pnpm install failure details were hidden"

echo "pnpm workflow checks passed"
