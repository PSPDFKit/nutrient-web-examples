#!/bin/bash
# Decides whether a Nutrient SDK bump is needed, and refuses to start one that
# is already in flight. Writes version/branch/should_update to $GITHUB_OUTPUT.
set -euo pipefail

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
REPO_ROOT="${SCRIPT_DIR}/.."

# Every example tracked by update-nutrient-in-examples.sh is held at the same
# version, so any one of them reports the version the repository is on.
REFERENCE_EXAMPLE="react"

DIST_TAGS_URL="https://registry.npmjs.org/-/package/@nutrient-sdk/viewer/dist-tags"

requested="${1:-}"

if [ -n "${requested}" ]; then
  latest="${requested}"
else
  latest="$(curl -fsSL --retry 3 --retry-delay 2 "${DIST_TAGS_URL}" | jq -r '.latest')"
fi

# Anything carrying a prerelease suffix is a nightly, never a release we ship.
if ! [[ "${latest}" =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
  echo "Refusing to act on non-stable version \"${latest}\"." >&2
  exit 1
fi

current="$(jq -r '.dependencies["@nutrient-sdk/viewer"]' \
  "${REPO_ROOT}/examples/${REFERENCE_EXAMPLE}/package.json")"

branch="update-examples-${latest}"
should_update="true"
reason="${current} -> ${latest}"

if [ "${latest}" = "${current}" ]; then
  should_update="false"
  reason="already on ${latest}"
elif git -C "${REPO_ROOT}" ls-remote --exit-code --heads origin "${branch}" >/dev/null 2>&1; then
  should_update="false"
  reason="branch ${branch} already exists"
elif command -v gh >/dev/null 2>&1 &&
  [ -n "$(gh pr list --state all --head "${branch}" --json number --jq '.[].number' 2>/dev/null)" ]; then
  # A closed-without-merge bump must not be reopened on every scheduled run.
  should_update="false"
  reason="a pull request for ${branch} already exists"
fi

echo "should_update=${should_update} (${reason})"

{
  echo "version=${latest}"
  echo "current=${current}"
  echo "branch=${branch}"
  echo "should_update=${should_update}"
} >> "${GITHUB_OUTPUT:-/dev/stdout}"
