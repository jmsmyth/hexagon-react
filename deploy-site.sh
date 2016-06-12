#!/bin/bash

npm run clean
mkdir target
mkdir target/site
git clone git@github.com:jmsmyth/hexagon-react.git target/site
pushd target/site
git checkout gh-pages
git rm -rf *
popd
npm run build-site
pushd target/site
git add .
git commit -m "Site auto-build"
git push
popd
