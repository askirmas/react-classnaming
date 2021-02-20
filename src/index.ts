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

type tToggleMap<K extends string> = Partial<Record<K, true|Falsy>>
interface iClassNamedCall<K extends string> {
  (toggleMapOrKeyExpression: Falsy|K|tToggleMap<K>, ...classKeyExpressions: (Falsy|K)[]): tClassNamed
  //TODO (withClassName: true|false, ...toggles: K[]): tClassNamed
}

interface iClassNamingReturn<K extends string> extends tClassNamed, iClassNamedCall<K> {}

/**
 * Makes `className` string from imported CSS
 * @param classNames 
 * @example <div className={classNaming({ClassName})} />
 * @example <div {...classNaming({ClassName})} />
 * @example classNaming(classNames)({class1: bool1}, bool2 && class2) />
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
 * @example classNaming(classNames)({class1: bool1}, bool2 && class2) />
 */
function classNaming<O, ClassKeys extends string = string>(
  propagatedClassName: undefined|string,
  classNames: ClassNamesMap<ClassKeys>
): O extends string ? string : iClassNamingReturn<ClassKeys>

function classNaming<_, ClassKeys extends string>(...args: any[]) {
  const classNames = args.pop()
  , className = args.pop()
  //TODO Check `new Proxy(string)` with `call` handler
  , $return: iClassNamedCall<ClassKeys> & Partial<tClassNamed>
  = (toggleMapOrKeyExpression, ...classKeyExpressions) => {
    const [map, firstKey] = toggleMapOrKeyExpression === null || typeof toggleMapOrKeyExpression !== "object"
    ? [{} as tToggleMap<ClassKeys>, toggleMapOrKeyExpression] as const
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

  return destination as T & tClassNamed
}
