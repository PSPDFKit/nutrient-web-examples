#!/bin/bash
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
EXPECTED_PACKAGE_MANAGER='pnpm@11.20.0+sha512.9a6f330a95b66446ea088faf1521405a8a01f07fde7124cc9958dfed52d4bb436737e65b08f85f37b46fcba375092558ac51262b816844b22f63406ed166bfee'

fail() {
  echo "FAIL: $*" >&2
  exit 1
}

# Prints the body of the "Setup pnpm" step: everything after its name line up to
# the next step, so a `version:` input is caught wherever it sits in the step and
# a neighbouring step's `node-version:` never is.
setup_pnpm_step() {
  awk '/name: Setup pnpm/ { inside = 1; next } inside && /^ *- / { exit } inside { print }' "$1"
}

# Corepack applies the root packageManager pin to every directory below it and,
# with its strict npm shim enabled, rejects npm and npx. Root-level workflows,
# hooks, runners, and docs therefore use pnpm.
npm_invocation='(^|[^[:alnum:]])(npm (run|exec|install|ci)|npx)( |$)'

actual_package_manager="$(node -p "require('${REPO_ROOT}/package.json').packageManager")"
[[ "$actual_package_manager" == "$EXPECTED_PACKAGE_MANAGER" ]] || \
  fail "packageManager is not pinned to the expected integrity hash"

for workflow in playwright.yml update-nutrient-sdk.yml; do
  workflow_path="${REPO_ROOT}/.github/workflows/${workflow}"
  grep -q 'name: Setup pnpm' "$workflow_path" || \
    fail "${workflow} does not set up pnpm"
  if setup_pnpm_step "$workflow_path" | grep -Eq '^[[:space:]]*version:'; then
    fail "${workflow} overrides the packageManager pnpm version"
  fi
done

grep -q 'run: pnpm install --frozen-lockfile && pnpm run install-dependencies' \
  "${REPO_ROOT}/.github/workflows/playwright.yml" || \
  fail "Playwright CI does not use the pinned pnpm for the root install"

for file in .github/workflows/playwright.yml .github/workflows/update-nutrient-sdk.yml \
  .github/pull_request_template.md AGENTS.md README.md .husky/pre-commit scripts/e2e-tests.sh; do
  if grep -Eq "$npm_invocation" "${REPO_ROOT}/${file}"; then
    fail "${file} invokes npm at the repository root, which Corepack rejects in this pnpm project"
  fi
done

# Under pnpm 11 `pnpm run` verifies dependencies first (installing them by
# default), so the workflow calls this script directly and the repository
# downgrades that check to a warning so scripts never mutate the tree.
grep -q 'run: ./tests/pnpm-workflows.test.sh' "${REPO_ROOT}/.github/workflows/playwright.yml" || \
  fail "Playwright CI must run this script directly instead of through pnpm run"
grep -q '^verifyDepsBeforeRun: warn$' "${REPO_ROOT}/pnpm-workspace.yaml" || \
  fail "pnpm-workspace.yaml must set verifyDepsBeforeRun: warn so pnpm run never installs implicitly"

# The scripts and the e2e web server intentionally run npm inside the npm-based
# examples; Corepack would reject that under the root pin unless strict mode is off.
grep -q '^export COREPACK_ENABLE_STRICT=0$' "${REPO_ROOT}/scripts/pnpm-helpers.sh" || \
  fail "pnpm-helpers.sh must export COREPACK_ENABLE_STRICT=0 for the npm examples"
grep -q 'COREPACK_ENABLE_STRICT: "0"' "${REPO_ROOT}/playwright.config.ts" || \
  fail "playwright.config.ts must set COREPACK_ENABLE_STRICT=0 for the example web servers"

# pnpm 11 defaults minimum-release-age to 24 hours and records an exclusion for
# every newer version in the nearest pnpm-workspace.yaml. The bump installs a
# version released hours earlier and the audit fix installs fresh patches, so
# without this opt-out both rewrite the tracked example workspace files.
for script in audit-dependencies.sh update-nutrient-in-examples.sh; do
  grep -q '^export pnpm_config_minimum_release_age=0$' "${REPO_ROOT}/scripts/${script}" || \
    fail "${script} does not opt out of pnpm's minimum release age"
done

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
