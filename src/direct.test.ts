import { dehash, joinWithLead } from "./core";
import { ClassValue } from "./defs";
import {stringifyClassNamed} from "./utils"

describe(direct.name, () => {
  const output = direct({class1: undefined, class2: "hash2"})
  , className = "class1 hash2"

  it("has classNames", () => expect(
    {...output}
  ).toStrictEqual(
    {className}
  ))
  it("stringable", () => expect(
    `${output}`
  ).toBe(
    className
  ))

  describe("chained", () => {
    const chained = output({
      class3: undefined, class4: "hash4"
    })
    , nextClassName = `${className} class3 hash4`
  
    it("called", () => expect({
      ...chained
    }).toStrictEqual({
      className: nextClassName
    }))
    it("called is strigable", () => expect(
      `${chained}`
    ).toBe(
      nextClassName
    ))
    it("TBD call is not allow by TS on key duplication", () => expect(
      //TODO //@ts-expect-error`
      `${chained({class1: undefined})}`
    ).toBe(
      `${nextClassName} class1`
    ))
  })
})

type ClassNamingChain = {
  className: string
  (classes: Record<string, ClassValue>): ClassNamingChain
}

function direct<T extends Record<string, ClassValue>>(classes: T, propagate?: string) {
  const className = joinWithLead(propagate, dehash(classes))  
  , host: ClassNamingChain = classes => direct(classes, className)

  host["className"] = className
  stringifyClassNamed(host)

  return host
}