import {
  CssModule,
} from "./types";
import type {
  ClassNamesMapping, ClassNamesMap,
} from "./index-types";
import {resolver} from "./core"
import { AnyObject, OmitIndexed } from "./ts-swiss";
import { GetProps } from "./react-swiss";

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
): {[T in keyof Mapping]: string} {
  const keys = $keys(map) as (keyof Mapping)[]
  , classnames = {} as {[T in keyof Mapping]: string}

  for (let i = keys.length; i--;) {
    const key = keys[i]
    
    classnames[key] = resolver(source, map[key]!).join(" ")
  }

  return classnames
}

