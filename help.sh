#!/bin/bash
git commit -a -m "update" && \
  git push origin feature/dotnet && \
  git tag dev --force && \
  git push origin dev --force && \
  git tag daily --force && \
  git push origin daily --force
