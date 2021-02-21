import { EMPTY_ARRAY } from "./consts"
import type { Falsy } from "./defs"

const stringifyProperty: SymbolConstructor["toPrimitive"] | "valueOf" | "toString"  = Symbol.toPrimitive

const {
  keys: $keys,
  defineProperty: $defineProperty
} = Object

export {
  truthyKeys, stringifyClassNamed, emptize
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

function stringifyClassNamed<T extends {className: string}>(source: T) :T {
  if (!source.hasOwnProperty(stringifyProperty))
    $defineProperty(source, stringifyProperty, {value: classNamedToString})
  
  return source
}

function classNamedToString(this: {className: string}) {
  return this.className
}

function emptize(source: undefined|Record<string, any>) {
  if (
    source
    && !source.hasOwnProperty(stringifyProperty)
  )
    $defineProperty(source, stringifyProperty, {value: emptyLambda})
  return source
}

function emptyLambda() {
  return "" as const
}
