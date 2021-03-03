import classNaming from "."
const module_css = {
  class1: "hash1",
  class2: "hash2"
}

describe("#11 className control", () => {
  it("no className", () => {
    const classes = classNaming()
    //@ts-expect-error
    , call1 = classes(true)
    , call2 = classes()
    //@ts-expect-error
    , call3 = call2(true)

    expect([
      {...call1},
      {...call3}
    ]).toStrictEqual([
      {className: ""},
      {className: ""}
    ])
  })
  it("className double use", () => {
    const classes = classNaming({className: "class", classnames: {}})
    , call1 = classes()
    , call2 = call1(true)
    //@ts-expect-error #11
    , call3 = call2(true)

    expect({...call3(
      //@ts-expect-error #11
      true
    )}).toStrictEqual({
      className: "class class class"
    })
  })
})

describe("falsy", () => {
  const classes = classNaming({classnames: module_css})
  , nullish: null | boolean = null

  it("null", () => expect({...classes(nullish && {class1: true})}).toStrictEqual({
    className: ""
  }))
})