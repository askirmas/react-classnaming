import {
  CssModule,
} from "./defs";
import type {
  ClassNamesMapping, ClassNamesMap,
} from "./index-types";
import {resolver} from "./core"
import { AnyObject } from "./ts-swiss";

const {keys: $keys} = Object

export default classNamesMap
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
  Map extends ClassNamesMap<Target, Source> = ClassNamesMap<Target, Source>
>(
  source: Source,
  map: Map
): {[T in keyof Map]: string} {
  const keys = $keys(map) as (keyof Map)[]
  , classnames = {} as {[T in keyof Map]: string}

  for (let i = keys.length; i--;) {
    const key = keys[i]
    
    classnames[key] = resolver(source, map[key]!).join(" ")
  }

  return classnames
}

