import { EMPTY_OBJECT } from "./consts"
import type { ClassNames, ReactRelated, ClassNamesMap } from "./defs"

//TODO undestand against `GetClassNames` in defs
type GetClassNames<Source extends ReactRelated = never> = "classnames" extends keyof ClassNames<Source>
? ClassNames<Source>["classnames"]
: never

export default classNamesCheck

/** Declares class keys
 * @example classNamesCheck() // Anything
 * @example classNamesCheck<"class1">() // `.class1`
 * @example classNamesCheck<typeof Component>() // classKeys of `Component`
 */
function classNamesCheck<
  Source extends ReactRelated = never
>(): GetClassNames<Source>

/**
 * Propagates argument's shape.
 * For checking equality add `typeof css_module` as second generic parameter
*/
function classNamesCheck<T extends ClassNamesMap<string>>(classnames: T): T

//TODO On assignment
/** Checks equality
 * @example classNamesCheck<typeof App, typeof require("./module.css")>(module?) // Will return notation as array of not used classes
 * @todo On parameter:
 * @example classNamesCheck<typeof App>(require("./module.css"))
*/
function classNamesCheck<
  K extends ReactRelated,
  T extends GetClassNames<K> = GetClassNames<K>
>(classnames?: T): string extends keyof T ? GetClassNames<K>
: keyof T extends keyof GetClassNames<K> ? T
// For Verbosing redundant keys
: Exclude<keyof T, keyof GetClassNames<K>>[]

function classNamesCheck(classnames = EMPTY_OBJECT) {
  return classnames
}
