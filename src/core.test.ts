import { EMPTY_ARRAY } from "./consts";
import {
  resolver,
} from "./core";

describe(resolver.name, () => {
  it("without hash", () => expect(resolver(
    undefined,
    {
      string: "hash", "hashless": undefined,
      empty: "",
      //@ts-expect-error
      null: null,
      //@ts-expect-error
      zero: 0, one: 1,
      false: false, true: true,
      //@ts-expect-error
      array: [], object: {},
    }
  )).toStrictEqual([
    "hash", "hashless",
    "one",
    "true",
    "array", "object"    
  ]))

  it("with hash", () => expect(resolver(
    {
      string: "HASH", hashless: "HASHNESS",
      true: "TRUE"
    },
    {
      string: "hash", "hashless": undefined,
      empty: "",
      //@ts-expect-error
      null: null,
      //@ts-expect-error
      zero: 0, one: 1,
      false: false, true: true,
      //@ts-expect-error
      array: [], object: {},
    }
  )).toStrictEqual([
    "HASH", "HASHNESS",
    "one",
    "TRUE",
    "array", "object"    
  ]))

  it("nothing is falsy", () => expect(resolver(
    undefined,
    {}
  )).toBe(
    EMPTY_ARRAY
  ))
})
