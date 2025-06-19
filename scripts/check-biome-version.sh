#!/bin/bash

# Script to check if Biome version in package.json matches the version in .github/workflows/biome.yml

# Extract Biome version from package.json (removing the ^ if present)
PACKAGE_VERSION=$(grep -o '"@biomejs/biome": "\^*[0-9.]*"' package.json | grep -o '[0-9.]*')

# Extract Biome version from .github/workflows/biome.yml
WORKFLOW_VERSION=$(grep -o 'version: "[0-9.]*"' .github/workflows/biome.yml | grep -o '[0-9.]*')

echo "Biome version in package.json: $PACKAGE_VERSION"
echo "Biome version in workflow file: $WORKFLOW_VERSION"

# Check if versions match
if [ "$PACKAGE_VERSION" != "$WORKFLOW_VERSION" ]; then
  echo "Error: Biome versions do not match!"
  echo "Please update the version in .github/workflows/biome.yml to match the version in package.json."
  exit 1
else
  echo "Biome versions match."
fi