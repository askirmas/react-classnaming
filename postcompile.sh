#!/bin/bash
dir=$(realpath "$(dirname "${BASH_SOURCE[0]}")")
src="src"
find "$src" -name '*.d.ts' -exec cp {} "$npm_package_types" \;


cd "$(dirname "$npm_package_main")"  || exit 1
find . -name "*.types.js" -delete 
cd "$dir" || exit 1

cd "$npm_package_types" || exit 1

# https://stackoverflow.com/a/4247319/9412937
# sed -i'' -r 's/(<reference )types(="[^"]+)"/\1path\2.d.ts"/' index.d.ts
perl -i -pe's/(<reference )types(="[^"]+)"/\1path\2.d.ts"/' index.d.ts
