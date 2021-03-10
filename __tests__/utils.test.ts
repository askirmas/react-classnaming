import { stringifyClassNamed } from "../src/utils";

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
