#!/bin/sh

set -e

# handle negation
negate=false
while getopts ":n" opt; do
  case $opt in
    n) negate=true ;;
  esac
done

# handle pattern
shift $((OPTIND -1))
pattern=$1
message=$(git log -1 --pretty=%B $GITHUB_SHA)

# continue/exit logic
if echo "$message" | grep -q "$pattern"; then
  echo "INFO: $message matches $pattern"

  if $negate; then
    echo "Exiting..."
    exit 78 # neutral exit
  else
    echo "Continuing..."
    exit 0 # success
  fi
else
  echo "INFO: $message does not match $pattern"

  if $negate; then
    echo "Continuing..."
    exit 0 # success
  else
    echo "Exiting..."
    exit 78 # neutral exit
  fi
fi
