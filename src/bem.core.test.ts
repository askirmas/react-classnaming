import type {BemInGeneral} from "./bem.types"
import {
  bem2arr,
  setOptions
} from "./bem.core";

describe(bem2arr.name, () => {
  describe("singletons", () => {
    const suites: Record<string, [BemInGeneral, string][]> = {
      "singletons": [
        [{base: undefined  },  "base"],
        [{base: false      },  "base"],
        [{base: true       },  "base"],
        [{base: "mod"      },  "base base--mod"],
        [{base: ["mod"]    },  "base base--mod"],
        [{base: [false]    },  "base"],
        [{base: {}         },  "base"],
        [{base: {mod: false}}, "base"],
        [{base: {mod: true }}, "base base--mod"],
        [{base: {mod: "val"}}, "base base--mod--val"],  
      ],
    }

    Object.entries(suites).forEach(([title, launches]) => describe(title, () => launches
      .forEach(([query, output]) => it(
        JSON.stringify(query, (_, v) => v === undefined ? "`undefined`" : v),
        () => expect(bem2arr(query).join(" ")).toBe(output))
      )
    )) 
  })
})

describe("optioning", () => {
  afterAll(() => setOptions({
    elementDelimiter: "__",
    modDelimiter: "--",
  }))

  it("another mod", () => {
    setOptions({modDelimiter: "-"})
    expect(bem2arr({
      base: {mod: "val"}
    }).join(" ")).toBe(
      "base base-mod-val"
    )
  })

  it("another el", () => {
    //#Useful in #30
    setOptions({elementDelimiter: "_"})
    expect(true).toBe(true)
  })
})
