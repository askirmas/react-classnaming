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
  it("called", () => expect({
    ...output({
      class3: undefined, class4: "hash4"
    })
  }).toStrictEqual({
    "className": `${className} class3 hash4`
  }))
  it("called is strigable", () => expect(
    `${output({
      class3: undefined, class4: "hash4"
    })}`
  ).toBe(
    `${className} class3 hash4`
  ))
})

function direct<T extends Record<string, ClassValue>>(classes: T, propagate?: string) {
  const className = joinWithLead(propagate, dehash(classes))  
  , host = (classes: Record<string, ClassValue>) => direct(classes, className)

  host["className"] = className
  stringifyClassNamed(host)

  return host
}