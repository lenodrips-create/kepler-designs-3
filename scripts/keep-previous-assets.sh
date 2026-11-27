#!/usr/bin/env bash
# Copy the built assets of the last few versions into dist/assets.
#
# File names carry a content hash, so files from different versions never
# collide. A page that a visitor's browser kept from before an update still
# asks for that version's scripts and styles; keeping them here means it
# always finds them, instead of loading half-styled or missing pieces.
#
# Usage: scripts/keep-previous-assets.sh [how-many-versions]   (default 5)
set -u
KEEP="${1:-5}"
ROOT="$(git rev-parse --show-toplevel)"
WORK="$(mktemp -d)"
trap 'git -C "$ROOT" worktree prune; rm -rf "$WORK"' EXIT

for i in $(seq 1 "$KEEP"); do
  REV="$(git -C "$ROOT" rev-parse --verify --quiet "HEAD~$i")" || break
  DIR="$WORK/v$i"
  git -C "$ROOT" worktree add --detach --quiet "$DIR" "$REV" || continue
  ln -s "$ROOT/node_modules" "$DIR/node_modules"
  if (cd "$DIR" && npx vite build --outDir "$DIR/out" --emptyOutDir --logLevel error >/dev/null 2>&1); then
    cp -rn "$DIR/out/assets/." "$ROOT/dist/assets/" 2>/dev/null
    echo "kept assets from ${REV:0:7}"
  else
    echo "skipped ${REV:0:7} (did not build)"
  fi
  git -C "$ROOT" worktree remove --force "$DIR" >/dev/null 2>&1
done
