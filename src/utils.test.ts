import { emptize, stringifyClassNamed, truthyKeys } from "./utils";

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

describe(stringifyClassNamed.name, () => {
  it("works", () => expect(
    `${stringifyClassNamed({className: "className string"})}`
  ).toBe(
    "className string"
  ))
  it("no overwrite - for coverage", () => {
    const source = stringifyClassNamed({className: "className string"})
    expect(
      `${stringifyClassNamed(source)}`
    ).toBe(
      "className string"
    )
  })
})

describe(emptize.name, () => {
  it("default behavious", () => expect(
    `${{}}`
  ).toBe(
    "[object Object]"
  ))
  it("stringified", () => expect(
    `${emptize({})}`
  ).toBe(
    ""
  ))

  it("enumerable check", () => expect(
    emptize({})
  ).toStrictEqual(
    {}
  ))

  it("no overwrite - for coverage", () => {
    const source = emptize({})
    expect(
      emptize(source)
    ).toStrictEqual(
      {}
    )
  })
})