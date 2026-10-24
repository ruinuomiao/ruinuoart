#!/usr/bin/env bash
set -euo pipefail

repo_root="$(git rev-parse --show-toplevel 2>/dev/null)" || {
  echo "Run this script from inside the website repository." >&2
  exit 1
}
cd "$repo_root"

if [[ $# -lt 1 || -z "$1" ]]; then
  echo "Usage: ./scripts/publish.sh \"commit message\"" >&2
  exit 2
fi

branch="$(git branch --show-current)"
if [[ -z "$branch" ]]; then
  echo "Cannot publish from a detached HEAD." >&2
  exit 1
fi

remote_url="$(git remote get-url origin)"
if [[ "$remote_url" != "git@github.com:ruinuomiao/ruinuoart.git" ]]; then
  echo "Unexpected origin URL: $remote_url" >&2
  echo "Expected git@github.com:ruinuomiao/ruinuoart.git" >&2
  exit 1
fi

git add -A
if git diff --cached --quiet; then
  echo "No changes to publish."
  exit 0
fi

git commit -m "$1"
git push origin "$branch"
echo "Pushed $branch to GitHub. If a hosting integration is configured, its deployment should start automatically."
