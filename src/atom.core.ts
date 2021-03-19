import type {AtomInGeneral} from "./atom.types"
import {EMPTY_ARRAY} from "./consts.json"

const {isArray: $isArray} = Array

const selfKey = "_"
, delimiter = "-"

export {
  atom2arr
}

function atom2arr(query: AtomInGeneral) {
  const classes: string[] = []

  for (const key in query) {
    const value = query[key]

    if (typeof value !== "object") {
      const className = value2class(key, value)
      className && classes.push(className)
      continue
    }

    const subValue = value2class(key, $isArray(value) ? value[0] : false)
    , subQuery = object2classes(key, $isArray(value) ? value[1] : value)

    subValue && classes.push(subValue)
    classes.push(...subQuery)
  }

  return classes
}

function object2classes(rootKey: string, subQuery: undefined|Record<string, boolean|number|string>) {
  if (!subQuery)
    return EMPTY_ARRAY
    
  const classes: string[] = []
  for (const key in subQuery) {
    const subValue = subQuery[key]
    , value = key === selfKey
    ? subValue
    : value2class(key, subValue)
    value && classes.push(`${rootKey}${delimiter}${value}`)
  }
  return classes
}

function value2class(property: string, value: boolean|number|string) {
  switch (value) {
    case false:
      return 
    case true:
      return property
    default:
      return `${property}${delimiter}${value}`
  }
}