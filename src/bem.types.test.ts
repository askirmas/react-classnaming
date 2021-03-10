import type {BemQuery} from "./bem.types"

describe("BemQuery", () => {
  it("block", () => {
    const checks: Record<string, BemQuery<"block">> = {
      //TODO @ts-expect-error
      "number": {block: 1}
    }
    expect(checks).toBeInstanceOf(Object)
  })

  it("block__el", () => {
    const checks: Record<string, BemQuery<"block__el">> = {
      //@ts-expect-error
      "number": {block: 1},
      //TODO @ts-expect-error
      "true": {block: true},
      "el": {block: {el: true}},
      "el == 1": {block: {el: 1}},
      "$...": {block: {$: {"a": 1}}},
    }
    expect(checks).toBeInstanceOf(Object)
  })
})