import { ClassHash } from "../../src/types"

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
  E extends Record<string, ClassHash>,
  S extends Record<keyof E, ClassHash>
>(
  source: S, ex: E
): { [P in Exclude<keyof S, keyof E>]: S[P]; }
{
  const $return = {...source}
  for (const k in ex) {
    delete $return[k]
  }

  return $return
}

const source: Record<"a"|"b"|"c"|"d"|"e", ClassHash> = {a: "a", b: undefined, c: "c", d: undefined, e: undefined}

const step0 = exclusion(
  //@ts-expect-error Property 'z' is missing in type
  source,
  {z: undefined}
)
, answ0: typeof step0 = {
  whatever: true
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