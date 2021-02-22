// export type { ClassNames } from "./defs"
import { EMPTY_OBJECT } from "./consts"
import type { ClassNames, ReactRelated, ClassNamesMap } from "./defs"

type GetClassNames<Source extends string | ReactRelated = string> = "classNames" extends keyof ClassNames<Source>
? ClassNames<Source>["classNames"]
: never

// type SameKeys<T1 extends Record<string, any>, T2 extends Record<string, any>>
// = [Exclude<keyof T1, keyof T2> | Exclude<keyof T2, keyof T1>] extends [never]
// ? true
// : never

export default classNamesCheck

/** Declares class keys
 * @example classNamesCheck() // Anything
 * @example classNamesCheck<"class1">() // `.class1`
 * @example classNamesCheck<typeof Component>() // classKeys of `Component`
 */
function classNamesCheck<
  Source extends string | ReactRelated = string
>(): GetClassNames<Source>

/** Propagates shape */
function classNamesCheck<T extends ClassNamesMap<string>>(classNames: T): T

/** //TODO Checks consistency */
function classNamesCheck<
  K extends string | ReactRelated = string,
  T extends GetClassNames<K> = GetClassNames<K>
>(classNames: T): T

function classNamesCheck(classNames = EMPTY_OBJECT) {
  return classNames
}
