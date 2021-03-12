import type {BemInGeneral} from "./bem.types"
import type {BemOptions} from "./bem.core";
import {
  bem2arr,
  getOptions,
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
        //@ts-expect-error //TODO #40
        [{base: ["mod"]    },  "base base--0--mod" /* TODO #40 "base base--mod"*/],
        //@ts-expect-error //TODO #40
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
  const defaultOpts: BemOptions = {
    elementDelimiter: "__",
    modDelimiter: "--",
  }

  it("default", () => expect(
    getOptions()
  ).toStrictEqual(
    defaultOpts
  ))

  it("set empty", () => expect((
    setOptions({}),
    getOptions()
  )).toStrictEqual(
    defaultOpts
  ))
    
  it("set another", () => {
    //TODO #29 test bem with not default options
    const opts: BemOptions = {
      elementDelimiter: "_",
      modDelimiter: "-",
    }
    setOptions(opts)

    expect(
      getOptions()
    ).toStrictEqual(
      opts
    )
  })

  it("revert to default", () => expect((
    setOptions(defaultOpts),
    getOptions()
  )).toStrictEqual(
    defaultOpts
  ))
})