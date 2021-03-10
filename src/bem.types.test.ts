import type {BemQuery1, BemQuery2} from "./bem.types"

describe("BemQuery1", () => {
  it("block", () => {
    const checks: Record<string, BemQuery1<"block">> = {
      //TODO @ts-expect-error
      "number": {block: 1}
    }
    expect(checks).toBeInstanceOf(Object)
  })

  it("block__el", () => {
    const checks: Record<string, BemQuery1<"block__el">> = {
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

describe("BemQuery2", () => {
  it("block", () => {
    const checks: Record<string, BemQuery2<"block">> = {
      //@ts-expect-error
      "number": {block: 1},
      "true": {block: true},
      //@ts-expect-error
      "{}": {block: {}},
    }
    expect(checks).toBeInstanceOf(Object)
  })

  it("block__el", () => {
    const checks: Record<string, BemQuery2<"block__el">> = {
      //@ts-expect-error
      "number": {block: 1},
      "true": {block: true},
      "{}": {block: {}},
      //@ts-expect-error
      "el=1": {block: {el: 1}},
      "el": {block: {el: true}}
    }
    expect(checks).toBeInstanceOf(Object)
  })

  it("block__el--mod", () => {
    const checks: Record<string, BemQuery2<"block__el--mod">> = {
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
    const checks: Record<string, BemQuery2<"block__el--mod--val">> = {
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
    const checks: Record<string, BemQuery2<"block--mod">> = {
      //@ts-expect-error
      "number": {block: 1},
      "true": {block: true},
      "{}": {block: {}},
      //@ts-expect-error
      "el": {block: {el: true}},
      //@ts-expect-error
      "$": {block: {$: true}},
      "$: mod": {block: {$: "mod"}},
      "$: +mod": {block: {$: {mod: true}}},
      "$: -mod": {block: {$: {mod: false}}},
    }
    expect(checks).toBeInstanceOf(Object)
  })  

  it("block--mod--val", () => {
    const checks: Record<string, BemQuery2<"block--mod--val">> = {
      //@ts-expect-error
      "number": {block: 1},
      "true": {block: true},
      "{}": {block: {}},
      //@ts-expect-error
      "el": {block: {el: true}},
      //@ts-expect-error
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

  it("everything", () => {
    const checks: Record<string, BemQuery2<
    `${"block" | "block__el"}--${"mod1"|"mod2--val1"|"mod2--val2"}`
    >> = {
      "exact": {
        block: {
          $: {
            mod1: true,
            mod2: "val1"
          },
          el: {
            mod1: false,
            //@ts-expect-error weird bug
            mod2: "val1"
          }
        }
      }
    }
    expect(checks).toBeInstanceOf(Object)
  })
})
