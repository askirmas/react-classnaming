import classNaming from "../src/naming"
const module_css = {
  class1: "hash1",
  class2: "hash2"
}

describe("#11 className control", () => {
  it("no className", () => {
    const classes = classNaming()
    //@ts-expect-error #11
    , call1 = classes(true)
    , call2 = classes()
    //@ts-expect-error #11
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

describe("#19 falsy", () => {
  const classes = classNaming({classnames: module_css})
  , nullish: null | boolean = null

  it("null", () => expect({...classes(nullish && {class1: true})}).toStrictEqual({
    className: ""
  }))
})

describe("#18", () => {
  const classes = classNaming({classnames: module_css})
  , title = "" as string
  , enabled = true as boolean
  
  it("string|boolean", () => expect({...classes({
      //@ts-expect-error #18
    class1: title && enabled
  })}).toStrictEqual({className: ""}))

  it("empty string", () => expect({...classes({
    //@ts-expect-error #18
    class1: ""
  })}).toStrictEqual({className: ""}))
})
