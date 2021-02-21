/** TBD 
 * 1. <div {...{false, undefined, null}}/> falls attributes
*/
export type { ClassNames } from "./defs"
import { EMPTY_OBJECT } from "./consts"
import type { ClassNamesMap, ReactRelated, ClassNamed } from "./defs"

const {
  keys: $keys,
  defineProperty: $defineProperty,
  assign: $assign
} = Object
, classNameKey = "className" as const

import classNamingCtx from "./ctx"

export {
  classNamesCheck,
  classNamingBasic,
  classNamingCtx
}

/**
 * Makes `className` string from imported CSS
 * @example <div className={classNaming<string>({ClassName})} />
 * @example <div {...classNaming({ClassName})} />
 */
function classNamingBasic<Return, ClassKeys extends string = string>(
  classNames: ClassNamesMap<ClassKeys>
): Return extends string ? string : ClassNamed

/**
 * Makes `className` string from imported CSS
 * @example <div className={classNaming<string>({ClassName})} />
 * @example <div {...classNaming({ClassName})} />
 */
function classNamingBasic<Return, ClassKeys extends string = string>(
  propagatedClassName: undefined|string,
  classNames: ClassNamesMap<ClassKeys>
): Return extends string ? string : ClassNamed

function classNamingBasic(
  arg0: undefined|string|ClassNamesMap<string>,
  arg1: undefined|ClassNamesMap<string> = undefined
): ClassNamed {
  const classNames = typeof arg0 === "object" ? arg0 : arg1
  , className = typeof arg0 === "object" ? undefined : arg0

  return _classNaming(classNames!, className, {})
}

function _classNaming<T extends Partial<ClassNamed>>(
  classNames: ClassNamesMap<string>,
  className: undefined|string,
  destination: T
): T & ClassNamed {
  const keys = $keys(classNames)
  , {length} = keys

  for (let i = length; i--;) {
    const key = keys[i]
    , value = classNames[key]

    if (typeof value === "string")
      keys[i] = value
  }

  const classString = `${
    !className
    ? ""
    : `${className} `
  }${
    keys
    .join(" ")
  }`

  // TODO For propagation
  // $defineProperty(
  //   classNames,
  //   "toString",
  //   {
  //     value: undefined
  //   }
  // )
  // $assign(destination, {classNames})

  $assign(destination, {[classNameKey]: classString})

  $defineProperty(
    destination,
    "toString",
    {
      value: () => classString
    }
  )

  return destination as T & ClassNamed
}

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
