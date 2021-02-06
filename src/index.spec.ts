import type {HTMLAttributes} from "react"
import classNaming from "."

it("TypeScript manipulations", () => {

  React_createElement(
    classNaming({"class1": undefined})
  )

  React_createElement({
    ...classNaming({"class1": undefined})
  })

  React_createElement(
    {
      //@ts-expect-error
      "className": classNaming({"class1": undefined})
    }
  )

  expect(true).toBe(true)
})

function React_createElement(props: HTMLAttributes<HTMLElement>) {
  return props
}