#!/bin/bash
set -euo pipefail
IFS=$'\n\t'

npm run format
npm run lint
npm run check

sed -i -e '/### ToDo Comments/q' README.md

echo '' >> README.md

git grep -n "// @todo" -- ':!todo.sh' ':!package.json' ':!README.md' | sed 's/^/- /m ; s/\/\/ @/ @/m ; s/\s\+/ /gm' >> README.md

git add ./README.md
