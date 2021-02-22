import { Component } from "react";
import type { ClassNamesProp, GetClassKeys, GetClassNames } from "./defs";

class ClassComponent0 extends Component<ClassNamesProp<"comp1"|"comp2">> {}

describe("GetClassKeys", () => {
  it("ClassComponent", () => {
    const suites: Record<string, GetClassKeys<typeof ClassComponent0>> = {
      "comp1": "comp1",
      "comp2": "comp2",
      //@ts-expect-error
      "bad": "xxx" 
    }
    expect(suites).toBeInstanceOf(Object)
  })

  it("no classNames", () => {
      const suites: Record<string, GetClassKeys<{}>> = {
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

