#!/bin/bash
git switch release && \
git merge --squash --no-edit --log --no-stat main && \
git commit --no-edit
exit $?
