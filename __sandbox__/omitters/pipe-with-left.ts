import { ClassHash } from "../../src/main.types"

type tExcluder<
  Source extends Record<string, ClassHash>,
  Left extends Record<string, ClassHash> = Source,
  Used extends Record<string, ClassHash> = Record<never, ClassHash>,
>
= (
  <
    // E extends
    E extends {[K in keyof Left]?: K extends keyof Used ? never : ClassHash}
  >(exclude: E) =>
  //  keyof E extends keyof S ?
   { [K in Exclude<keyof Left, keyof E>]: ClassHash; }
    & tExcluder<
      Source,
      { [P in Exclude<keyof Left, keyof E>]: P extends keyof Used ? never : ClassHash; },
      { [P in keyof Used | keyof E]: ClassHash; }
    >
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

  return host as tExcluder<
    S,
    {[P in Exclude<keyof S, keyof E>]: ClassHash;},
    E
  >
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

// type Additinioze<A, T0, E = never> = {
//   [P in keyof A]: A[P] extends E ? T0 : A[P]
// }
// type Additional<K extends string, T1, T2, E = never> = Additinioze<AntiRecord<K, T2, true, E>, T1, E>
// type AntiRecord<R extends string, T, Strict extends boolean, E = never>
// = {[k: string]: T}
// & (
//   Strict extends true
//   ? {[k in R]: E }
//   : {[k in R]?: E }
// )
