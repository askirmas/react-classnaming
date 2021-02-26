import { EMPTY_ARRAY } from "./consts";
import {
  resolver,
  dehash,
  truthyKeys
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
    "",
    "null",
    "zero", "one",
    "true",
    "array", "object"    
  ]))

  it("with hash", () => expect(resolver(
    {
      string: "HASH", hashless: "hashness",
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
    "hash", "hashless",
    "",
    "null",
    "zero", "one",
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

describe(dehash.name, () => {
  it("all types", () => expect(dehash({
    string: "hash", "hashless": undefined,
    empty: "",
    null: null,
    zero: 0, one: 1,
    false: false, true: true,
    array: [], object: {},
  })).toStrictEqual([
    "hash", "hashless",
    "",
    "null",
    "zero", "one",
    "false", "true",
    "array", "object"    
  ]))
})


describe(truthyKeys.name, () => {
  it("all types", () => expect(truthyKeys({
    string: "hash", "hashless": undefined,
    empty: "",
    null: null,
    zero: 0, one: 1,
    false: false, true: true,
    array: [], object: {},
  })).toStrictEqual([
    "string",
    "one",
    "true",
    "array", "object"
  ]))

  it("truthy primitive", () => expect(truthyKeys(
    true
  )).toStrictEqual(
    [true]
  ))

  it("falsy primitive", () => expect(truthyKeys(
    false
  )).toStrictEqual(
    []
  ))
})
