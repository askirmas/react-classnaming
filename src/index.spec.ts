import type {HTMLAttributes} from "react"
import classNaming from "."

it("as object", () => expect(
  createElement(
    classNaming({"class1": undefined})
  )
).toStrictEqual({
  "className": "class1"
}))

it("TBD as string", () => expect(
  createElement(
    {
      //@ts-expect-error
      "className": classNaming({"class1": undefined})
    }
  )
//TODO
).not.toStrictEqual({
  "className": "class1"
}))

function createElement(props: HTMLAttributes<HTMLElement>) {
  return props
}