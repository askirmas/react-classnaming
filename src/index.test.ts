import classNaming from "."

describe("#11 className control", () => {
  it("no className", () => {
    const classes = classNaming()
    //TODO #11 @ts-expect-error
    , call1 = classes(true)
    , call2 = classes()
    //TODO #11 @ts-expect-error
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
    //TODO #11 @ts-expect-error
    , call3 = call2(true)

    expect({...call3}).toStrictEqual({
      className: "class class"
    })
  })
})
