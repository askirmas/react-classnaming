const {keys: $keys, defineProperty: $defineProperty} = Object
, classNameKey = "className"

export type ClassNames<C extends string> = Record<C,
  undefined
  |string
  //TODO `|boolean`
>

export default classNaming

function classNaming<C extends string>(classNames: ClassNames<C>) {
  const keys = $keys(classNames)
  , {length} = keys

  for (let i = length; i--;) {
    const key = keys[i] as C
    , value = classNames[key]

    if (typeof value === "string")
      keys[i] = value
  }

  const classString = keys
  .join(" ")
  , $return = {
    [classNameKey]: classString
  }

  $defineProperty($return, "toString", {
    value: () => classString
  })

  return $return
}