import { EMPTY_ARRAY } from "./consts"
import type { ClassNamed, ClassHash, Falsy } from "./defs"
import { stringifyClassNamed } from "./utils"

const classNameKey = "className" as const

const {keys: $keys} = Object

export {
  wrapper,  
  // replacer of `dehash` and `truthyKeys` 
  resolver,
  joinWithLead
}

function wrapper<T>(
  destination: T,
  className: undefined | string
) {
  //@ts-expect-error
  destination[classNameKey] = className
  
  return stringifyClassNamed(destination as T & ClassNamed)
}

function resolver(
  vocabulary: undefined | Record<string, ClassHash>,
  actions: Record<string, ClassHash | boolean>
  // actions: Record<string, ClassHash> | Record<string, boolean>
) {
  const keys = $keys(actions)

  for (let i = keys.length; i--;) {
    const key = keys[i]
    , act = actions[key]
    
    //TODO clarify what behaviour to implement

    if (act !== undefined && !act) {
      delete keys[i]
      continue
    }

    const hash = vocabulary?.[key]
    if (hash !== undefined)
      keys[i] = hash
    else if (typeof act === "string")
      keys[i] = act
  }

  //TODO Compare `.flat()`, `.filter(Boolean)` or `.filter(idfn)`
  const filtered = keys.filter(Boolean)

  return filtered.length === 0 ? EMPTY_ARRAY : filtered
}

//TODO Consider returning `undefined` on empty string
function joinWithLead(value: Falsy|ClassHash, arr: undefined | string | readonly string[]) : string {
  const str1 = value || ""
  if (!(arr && arr.length))
    return str1
  
  const str2 = typeof arr === "string" ? arr : arr.join(" ")
  if (!str1)
    return str2

  return `${str1} ${str2}`
}