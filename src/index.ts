const {keys: $keys, defineProperty: $defineProperty} = Object
, classNameKey = "className" as const

export type ClassNames<C extends string> = {
  classNames: ClassNamesMap<C>
}

type ClassNamesMap<C extends string> = Record<C,
  undefined
  |string
  //TODO `|boolean`
>

type ClassName = {
  className: string
  toString: () => string
}

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
): O extends string ? string : ClassName;
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
): O extends string ? string : ClassName;
function classNaming(...args: any[]) {
  return _classNaming(args.pop(), args.pop())
}

function _classNaming(
  classNames: ClassNamesMap<string>,
  className: undefined|string
): ClassName {
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
