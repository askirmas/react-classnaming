import { EMPTY_ARRAY } from "../src/consts.json";
import {
  resolver,
} from "../src/core";

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
      empty: "empty", 
      null: "null",
      zero: "zero", one: "ONE",
      false: "false", true: "TRUE",
      array: "ARRAY", object: "OBJECT"
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
    "ONE",
    "TRUE",
    "ARRAY", "OBJECT"    
  ]))

  it("nothing is falsy", () => expect(resolver(
    undefined,
    {}
  )).toBe(
    EMPTY_ARRAY
  ))
})
