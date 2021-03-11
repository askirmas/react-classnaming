import { ClassHash } from "../../src/main.types";

const source = {a: "a", b: undefined}
, called = k.call(source)
//... @ts-expect-error
, key: typeof called[number] = "z"

export {key}

function k<K extends string, T extends Record<K, ClassHash>>(
  this: T
// or `K` - whatever
): (keyof T)[] {
  //@ts-expect-error
  return Object.keys(this)
}