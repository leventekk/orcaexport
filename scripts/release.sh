#!/usr/bin/env bash

if [ ! -f package.json ]; then
  echo "Error: package.json not found in the current directory."
  exit 1
fi

validate_version() {
  local version_regex="^[0-9]+\.[0-9]+\.[0-9]+$"
  if [[ $1 =~ $version_regex ]]; then
    return 0
  else
    return 1
  fi
}

current_version=$(grep -oE '"version": *"[^"]+"' package.json | sed -E 's/"version": *"([^"]+)"/\1/')

echo "Currect version: $current_version"

read -r -p "Enter the new version number (e.g., 1.2.3): " new_version

if ! validate_version "$new_version"; then
  echo "Error: Invalid version format. Use semantic versioning (e.g., 1.2.3)."
  exit 1
fi

sed -i.bak -E "s/\"version\": *\"[0-9]+\.[0-9]+\.[0-9]+\"/\"version\": \"$new_version\"/" package.json

rm -f package.json.bak

git add package.json
git commit -m "chore: bump version to $new_version"

git tag "v$new_version"

git push origin main
git push origin "v$new_version"

echo "Release 'v$new_version' created and pushed successfully!"
