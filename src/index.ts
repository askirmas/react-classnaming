const {keys: $keys} = Object
, classNameKey = "className"

export type ClassNames<C extends string> = Record<C, string|undefined>

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

  return {
    [classNameKey]: keys
    .join(" ")
  }
}