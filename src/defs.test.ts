import type { JSXElementConstructor } from "react";
import { Component } from "react";
import type { ClassNamesProp, ClassNamesStrict, GetClassKeys } from "./defs";

class ClassComponent0 extends Component<ClassNamesStrict<never, "comp1"|"comp2">> {}
class ClassComponent1 extends Component<ClassNamesStrict<true, never>> {}
class ClassComponent2 extends Component<ClassNamesStrict<true, "comp1"|"comp2">> {}

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
  it("ClassComponent0", () => {
    const suites: Record<string, ClassNamesStrict<never, never, typeof ClassComponent0>> = {
      "good": {
        classNames: {
          comp1: undefined,
          comp2: undefined,
          //@ts-expect-error Object literal may only specify known properties, and 'redundant' does not exist
          redundant: undefined
        }
      },
      "omitted": {
        //@ts-expect-error Property 'comp2' is missing in type
        classNames: {
          comp1: undefined,
        }
      }
    }
    expect(suites).toBeInstanceOf(Object)
  })
})

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
})

it("WithClassNames", () => {
  type WithClassNames = ClassNamesProp | JSXElementConstructor<ClassNamesProp>
  // | Component<ClassNamesProp> | (props: ClassNamesProp) => any

  const suites: Record<string, WithClassNames> = {
    ClassComponent0,
    //TODO
    //@ts-expect-error Property 'className' is missing
    ClassComponent1,
    //TODO
    //@ts-expect-error Property 'className' is missing
    ClassComponent2,
  }

  expect(suites).toBeInstanceOf(Object)
})