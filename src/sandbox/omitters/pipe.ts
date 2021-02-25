import { ClassValue } from "../../defs"

export {}

// Nope
// type tExcluder<S extends Record<string, ClassValue>>
// = (
//   <E extends{[K in keyof S]?: ClassValue}>(exclude: E) => typeof exclude extends Record<infer E, ClassValue>
//   ? { [P in Exclude<keyof S, keyof E>]: ClassValue; } & tExcluder<{ [P in Exclude<keyof S, keyof E>]: ClassValue; }>
//   : never
// );


// type tExcluder<S extends Record<string, ClassValue>>
// = (
//   <E extends Record<string, ClassValue>>(exclude: E) => { [P in Exclude<keyof S, keyof E>]: ClassValue; }
//   & tExcluder<{ [P in Exclude<keyof S, keyof E>]: ClassValue; }>
// );

type tExcluder<S extends Record<string, ClassValue>>
= (
  <E extends Record<string, ClassValue>>(exclude: E) => keyof E extends keyof S
  ? { [P in Exclude<keyof S, keyof E>]: ClassValue; }
    & tExcluder<{ [P in Exclude<keyof S, keyof E>]: ClassValue; }>
  : {[P in Exclude<keyof E, keyof S>]: never;}
);

function exclusion<
  S extends Record<string, ClassValue>,
  E extends {[K in keyof S]?: ClassValue}
>(
  source: S, ex: E
) {

  const filtered = {...source}
  for (const k in ex) {
    delete filtered[k]
  }
  
  const host = (
    e: { [P in Exclude<keyof S, keyof E>]?: ClassValue; }
  ) => exclusion(
    filtered as { [P in Exclude<keyof S, keyof E>]: ClassValue; },
    e
  )

  for (const key in filtered)
    //@ts-expect-error
    host[key]
    = filtered[key]

  return host as tExcluder<{ [P in Exclude<keyof S, keyof E>]: ClassValue; }>
}

const source: Record<"a"|"b"|"c"|"d"|"e", ClassValue> = {a: "a", b: undefined, c: "c", d: undefined, e: undefined}

const step0 = exclusion(
  source,
  //@ts-expect-error 'z' does not exist in type
  {z: undefined}
)
, answ0: typeof step0 = {
  //@ts-expect-error
  whatever: true
}
, step1 = exclusion(source, {a: "a", b: undefined})

//@ts-expect-error
step1({"c": undefined, "z": undefined})
()

const step2 = step1({"c": undefined})
//@ts-expect-error
, {c} = step2
, step3 = {...step2({
  "z": ""
})}
, key: keyof typeof step3 = "z"
//@ts-expect-error Property 'd' is missing
, answ
: typeof step2 = {
  e: "",
  //@ts-expect-error Object literal may only specify known properties, and 'z'
  z: ""
}
export {step2, answ0, key}