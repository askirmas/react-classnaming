import { EMPTY_OBJECT } from "./consts"
import type { ClassNames, ReactRelated, ClassNamesMap } from "./defs"

type GetClassNames<Source extends string | ReactRelated = string> = "classNames" extends keyof ClassNames<Source>
? ClassNames<Source>["classNames"]
: never

export default classNamesCheck

/** Declares class keys
 * @example classNamesCheck() // Anything
 * @example classNamesCheck<"class1">() // `.class1`
 * @example classNamesCheck<typeof Component>() // classKeys of `Component`
 */
function classNamesCheck<
  Source extends string | ReactRelated = string
>(): GetClassNames<Source>

/**
 * Propagates argument's shape.
 * For checking equality add `typeof css_module` as second generic parameter
*/
function classNamesCheck<T extends ClassNamesMap<string>>(classNames: T): T

//TODO On assignment
/** Checks equality
 * @example classNamesCheck<typeof App, typeof require("./module.css")>(module?) // Will return notation as array of not used classes
 * @todo On parameter:
 * @example classNamesCheck<typeof App>(require("./module.css"))
*/
function classNamesCheck<
  K extends string | ReactRelated,
  T extends GetClassNames<K> = GetClassNames<K>
>(classNames?: T): string extends keyof T ? GetClassNames<K>
: keyof T extends keyof GetClassNames<K> ? T
// For Verbosing redundant keys
: Exclude<keyof T, keyof GetClassNames<K>>[]

function classNamesCheck(classNames = EMPTY_OBJECT) {
  return classNames
}
