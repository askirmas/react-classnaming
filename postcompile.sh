#!/bin/bash
src="src"
find "$src" -name '*.d.ts' -exec cp {} "$npm_package_types" \;

cd "$npm_package_types"
sed -i '' -r 's/(<reference )types(="[^"]+)"/\1path\2.d.ts"/' index.d.ts