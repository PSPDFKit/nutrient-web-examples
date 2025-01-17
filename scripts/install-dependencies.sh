#!/bin/bash

for dir in examples/*; do
  if [ -d "$dir" ]; then
    echo "Running e2e tests in $dir"
    (cd "$dir" && npm install)
  fi
done
