import classNaming from "."

it("classnames === null", () => expect({
  //@ts-expect-error
  ...classNaming({classnames: null})({classnames: true})
}).toStrictEqual({
  className: "classnames"
}))