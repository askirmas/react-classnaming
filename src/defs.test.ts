import { Component } from "react";
import type { ClassNamesProp, GetClassKeys } from "./defs";

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
})
