import { Component } from "react";
import type { ClassNamesStrict, GetClassNamesProp, GetClassKeys } from "./defs";

class ClassComponent extends Component<ClassNamesStrict<never, "comp1"|"comp2">> {}

describe("ClassNamesStrict", () => {
  it("<never, 'class1'|'class2'>", () => {
    const suites: Record<string, ClassNamesStrict<never, 'class1'|'class2'>> = {
      "good": {
        classNames: {
          class1: undefined,
          class2: undefined
        }
      }
    }
    expect(suites).toBeInstanceOf(Object)
  })
})

describe("GetClassNamesProp", () => {
  it("ClassComponent", () => {
    const suites: Record<string, GetClassNamesProp<typeof ClassComponent>> = {
      "good": {
        comp1: undefined,
        comp2: undefined
      }
    }
    expect(suites).toBeInstanceOf(Object)
  })
})


describe("GetClassKeys", () => {
  it("ClassComponent", () => {
    const suites: Record<string, GetClassKeys<typeof ClassComponent>> = {
      "comp1": "comp1",
      "comp2": "comp2",
      //@ts-expect-error
      "bad": "xxx" 
    }
    expect(suites).toBeInstanceOf(Object)
  })
})