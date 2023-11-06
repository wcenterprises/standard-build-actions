#!/bin/bash

npm run rebuild

git commit -a -m "$1"
git push origin feature/dotnet

git tag dev -m "dev-$1" --force && \
  git push origin dev --force

git tag daily -m "daily-$1" --force && \
  git push origin daily --force
