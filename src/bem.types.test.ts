import type {BemQuery} from "./bem.types"

describe("BemQuery", () => {
  it("block", () => {
    const {block} = {} as Record<string, undefined>

    const checks: Record<string, BemQuery<"block">> = {
      "true": {block: true},
      "undefined": {block},

      /** No modifier - couldn't be false as return of condition */
      //@ts-expect-error
      "false": {block: false},
      //@ts-expect-error 
      "{}": {block: {}},
    }
    expect(checks).toBeInstanceOf(Object)
  })

  it("block__el", () => {
    const checks: Record<string, BemQuery<"block__el">> = {
      "block__el": {block__el: true},
      /** `block` may be ommited in CSS post-processor but it exists in ontology  */
      "block": {block: true},
    }
    expect(checks).toBeInstanceOf(Object)
  })

  it("block--mod", () => {
    const checks: Record<string, BemQuery<"block--mod">> = {
      /** Numbers are not allowed */
      //@ts-expect-error 
      "0": {block: 0},
      //@ts-expect-error 
      "1": {block: 1},

      /** Possible Output of applied conditions for modifications */
      "false": {block: false},
      "{}": {block: {}}, 
      
      /** Possible mod apply options */
      "mod": {block: "mod"},
      "mod-": {block: {mod: false}},
      "mod+": {block: {mod: true}},
      "-mod": {block: false && {mod: true}},
    }
    expect(checks).toBeInstanceOf(Object)
  })  

  it("block--mod--val", () => {
    const checks: Record<string, BemQuery<"block--mod--val">> = {
      /** Modifier should have value */
      //@ts-expect-error
      "mod": {block: "mod"},
      //@ts-expect-error
      "mod+": {block: {mod: true}},

      /** Usage */
      "mod-": {block: {mod: false}},
      "mod: val": {block: {mod: "val"}},
    }
    expect(checks).toBeInstanceOf(Object)
  })  

  it("#40 array of midfiers", () => {
    type Single = BemQuery<"block--modB"|"block--modV--val">
    //@ts-expect-error
    const modB_string: Single = {block: ["modB"]}
    //@ts-expect-error
    , modB_obj: Single = {block: [{modB: true}]}
    //@ts-expect-error
    , modV_obj: Single = {block: [{modV: "val"}]}
  })
  
  it("mix #1", () => {
    const checks: Record<string, BemQuery<
    `${"block" | "block__el"}--${"mod1"|"mod2--val1"|"mod2--val2"}`
    >> = {
      "exact": {
        block: "mod1",
        block__el: {
          mod1: false,
          mod2: "val1"
        }
      }
    }
    expect(checks).toBeInstanceOf(Object)
  })
})
