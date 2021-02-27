import { EMPTY_OBJECT } from "./consts"
import type { ReactRelated, ClassNamesFrom, ClassNamesMap, ClassHash } from "./defs"

export {
  classNamesCheck
}

//TODO On assignment
/** Checks equality
 * @example classNamesCheck<typeof App, typeof require("./module.css")>(module?) // Will return notation as array of not used classes
 * @todo On parameter:
 * @example classNamesCheck<typeof App>(require("./module.css"))
*/

/** Identical function */
function classNamesCheck<T extends ClassNamesMap>(classnames: T): T

/* Declares class keys
 * @example classNamesCheck() // Anything
 * @example classNamesCheck<typeof Component>()
 */
function classNamesCheck(): never

/**
 * Overrides argument's shape.
 * For checking equality add `typeof css_module` as second generic parameter
*/
function classNamesCheck<K extends ReactRelated>(classnames: {[k: string]: ClassHash}): ClassNamesFrom<K>

/**
 * Check redundant keys
 */
function classNamesCheck<
  K extends ReactRelated,
  T extends ClassNamesFrom<K> = ClassNamesFrom<K> 
>(classnames?: T): string extends keyof T ? ClassNamesFrom<K>
: keyof T extends keyof ClassNamesFrom<K> ? T
// For Verbosing redundant keys
: Exclude<keyof T, keyof ClassNamesFrom<K>>[]


function classNamesCheck(classnames = EMPTY_OBJECT) {
  return classnames
}
