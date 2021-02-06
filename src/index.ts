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

function classNaming<C extends string>(
  classNames: ClassNamesMap<C>
): ClassName;
function classNaming<C extends string>(
  className: undefined|string,
  classNames: ClassNamesMap<C>
): ClassName;
function classNaming(...args: any[]) {
  return _classNaming(args.pop(), args.pop())
}

function _classNaming<C extends string>(
  classNames: ClassNamesMap<C>,
  className: undefined|string
): ClassName {
  const keys = $keys(classNames)
  , {length} = keys

  for (let i = length; i--;) {
    const key = keys[i] as C
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
