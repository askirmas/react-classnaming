/** TBD 
 * 1. `typeof classNaming === "function"` falls <div className={classNaming()} />
 * 2. <div {...{false, undefined, null}}/> falls attributes
*/

import type { ClassNamesMap } from "./defs"

const {
  keys: $keys,
  defineProperty: $defineProperty,
  assign: $assign
} = Object
, classNameKey = "className" as const

export type {ClassNames} from "./defs"
export default classNaming
export {
  classNaming
}

type Falsy = undefined|null|false|0|""

type ClassNamed = {
  className: string
  toString: () => string
}

type ToggleMap<K extends string> = Partial<Record<K, true|Falsy>>

interface ClassToggling<K extends string> {
  /**
   * @example <div {...classToggling({class1: !isHidden}, isOpen2 && class2)} />
   */
  (toggleMapOrKeyExpression: Falsy|K|ToggleMap<K>, ...classKeyExpressions: (Falsy|K)[]): ClassNamed
  //TODO (withClassName: true|false, ...toggles: K[]): tClassNamed
}

interface ClassNaming<K extends string> extends ClassNamed, ClassToggling<K> {}

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
