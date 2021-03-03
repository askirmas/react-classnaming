import classNaming from "."


describe("#11 className control", () => {
  it("no className", () => {
    const classes = classNaming()

    expect({...classes(
      //TODO #11 @ts-expect-error
      true
    )}).toStrictEqual({
      className: ""
    })
  })
  it("className double use", () => {
    const classes = classNaming({className: "class", classnames: {}})
    expect({...classes(true)(
      //TODO #11 @ts-expect-error
      true
    )}).toStrictEqual({
      className: "class class"
    })
  })
})