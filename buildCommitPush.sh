#!/bin/bash

npm run rebuild

branch="$(echo "$(git branch --show-current)")"

git commit -a -m "daily:$1"
git push origin $branch

git tag dev -m "dev:$1" --force && \
  git push origin dev --force

git tag daily -m "daily:$1" --force && \
  git push origin daily --force
