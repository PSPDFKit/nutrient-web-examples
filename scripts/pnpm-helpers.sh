#!/bin/bash

# These helpers back scripts that run npm inside the npm-based examples below
# the root pnpm pin. Corepack applies that pin to every directory under the
# root and, with its strict npm shim enabled, would reject those npm calls.
export COREPACK_ENABLE_STRICT=0

# pnpm 11 applies its minimum release age to every lockfile entry during
# install, not only while resolving new versions. All scripts must use the same
# policy so a lockfile written by the audit or update script remains installable
# in CI. The opt-out also avoids tracked minimumReleaseAgeExclude entries.
export pnpm_config_minimum_release_age=0

require_local_pnpm_workspace() {
  local example="${1:-The current directory}"

  if [ ! -f "pnpm-workspace.yaml" ]; then
    echo "${example} has a pnpm-lock.yaml but no sibling pnpm-workspace.yaml; refusing to use an ancestor workspace." >&2
    return 1
  fi
}

run_pnpm_command_quietly() {
  local output
  local status=0

  output=$(pnpm "$@" 2>&1) || status=$?
  if (( status != 0 )); then
    printf '%s\n' "$output" >&2
    return "$status"
  fi
  if [ -n "$output" ]; then
    printf '%s\n' "$output"
  fi
}

run_pnpm_audit_fix() {
  # A successful fix exits zero even when the initial audit found advisories.
  # Preserve every real pnpm failure instead of hiding bad flags, registry
  # failures, or an unwritable workspace file.
  run_pnpm_command_quietly audit --fix=override --ignore-registry-errors
}

run_pnpm_install_quietly() {
  # pnpm 11 fails when it encounters an unapproved dependency build. Keep the
  # successful output quiet, but print the complete failure before propagating it.
  run_pnpm_command_quietly install "$@"
}
