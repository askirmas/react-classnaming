import { EMPTY_ARRAY } from "./consts"
import type { ClassNamed, ClassHash, Falsy } from "./defs"
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
      //TODO Consider assign to false
      delete keys[i]
      continue
    }

    const hash = vocabulary?.[key]
    if (hash !== undefined)
      keys[i] = hash
    else if (typeof act === "string")
      keys[i] = act
  }

  // https://measurethat.net/Benchmarks/Show/11866/1/arrayfilter
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
