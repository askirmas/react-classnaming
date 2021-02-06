import type {HTMLAttributes} from "react"
import classNaming from "."

it("TypeScript manipulations", () => {

  createElement(
    classNaming({"class1": undefined})
  )

  createElement(
    {
      //@ts-expect-error //TODO
      "className": classNaming({"class1": undefined})
    }
  )

  expect(true).toBe(true)
})

function createElement(props: HTMLAttributes<HTMLElement>) {
  return props
}