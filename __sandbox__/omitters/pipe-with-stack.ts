import { ClassHash } from "../../src/types"

type tExcluder2<
  S extends Record<string, ClassHash>,
  U extends {[K in keyof S]?: ClassHash}
>
= (
  <E extends {[K in Exclude<keyof S, U>]?: ClassHash}>(exclude: E) =>
  //  keyof E extends keyof S ?
   { [P in Exclude<keyof S, keyof E | U>]: ClassHash; }
    & tExcluder2<
      S,
      {[K in keyof E | keyof U]: ClassHash}
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

  return host as tExcluder2<S, {[K in keyof E]: ClassHash}>
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
  //@ts-expect-error //TODO
  "output": {d: "", e: ""},
  "unknown": {
    //@ts-expect-error
    unknown: ""
  },
  //@ts-expect-error
  "lost": {
    d: ""
  },
  //@ts-expect-error //TODO
  "previously ommited": {
    d: "", e: "",
    //TODO @ts-expect-error
    a: ""
  }
}

export {answ0, step3, checks}