#!/bin/bash
# Decides whether a Nutrient SDK bump is needed, refusing one already in flight.
set -euo pipefail

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
REPO_ROOT="${SCRIPT_DIR}/.."

# Every example is held at the same version, so one of them reports the version
# the repository is on.
REFERENCE_EXAMPLE="react"

PACKAGE_URL="https://registry.npmjs.org/@nutrient-sdk/viewer"
DIST_TAGS_URL="https://registry.npmjs.org/-/package/@nutrient-sdk/viewer/dist-tags"

requested="${1:-}"

if [ -n "${requested}" ]; then
  latest="${requested}"
else
  latest="$(curl -fsSL --retry 3 --retry-delay 2 "${DIST_TAGS_URL}" | jq -er '.latest')"
fi

# Anything carrying a prerelease suffix is a nightly, never a release we ship.
if ! [[ "${latest}" =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
  echo "Refusing to act on non-stable version \"${latest}\"." >&2
  exit 1
fi

# A dispatched version is typed by hand, and the dist-tag is not there to vouch
# for it. Without this, a typo gets through detection and only surfaces as an
# npm 404 well into the bump, long after the branch has been created.
#
# A version older than current is deliberately allowed: dispatching one is how a
# bad release gets rolled back.
if [ -n "${requested}" ]; then
  if ! curl -fsSL --retry 3 --retry-delay 2 -o /dev/null \
    "${PACKAGE_URL}/${requested}"; then
    echo "@nutrient-sdk/viewer@${requested} is not published on the registry." >&2
    exit 1
  fi
fi

# jq -r prints "null" and exits 0 for a missing key, which would silently
# disable the already-on-this-version check.
if ! current="$(jq -er '.dependencies["@nutrient-sdk/viewer"]' \
  "${REPO_ROOT}/examples/${REFERENCE_EXAMPLE}/package.json")"; then
  echo "examples/${REFERENCE_EXAMPLE} has no @nutrient-sdk/viewer dependency." >&2
  echo "The reference example moved or was renamed; update REFERENCE_EXAMPLE." >&2
  exit 1
fi

branch="update-examples-${latest}"

if [ "${latest}" = "${current}" ]; then
  should_update="false"
  reason="already on ${latest}"
else
  # --state all: a bump closed without merging must not be reopened on every
  # scheduled run. A failed lookup must not read as "no pull request".
  if ! pull_requests="$(gh pr list --state all --head "${branch}" \
    --json number --jq '.[].number')"; then
    echo "Could not list pull requests for ${branch}; refusing to guess." >&2
    exit 1
  fi

  if [ -n "${pull_requests}" ]; then
    should_update="false"
    reason="a pull request for ${branch} already exists"
  else
    ls_remote_status=0
    git -C "${REPO_ROOT}" ls-remote --exit-code --heads origin "${branch}" \
      >/dev/null || ls_remote_status=$?

    case "${ls_remote_status}" in
      # An earlier run pushed the branch and then failed before opening its
      # pull request. Skipping quietly would bury this version for good.
      0)
        echo "Branch ${branch} exists with no pull request, so an earlier run" >&2
        echo "failed part-way. Delete it or open its pull request by hand." >&2
        exit 1
        ;;
      # --exit-code reserves 2 for "no matching ref"; anything else is a real
      # failure that must not read as "the branch is free".
      2)
        should_update="true"
        reason="${current} -> ${latest}"
        ;;
      *)
        echo "git ls-remote failed with status ${ls_remote_status}." >&2
        exit 1
        ;;
    esac
  fi
fi

echo "should_update=${should_update} (${reason})"

{
  echo "version=${latest}"
  echo "current=${current}"
  echo "branch=${branch}"
  echo "should_update=${should_update}"
} >> "${GITHUB_OUTPUT:-/dev/stdout}"
