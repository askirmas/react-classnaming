import type { ClassNamesMap } from "./defs"

const {
  keys: $keys,
  defineProperty: $defineProperty,
  assign: $assign
} = Object
, classNameKey = "className" as const

export type {ClassNamesFrom, ClassNames} from "./defs"
export default classNaming
export {
  classNaming
}

type Falsy = undefined|null|false|0|""

type tClassNamed = {
  className: string
  toString: () => string
}
interface iClassNamedCall<K extends string> {
  //TODO (...args: K[]): tClassNamingReturn
  (map: Partial<Record<K, true|Falsy>>): tClassNamed
  //TODO (withClassName: true|false, ...args: K[]): tClassNamingReturn
}

interface iClassNamingReturn<K extends string> extends tClassNamed, iClassNamedCall<K> {}

/**
 * Makes `className` string from imported CSS
 * @param classNames 
 * @example <div className={classNaming({ClassName})} />
 * @example <div {...classNaming({ClassName})} />
 */
function classNaming<O, ClassKeys extends string = string>(
  classNames: ClassNamesMap<ClassKeys>
): O extends string ? string : iClassNamingReturn<ClassKeys>

/**
 * Makes `className` string from imported CSS
 * @param propagatedClassName 
 * @param classNames 
 * @example <div className={classNaming({ClassName})} />
 * @example <div {...classNaming({ClassName})} />
 */
function classNaming<O, ClassKeys extends string = string>(
  propagatedClassName: undefined|string,
  classNames: ClassNamesMap<ClassKeys>
): O extends string ? string : iClassNamingReturn<ClassKeys>

function classNaming<_, ClassKeys extends string>(...args: any[]) {
  const classNames = args.pop()
  , className = args.pop()
  , $return: iClassNamedCall<ClassKeys> & Partial<tClassNamed>
  = (map: Partial<Record<ClassKeys, true|Falsy>>) => {
    const filtered: Partial<ClassNamesMap<ClassKeys>> = {}
    for (const key in map) {
      const value = map[key]
      if (!(value && key in classNames))
        continue
      filtered[key] = classNames[key]
    }
    return _classNaming(filtered, className, {})
  }
  
  return _classNaming(classNames, className, $return)
}

function _classNaming<T extends Partial<tClassNamed>>(
  classNames: ClassNamesMap<string>,
  className: undefined|string,
  destination: T
): T & tClassNamed {
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

  $assign(destination, {[classNameKey]: classString})

  $defineProperty(
    destination,
    "toString",
    {
      value: () => classString
    }
  )

  return destination as T & tClassNamed
}
