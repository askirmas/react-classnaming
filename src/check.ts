export type { ClassNames } from "./defs"
import { EMPTY_OBJECT } from "./consts"
import type { ClassNamesMap, ReactRelated } from "./defs"

export default classNamesCheck

function classNamesCheck<
  K extends string | ReactRelated = string,
  T extends ClassNamesMap<string> = never
>(
  classNames = EMPTY_OBJECT as [T] extends [never] ? ClassNamesMap<string> : T
) {
  
  return classNames as ClassNamesMap<
    Extract<K, string>
  >
}
