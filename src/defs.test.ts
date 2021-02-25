import type { GetClassNames } from "./defs";

describe("GetClassNames", () => {
  it("props without classnames", () => {
    const suites: Record<string, GetClassNames<{}>> = {
      //@ts-expect-error is not assignable to type 'never'
      "undefined": undefined,
      //@ts-expect-error is not assignable to type 'never'
      "false": false,
      //@ts-expect-error is not assignable to type 'never'
      "null": null,
      //@ts-expect-error is not assignable to type 'never'
      "": "",
      //@ts-expect-error is not assignable to type 'never'
      "0": 0,
      //@ts-expect-error is not assignable to type 'never'
      "{}": {}
    }
    expect(suites).toBeInstanceOf(Object)
  })
})
