#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd dist

# place .nojekyll to bypass Jekyll processing
echo > .nojekyll

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init
git checkout -B main
git add -A
git commit -m 'deploy'

# if you are deploying to https://as6625998.github.io
# git push -f git@github.com:as6625998/as6625998.github.io.git main

# if you are deploying to https://as6625998.github.io/week6
git push -f https://github.com/as6625998/week6.git main:gh-pages
cd -