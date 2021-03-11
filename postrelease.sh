#!/bin/bash
v="$npm_package_version"

git switch main
# Change strategy to not mesh history
git merge -X theirs -nm "Backmerge after v$v release" release
npm update; npm update --save-dev
git commit -m "Updater after v$v release"
exit $?
