#!/bin/bash
git switch release && \
git merge --squash --no-edit --commit main
exit $?
