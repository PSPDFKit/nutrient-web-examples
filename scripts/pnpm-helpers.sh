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
  local before
  local status=0

  before="$(mktemp)"
  cp pnpm-workspace.yaml "${before}"

  # A successful fix exits zero even when the initial audit found advisories.
  # Preserve every real pnpm failure instead of hiding bad flags, registry
  # failures, or an unwritable workspace file.
  run_pnpm_command_quietly audit --fix=override --ignore-registry-errors || status=$?

  if (( status == 0 )); then
    drop_unpublished_overrides "${before}" || status=$?
  fi

  rm -f "${before}"
  return "${status}"
}

# pnpm audit --fix=override pins the first patched version an advisory names,
# whether or not that version was ever published. For the 1.25.0 bump it wrote
# deepmerge@^4.3.2 into examples/svelte-kit although deepmerge stops at 4.3.1,
# so the install that follows failed and stopped the bump for every example
# after it. Drop each override the fix just added that no published version
# satisfies, and say so. A registry error keeps the override, so a network
# failure never removes a real fix.
drop_unpublished_overrides() {
  local before=$1
  local line entry key value name matches

  while IFS= read -r line; do
    entry="${line#"${line%%[![:space:]]*}"}"
    key="${entry%: *}"
    value="${entry##*: }"
    key="${key//[\"\']/}"
    value="${value//[\"\']/}"

    # The key is a package name with an optional version range, and a scoped
    # name starts with its own @.
    if [[ "${key}" == @* ]]; then
      name="${key:1}"
      name="@${name%%@*}"
    else
      name="${key%%@*}"
    fi

    # npm answers a range nothing satisfies with E404 "No match found for
    # version", which is the case to drop. Any other failure, such as an
    # unreachable registry, keeps the override.
    if matches="$(npm view "${name}@${value}" version 2>&1)"; then
      if [ -n "${matches}" ]; then
        continue
      fi
    elif ! grep -q "No match found for version" <<< "${matches}"; then
      echo "Could not look up ${name}@${value}; keeping the override for ${key}." >&2
      continue
    fi

    echo "No published ${name} matches ${value}; dropping the audit override for ${key}." >&2
    grep -vxF -- "${line}" pnpm-workspace.yaml > pnpm-workspace.yaml.tmp
    mv pnpm-workspace.yaml.tmp pnpm-workspace.yaml
  done < <(grep -vxF -f "${before}" pnpm-workspace.yaml | grep -E '^[[:space:]]+[^[:space:]#].*: ' || true)
}

run_pnpm_install_quietly() {
  # pnpm 11 fails when it encounters an unapproved dependency build. Keep the
  # successful output quiet, but print the complete failure before propagating it.
  run_pnpm_command_quietly install "$@"
}
