import { EMPTY_ARRAY } from "./consts"
import type { Falsy } from "./defs"

const {keys: $keys} = Object

export {
  truthyKeys,
  dehash
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
function truthyKeys<T extends Record<string, unknown>>(source: T): (
  {[K in keyof typeof source]: typeof source[K] extends Falsy ? never : K}[keyof typeof source]
)[];
function truthyKeys<T>(source: T): [T];
function truthyKeys<T>(source: T) {
  if (source === null || typeof source !== "object")
    return source
    ? [source]
    : EMPTY_ARRAY
    
  return ($keys(source) as (keyof T)[])
  .filter(key => source[key])
}
