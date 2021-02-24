import { ClassValue } from "../defs"

export {}

// type Excluder<
//   S extends Record<string, ClassValue>,
//   E extends {[K in keyof S]?: ClassValue}
// > = { [P in Exclude<keyof S, keyof E>]: S[P]; }

// interface Exclusion<
//   S extends Record<string, ClassValue>
// > {
//   (source: S, ex: {[K in keyof S]?: ClassValue}): Excluder<S, typeof ex>
// }

function exclusion<
  E extends Record<string, ClassValue>,
  S extends Record<keyof E, ClassValue>
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

const source: Record<"a"|"b"|"c"|"d", ClassValue> = {a: "a", b: undefined, c: "c", d: undefined}

const step1 = exclusion(source, {a: "a", b: undefined})
, step2 = exclusion(step1, {"c": undefined})

export {step2}