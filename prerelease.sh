#!/bin/bash
git switch release && \
git merge -X theirs -n release
git commit --no-edit
exit $?
