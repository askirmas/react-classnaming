import {
  CssModule,
} from "./definitions.defs";
import type {
  ClassNamesMapping, ClassNamesMap,
} from "./index-types.defs";
import {resolver} from "./core"
import { AnyObject, OmitIndexed } from "./ts-swiss.defs";
import { GetProps } from "./react-swiss.defs";

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
  const mapper: ClassNamesMapping<Source> = (target, map) => mapping(classnames, target, map)
  return mapper
}

function mapping<
  Source extends CssModule,
  Target extends AnyObject,
  Mapping extends ClassNamesMap<OmitIndexed<GetProps<Target>>, Source>
>(
  source: Source,
  _: Target,
  map: Mapping
): {[M in keyof Mapping]: string} {
  const keys = $keys(map) as (keyof Mapping)[]
  , classnames = {} as {[M in keyof Mapping]: string}

  for (let i = keys.length; i--;) {
    const key = keys[i]
    , val = map[key]
    
    if (val === undefined)
      continue
      
    classnames[key] = typeof val === "function"
    ? `${val}`
    : resolver(source,
      //@ts-expect-error #27 TS doesn't understand that ClassNaming is first of all function
      val
    ).join(" ") 
  }

  return classnames
}
