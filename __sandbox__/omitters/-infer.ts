//@ts-nocheck 

import { ClassHash } from "../../src/main.types"

// type Excluder<
//   S extends Record<string, ClassHash>,
//   E extends {[K in keyof S]?: ClassHash}
// > = { [P in Exclude<keyof S, keyof E>]: S[P]; }

// interface Exclusion<
//   S extends Record<string, ClassHash>
// > {
//   (source: S, ex: {[K in keyof S]?: ClassHash}): Excluder<S, typeof ex>
// }

function exclusion<
  S extends Record<string, ClassHash>,
>(
  source: S, ex: {[K in keyof S]?: ClassHash}
): typeof ex extends Record<infer E, any>
? { [P in Exclude<keyof S, E>]: S[P]; }
: never
{
  const $return = {...source}
  for (const k in ex) {
    delete $return[k]
  }

  //@ts-expect-error
  return $return 
}

const source: Record<"a"|"b"|"c"|"d"|"e", ClassHash> = {a: "a", b: undefined, c: "c", d: undefined, e: undefined}

const step0 = exclusion(
  source,
  //@ts-expect-error 'z' does not exist in type
  {z: undefined}
)
, answ0: typeof step0 = {
  //@ts-expect-error Type 'undefined' is not assignable to type 'never'
  whatever: undefined
}
, step1 = exclusion(source, {a: "a", b: undefined})
, step2 = exclusion(step1, {"c": undefined})
//@ts-expect-error Property 'd' is missing
, answ
: typeof step2 = {
  e: "",
  //@ts-expect-error Object literal may only specify known properties, and 'z'
  z: ""
}
export {step2, answ0}