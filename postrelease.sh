#!/bin/bash
v="$npm_package_version"

git switch main
git merge --squash -X theirs release -nm "Backmerge after v$v release"
npm update; npm update --save-dev
git commit -m "Updater after v$v release"
exit $?
