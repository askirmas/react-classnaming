import type { ClassNamed, ClassHash } from "./types"
import type { Falsy } from "./ts-swiss.defs"
import { EMPTY_ARRAY } from "./consts.json"

const {
  defineProperty: $defineProperty
} = Object
, stringifyProperty: SymbolConstructor["toPrimitive"] | "valueOf" | "toString"  = Symbol.toPrimitive
, StringifyDescriptor = {value: classNamedToString}

export {
  wrapper,  
  resolver,
  picker,
  joinWithLead,
  stringifyClassNamed
}

function wrapper<T>(
  destination: T,
  className: undefined | string
) {
  //@ts-expect-error
  destination["className"] = className
  
  return stringifyClassNamed(destination as T & ClassNamed)
}

function picker(
  vocabulary: undefined | Record<string, ClassHash>,
  keys: string[]
) {
  if (!vocabulary)
    return keys

  for (let i = keys.length; i--;) {
    const key = keys[i]
    , val = vocabulary[key]
    
    if (val !== undefined)
      keys[i] = val
  }

  return keys
}

function resolver(
  vocabulary: undefined | Record<string, ClassHash>,
  actions: Record<string, ClassHash | boolean>
) {
  // https://jsbench.me/q8kltjsdwy
  const $return: string[] = []

  // https://jsbench.me/prkm3gn4ji
  for (const key in actions) {
    const act = actions[key]

    if (act === undefined || act === true)
      // https://jsbench.me/p3km3fg4e7
      $return.push(key)
    else if (act)
      // https://jsbench.me/p3km3fg4e7
      $return.push(act)
  }

  return $return.length === 0
  ? EMPTY_ARRAY
  : picker(vocabulary, $return)
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

// Ref: 1
function stringifyClassNamed<T extends ClassNamed>(source: T) :T {
  if (!source.hasOwnProperty(stringifyProperty))
    $defineProperty(source, stringifyProperty, StringifyDescriptor)
  
  return source
}

function classNamedToString(this: ClassNamed) {
  //TODO `?? ""`
  return this.className
}
