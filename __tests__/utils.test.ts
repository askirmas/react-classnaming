import { emptize, stringifyClassNamed } from "../src/utils";

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