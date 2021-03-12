#!/bin/bash
dir=$(realpath "$(dirname "${BASH_SOURCE[0]}")")
src="src"
find "$src" -name '*.d.ts' -exec cp {} "$npm_package_types" \;


cd "$(dirname "$npm_package_main")"  || exit 1
find . -name "*.types.js" -delete 
cd "$dir" || exit 1

cd "$npm_package_types" || exit 1

sed -ir 's/(<reference )types(="[^"]+)"/\1path\2.d.ts"/' index.d.ts
result="$?"

if [ "$result" ]; then 
  echo "another"
  sed -i '' -r 's/(<reference )types(="[^"]+)"/\1path\2.d.ts"/' index.d.ts
else
  echo "was ok"
fi
