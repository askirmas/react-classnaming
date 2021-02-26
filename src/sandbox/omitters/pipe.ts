import { ClassHash } from "../../defs"

export {}

// Nope
// type tExcluder<S extends Record<string, ClassHash>>
// = (
//   <E extends{[K in keyof S]?: ClassHash}>(exclude: E) => typeof exclude extends Record<infer E, ClassHash>
//   ? { [P in Exclude<keyof S, keyof E>]: ClassHash; } & tExcluder<{ [P in Exclude<keyof S, keyof E>]: ClassHash; }>
//   : never
// );


// type tExcluder<S extends Record<string, ClassHash>>
// = (
//   <E extends Record<string, ClassHash>>(exclude: E) => { [P in Exclude<keyof S, keyof E>]: ClassHash; }
//   & tExcluder<{ [P in Exclude<keyof S, keyof E>]: ClassHash; }>
// );

// type tExcluder<S extends Record<string, ClassHash>>
// = (
//   <E extends Record<string, ClassHash>>(exclude: E) => keyof E extends keyof S
//   ? { [P in Exclude<keyof S, keyof E>]: ClassHash; }
//     & tExcluder<{ [P in Exclude<keyof S, keyof E>]: ClassHash; }>
//   : {[P in Exclude<keyof E, keyof S>]: never;}
// );

type tExcluder<S extends Record<string, ClassHash>>
= (
  <E extends {[K in keyof S]?: ClassHash}>(exclude: E) =>
  //  keyof E extends keyof S ?
   { [K in Exclude<keyof S, keyof E>]: ClassHash; }
    & tExcluder<{ [P in Exclude<keyof S, keyof E>]: ClassHash; }>
  // : {[P in Exclude<keyof E, keyof S>]: never;}
);


function exclusion<
  S extends Record<string, ClassHash>,
  E extends {[K in keyof S]?: ClassHash}
>(
  source: S, ex: E
) {

  const filtered = {...source}
  for (const k in ex) {
    delete filtered[k]
  }
  
  const host = (
    e: { [P in Exclude<keyof S, keyof E>]?: ClassHash; }
  ) => exclusion(
    filtered as { [P in Exclude<keyof S, keyof E>]: ClassHash; },
    e
  )

  for (const key in filtered)
    //@ts-expect-error
    host[key]
    = filtered[key]

  return host as tExcluder<{ [P in Exclude<keyof S, keyof E>]: ClassHash; }>
}

const source: Record<"a"|"b"|"c"|"d"|"e", ClassHash> = {a: "a", b: undefined, c: "c", d: undefined, e: undefined}

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
  //@ts-expect-error
  "z": ""
})}
, result = {...step2}
, checks: Record<string, typeof result> = {
  "output": {d: "", e: ""},
  "unknown": {
    //@ts-expect-error
    unknown: ""
  },
  //@ts-expect-error
  "lost": {
    d: ""
  },
  "previously ommited": {
    d: "", e: "",
    //@ts-expect-error
    a: ""
  }
}

const unknown0 = exclusion({} as Record<string, ClassHash>, {a: "a"})
//todo @ts-error
, unknown1 = unknown0({a: "a"})

export {answ0, step3, checks, unknown1}