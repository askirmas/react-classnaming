import type {BemQuery} from "./bem.types"

describe("BemQuery", () => {
  it("block", () => {
    const checks: Record<string, BemQuery<"block">> = {
      //@ts-expect-error
      "number": {block: 1},
      "true": {block: true},
      //@ts-expect-error
      "{}": {block: {}},
    }
    expect(checks).toBeInstanceOf(Object)
  })

  it("block__el", () => {
    const checks: Record<string, BemQuery<"block__el">> = {
      //@ts-expect-error
      "number": {block: 1},
      "true": {block: true},
      "{}": {block: {}},
      //@ts-expect-error
      "el=1": {block: {el: {}}},
      "el": {block: {el: true}}
    }
    expect(checks).toBeInstanceOf(Object)
  })

  it("block__el--mod", () => {
    const checks: Record<string, BemQuery<"block__el--mod">> = {
      //@ts-expect-error
      "number": {block: 1},
      "true": {block: true},
      "{}": {block: {}},
      //@ts-expect-error
      "el=1": {block: {el: 1}},
      "el": {block: {el: true}},
      "el: mod": {block: {el: "mod"}},
      "el: -mod": {block: {el: {mod: false}}},
      "el: +mod": {block: {el: {mod: true}}}
    }
    expect(checks).toBeInstanceOf(Object)
  })  

  it("block__el--mod--val", () => {
    const checks: Record<string, BemQuery<"block__el--mod--val">> = {
      //@ts-expect-error
      "number": {block: 1},
      "true": {block: true},
      "{}": {block: {}},
      //@ts-expect-error
      "el=1": {block: {el: 1}},
      "el": {block: {el: true}},
      //@ts-expect-error
      "el: mod": {block: {el: "mod"}},
      "el: -mod": {block: {el: {mod: false}}},
      //@ts-expect-error
      "el: +mod": {block: {el: {mod: true}}},
      "el: mod=val": {block: {el: {mod: "val"}}}
    }
    expect(checks).toBeInstanceOf(Object)
  })  

  it("block--mod", () => {
    const checks: Record<string, BemQuery<"block--mod">> = {
      //@ts-expect-error
      "number": {block: 1},
      "true": {block: true},
      "mod": {block: "mod"},
      "{}": {block: {}},
      //@ts-expect-error
      "el": {block: {el: true}},
      "$": {block: {$: true}},
      "$: mod": {block: {$: "mod"}},
      "$: +mod": {block: {$: {mod: true}}},
      "$: -mod": {block: {$: {mod: false}}},
    }
    expect(checks).toBeInstanceOf(Object)
  })  

  it("block--mod--val", () => {
    const checks: Record<string, BemQuery<"block--mod--val">> = {
      //@ts-expect-error
      "number": {block: 1},
      "true": {block: true},
      //@ts-expect-error
      "mod": {block: "mod"},
      "{}": {block: {}},
      //@ts-expect-error
      "el": {block: {el: true}},
      "$": {block: {$: true}},
      //@ts-expect-error
      "$: mod": {block: {$: "mod"}},
      //@ts-expect-error
      "$: mod--val": {block: {$: "mod--val"}},
      //@ts-expect-error
      "$: +mod--val": {block: {$: {"mod--val": true}}},
      //@ts-expect-error
      "$: -mod--val": {block: {$: {"mod--val": false}}},
      "$: -mod": {block: {$: {mod: false}}},
      //@ts-expect-error
      "$: +mod": {block: {$: {mod: true}}},
      "$: mod=val": {block: {$: {mod: "val"}}},
    }
    expect(checks).toBeInstanceOf(Object)
  })  

  it("mix #1", () => {
    const checks: Record<string, BemQuery<
    `${"block" | "block__el"}--${"mod1"|"mod2--val1"|"mod2--val2"}`
    >> = {
      "exact": {
        block: {
          $: {"mod1": true},
          el: {
            mod1: false,
            mod2: "val1"
          }
        }
      }
    }
    expect(checks).toBeInstanceOf(Object)
  })
})
