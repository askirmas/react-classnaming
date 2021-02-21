/** TBD 
 * 1. <div {...{false, undefined, null}}/> falls attributes
*/
export type { ClassNames } from "./defs"
import { EMPTY_OBJECT } from "./consts"
import type { ClassNamesMap, ReactRelated, ClassNamed, ToggleMap, ClassNaming, ClassToggling } from "./defs"

const {
  keys: $keys,
  defineProperty: $defineProperty,
  assign: $assign
} = Object
, classNameKey = "className" as const

import classNamingCtx from "./ctx"
export default classNaming
export {
  classNaming,
  classNamesCheck,
  classNamingBasic,
  classNamingCtx
}

/**
 * Makes `className` string from imported CSS
 * @param classNames 
 * @example <div className={classNaming({ClassName})} />
 * @example <div {...classNaming({ClassName})} />
 * @example classToggling({class1: !isHidden}, isOpen2 && class2)
 */
function classNaming<Return, ClassKeys extends string = string>(
  classNames: ClassNamesMap<ClassKeys>
): Return extends string ? string :
ClassNaming<keyof typeof classNames>

/**
 * Makes `className` string from imported CSS
 * @param propagatedClassName 
 * @param classNames 
 * @example <div className={classNaming({ClassName})} />
 * @example <div {...classNaming({ClassName})} />
 * @example classToggling({class1: !isHidden}, isOpen2 && class2)
 */
function classNaming<Return, ClassKeys extends string = string>(
  propagatedClassName: undefined|string,
  classNames: ClassNamesMap<ClassKeys>
): Return extends string ? string : ClassNaming<keyof typeof classNames>

function classNaming<_, ClassKeys extends string>(...args: any[]) {
  const classNames = args.pop()
  , className = args.pop()
  
  return _classNaming(classNames, className, contexted<ClassKeys>(classNames, className))
}

function classNamingBasic<Return, ClassKeys extends string = string>(
  classNames: ClassNamesMap<ClassKeys>
): Return extends string ? string : ClassNamed
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

function contexted<ClassKeys extends string>(
  classNames: ClassNamesMap<string>,
  className: undefined|string
) {
  const $return: ClassToggling<ClassKeys> & Partial<ClassNamed>
  = (toggleMapOrKeyExpression, ...classKeyExpressions) => {
    const [map, firstKey] = toggleMapOrKeyExpression === null || typeof toggleMapOrKeyExpression !== "object"
    ? [{} as ToggleMap<ClassKeys>, toggleMapOrKeyExpression] as const
    : [toggleMapOrKeyExpression, false] as const
    
    , keys = classKeyExpressions
    .concat(firstKey)
    .concat($keys(map) as ClassKeys[])
    .filter(Boolean) as ClassKeys[]

    , {length} = keys
    , filtered: Partial<ClassNamesMap<ClassKeys>> = {}

    for (let i = 0; i < length; i++) {
      const key = keys[i]
      , allowed = key in map ? map[key] : key

      if (!(allowed && key in classNames)) 
        continue

      filtered[key] = classNames[key]
    }
    return _classNaming(filtered, className, {})
  }

  return $return
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
