import { dehash, truthyKeys } from "./core";

describe(dehash.name, () => {
  it("demo", () => expect(dehash({
    string: "hash", "hashless": undefined,
    "zero": 0, "one": 1,
    "false": false, "true": true,
    "array": [], "object": {}
  })).toStrictEqual([
    "hash", "hashless",
    "zero", "one",
    "false", "true",
    "array", "object"    
  ]))
})


describe(truthyKeys.name, () => {
  it("object", () => expect(truthyKeys({
    "true": true,
    undefined,
    "null": null,
    "false": false,
    "0": 0,
    "empty string": "",
    "1": 1,
    "string": "string",
    "[]": [],
    "{}": {},

  })).toStrictEqual([
    "1", "true", "string", "[]", "{}"
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
