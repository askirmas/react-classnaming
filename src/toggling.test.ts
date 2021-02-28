import classNaming from ".";

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
      {className}
    )()
  }).toStrictEqual({
    className
  }))

  it("empty - wrong usage", () => expect({
    ...classNaming(
      {}
    )()
  }).toStrictEqual({
    className: ""
  }))
})

describe("toggling", () => {
  describe("classnames", () => {
    const classes = classNaming({classnames})
    it("map", () => expect({
      //@ts-expect-error //TODO #11 Error on overload, not on object
      ...classes({
        class1: true,
        class2: false,
        //TODO //@ts-expect-error
        class3: "",
        //TODO #11 Recover @ts-expect-error Truthy not allowed by TS
        class4: 1,
      })
    }).toStrictEqual({
      className: "class1 hash4"
    }))

    it("redundant in map", () => expect({
      //@ts-expect-error //TODO #11 Error on overload, not on object
      ...classes({
        //TODO #11 Recover @ts-expect-error Object literal may only specify known properties, and 'etc' does not exist 
        etc: true
      })
    }).toStrictEqual({
      className: "etc"
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

  it("chained", () => expect({
    ...classNaming({classnames})(
      {class1: true}
    )({class2: true}
    )({class1: false}
    )({class3: true})
  }).toStrictEqual({
    className: "class1 class2 hash3"
  }))
})
