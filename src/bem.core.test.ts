import {BemAbsraction, BemOptions, getOptions, setOptions} from "./bem.core";
import {
  bem2arr
} from "./bem.core";

describe(bem2arr.name, () => {
  describe("singletons", () => {
    const suites = {
      "block singleton": [
        [{block: false           },   ""],
        [{block: true            },   "block"],
        [{block: {}              },   "" /* or "block" */],
        [{block: {$:  undefined  }},  "block"],
        [{block: {$:  false      }},  "block"],
        [{block: {$:  {          }}}, "block"],
        [{block: {$:  {mod: false}}}, "block"],
        [{block: {$:  {mod: true }}}, "block block--mod"],
        [{block: {$:  {mod: ""   }}}, "block"],
        [{block: {$:  {mod: "val"}}}, "block block--mod--val"],  
      ],
      "element singleton": [
        [{block: {el: false      }},  ""],
        [{block: {el: true       }},  "block__el"],
        [{block: {el: {}         }},  "block__el"],
        [{block: {el: {mod: false}}}, "block__el"],
        [{block: {el: {mod: true }}}, "block__el block__el--mod"],
        [{block: {el: {mod: ""   }}}, "block__el"],
        [{block: {el: {mod: "val"}}}, "block__el block__el--mod--val"],  
      ],
      "block and el combine": [
        [{block: {
          $: {mod: true},
          el: true               }},  "block block--mod block__el"]
      ]
    } as Record<string, [BemAbsraction<"$">, string][]>

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
    blockModKey: "$"
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
    const opts: BemOptions = {
      elementDelimiter: "_",
      modDelimiter: "-",
      blockModKey: "$"
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