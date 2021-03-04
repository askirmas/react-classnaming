import {
  ClassNamesProperty,
  CssModule,
  ActionsOf
} from "./defs";
import type {
  ClassNamesMap,
} from "./index.types";
import {resolver} from "./core"


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
  const mapper: ClassNamesMap<Source> = map => mapping(classnames, map)
  return mapper
}

function mapping<
  Target extends ClassNamesProperty<CssModule>,
  Source extends CssModule,
>(
  source: Source,
  map: {[T in keyof Target["classnames"]]: ActionsOf<Source>}
): {classnames: {[T in keyof Target["classnames"]]: string}} {
  const keys = $keys(map) as (keyof Target["classnames"])[]
  , classnames = {} as {[T in keyof Target["classnames"]]: string}

  for (let i = keys.length; i--;) {
    const key = keys[i]
    
    classnames[key] = resolver(source, map[key]).join(" ")
  }

  return {classnames}
}

