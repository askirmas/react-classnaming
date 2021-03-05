import classNaming from "../src/naming";

const classnames = {
  "class3": "hash3",
  "class4": "hash4",
} as unknown as Record<"class1"|"class2"|"class3"|"class4", string|undefined>
, className = "App"

describe("empty call", () => {
  it("classnames", () => expect({
    ...classNaming(
      {classnames}
    )()
  }).toStrictEqual({
    className: ""
  }))

  it("classnames + className", () => expect({
    ...classNaming(
      {classnames, className}
    )()
  }).toStrictEqual({
    className: ""
  }))

  it("className - wrong usage", () => expect({
    ...classNaming(
      //@ts-expect-error
      {className}
    )()
  }).toStrictEqual({
    className: ""
  }))

  it("empty - wrong usage", () => expect({
    ...classNaming(
      //@ts-expect-error
      {}
    )()
  }).toStrictEqual({
    className: ""
  }))
})

describe("toggling", () => {
  describe("classnames", () => {
    const classes = classNaming({classnames})

    it("redundant in map", () => expect({
      ...classes({
        class1: true,
        //@ts-expect-error Object literal may only specify known properties, and 'etc' does not exist 
        etc: true
      })
    }).toStrictEqual({
      className: "class1 etc"
    }))    
  })

  describe("className + classnames", () => {
    const classes = classNaming({className, classnames})
    
    it("only propagated", () => expect({
      ...classes(true)
    }).toStrictEqual({
      className
    }))

    it("without propagation", () => expect({
      ...classes({ class1: true, class4: true })
    }).toStrictEqual({
      className: "class1 hash4"
    }))

    it("both", () => expect({
      ...classes(true, { class1: true, class4: true })
    }).toStrictEqual({ 
      className: "App class1 hash4"
    }))
  })

  it("chained", () => {
    const classes = classNaming({classnames})
    , call1 = classes({class1: true})
    , call2 = call1({class2: true})
    //@ts-expect-error
    , call3 = call2({class1: false})

    expect({...call3({class3: true})}).toStrictEqual({
      className: "class1 class2 hash3"
    })
  })
})
