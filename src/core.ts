import { EMPTY_ARRAY } from "./consts"
import type { ClassNamed, ClassValue, Falsy } from "./defs"
import { stringifyClassNamed } from "./utils"

const classNameKey = "className" as const

const {keys: $keys} = Object

export {
  wrapper,
  truthyKeys,
  dehash,
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

function dehash<K extends string>(source: Record<K, unknown>, keys: string[] = $keys(source)) :string[] {
  for (let i = keys.length; i--;) {
    const key = keys[i] as K
    , value = source[key]

    if (typeof value === "string")
      keys[i] = value
  }

  return keys
}

//TODO TS is not working interesting
function truthyKeys<T>(source: Falsy) :T[];
function truthyKeys<T extends Record<string, unknown>>(source: Readonly<T>): (
  {[K in keyof typeof source]: typeof source[K] extends Falsy ? never : K}[keyof typeof source]
)[];
function truthyKeys<T>(source: T): [T];
function truthyKeys<T>(source: T) {
  if (source === null || typeof source !== "object")
    return source
    ? [source]
    : EMPTY_ARRAY
    
  const filtered = (
    $keys(source) as (keyof T)[]
  )
  //TODO consider `delete` and further `flat` in case of perf
  .filter(key => source[key])

  return filtered
}

//TODO Consider returning `undefined` on empty string
function joinWithLead(value: Falsy|ClassValue, arr: undefined | string | readonly string[]) : string {
  const str1 = value || ""
  if (!(arr && arr.length))
    return str1
  
  const str2 = typeof arr === "string" ? arr : arr.join(" ")
  if (!str1)
    return str2

  return `${str1} ${str2}`
}