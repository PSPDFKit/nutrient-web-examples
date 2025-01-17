#!/bin/bash

for dir in examples/*; do
  if [ -d "$dir" ]; then
    echo "Running e2e tests in $dir"
    (SERVER_DIR="$dir" npm run test)
  fi
done
