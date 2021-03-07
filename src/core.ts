import type { ClassNamed, ClassHash } from "./defs"
import type { Falsy } from "./ts-swiss"
import { EMPTY_ARRAY } from "./consts.json"
import { stringifyClassNamed } from "./utils"

const {keys: $keys} = Object

export {
  wrapper,  
  resolver,
  joinWithLead
}

function wrapper<T>(
  destination: T,
  className: undefined | string
) {
  //@ts-expect-error
  destination["className"] = className
  
  return stringifyClassNamed(destination as T & ClassNamed)
}

function resolver(
  vocabulary: undefined | Record<string, ClassHash>,
  actions: Record<string, ClassHash | boolean>
) {
  const keys = $keys(actions)

  for (let i = keys.length; i--;) {
    const key = keys[i]
    , act = actions[key]
    
    //TODO #10 Clarify what behaviour to implement

    if (act !== undefined && !act) {
      // https://jsbench.me/q8kltjsdwy/
      //@ts-expect-error
      keys[i] = false
      continue
    }

    const hash = vocabulary?.[key]
    if (hash !== undefined)
      keys[i] = hash
    else if (typeof act === "string")
      keys[i] = act
  }

  // https://jsbench.me/9mklnonq0m
  const filtered = keys.filter(x => x)

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
