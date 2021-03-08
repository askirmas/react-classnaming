import {
  CssModule,
} from "./types";
import type {
  ClassNamesMapping, ClassNamesMap,
} from "./index-types";
import {resolver} from "./core"
import { AnyObject } from "./ts-swiss";

const {keys: $keys} = Object

export {
  classNamesMap
}

/**
 * Set up mapping classnames function
 * @example
 * ```typescript
 * const mapping = classNamesMap(classnames)
 * ```
 */
function classNamesMap<
  Source extends CssModule,
>(classnames: Source){
  const mapper: ClassNamesMapping<Source> = map => mapping(classnames, map)
  return mapper
}

function mapping<
  Source extends CssModule,
  Target extends AnyObject = CssModule,
  Mapping extends ClassNamesMap<Target, Source> = ClassNamesMap<Target, Source>
>(
  source: Source,
  map: Mapping
): {[T in keyof Mapping]: string} {
  const keys = $keys(map) as (keyof Mapping)[]
  , classnames = {} as {[T in keyof Mapping]: string}

  for (let i = keys.length; i--;) {
    const key = keys[i]
    
    classnames[key] = resolver(source, map[key]!).join(" ")
  }

  return classnames
}

