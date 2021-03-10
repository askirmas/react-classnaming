import { EMPTY_ARRAY } from "../src/consts.json";
import {
  picker,
  resolver,
} from "../src/core";

describe(picker.name, () => {
  it("without hash", () => expect(picker(
    undefined,
    ["class1", "class2", "class3"]
  )).toStrictEqual(
    ["class1", "class2", "class3"]
  ))

  it("without hash", () => expect(picker(
    {class1: undefined, class3: "hash3", class4: "hash4"},
    ["class1", "class2", "class3"]
  )).toStrictEqual(
    ["class1", "class2", "hash3"]
  ))
})

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
    1,
    "true",
    [], {}
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
    "hash", "HASHNESS",
    1,
    "TRUE",
    [], {}
  ]))

  it("nothing is falsy", () => expect(resolver(
    undefined,
    {}
  )).toBe(
    EMPTY_ARRAY
  ))
})
