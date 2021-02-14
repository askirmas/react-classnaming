import type { ClassNamesMap, ClassNameOut } from "./defs"

const {keys: $keys, defineProperty: $defineProperty} = Object
, classNameKey = "className" as const

export type {ClassNamesFrom, ClassNames, ClassName} from "./defs"
export default classNaming
export {
  classNaming
}

/**
 * Makes `className` string from imported CSS
 * @param classNames 
 * @example <div className={classNaming({ClassName})} />
 * @example <div {...classNaming({ClassName})} />
 */
function classNaming<O>(
  classNames: ClassNamesMap<string>
): O extends string ? string : ClassNameOut;
/**
 * Makes `className` string from imported CSS
 * @param propagatedClassName 
 * @param classNames 
 * @example <div className={classNaming({ClassName})} />
 * @example <div {...classNaming({ClassName})} />
 */
function classNaming<O>(
  propagatedClassName: undefined|string,
  classNames: ClassNamesMap<string>
): O extends string ? string : ClassNameOut;
function classNaming(...args: any[]) {
  return _classNaming(args.pop(), args.pop())
}

function _classNaming(
  classNames: ClassNamesMap<string>,
  className: undefined|string
): ClassNameOut {
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
  , $return = {
    [classNameKey]: classString
  }

  $defineProperty($return, "toString", {
    value: () => classString
  })

  return $return 
}
