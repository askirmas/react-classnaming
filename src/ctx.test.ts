import classNamingCtx from "./ctx";

describe(classNamingCtx.name, () => {
  const classnames = {
    "class3": "hash3",
    "class4": "hash4",
  } as unknown as Record<"class1"|"class2"|"class3"|"class4", string|undefined>
  , className = "App"

  describe("classnames", () => {
    const classes = classNamingCtx({classnames})
    it("map", () => expect({
      ...classes({
        class1: true,
        class2: false,
        class3: "",
        //@ts-expect-error Truthy not allowed by TS
        class4: 1,
      })
    }).toStrictEqual({
      className: "class1 hash4"
    }))

    it("redundant in map", () => expect({
      ...classes({
        //@ts-expect-error Object literal may only specify known properties, and 'etc' does not exist 
        etc: true
      })
    }).toStrictEqual({
      className: "etc"
    }))

    //TODO Raise TS error
    it("propagate absent className", () => expect({
      ...classes(true, {class1: true, class4: true})
    }).toStrictEqual({
      className: "class1 hash4"
    }))
  })

  describe("className + classnames", () => {
    const classes = classNamingCtx({className, classnames})
    
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

  it("only propagate classnames", () => expect({
    ...classNamingCtx(
      {classnames},
      {withClassNames: true}
    )()
  }).toStrictEqual({
    className: "",
    classnames
  }))

  describe("chained", () => {
    it("Cur", () => expect({
      //@ts-expect-error
      ...classNamingCtx({classnames})(
        {class1: true}
      )({class2: true}
      )({class1: false}
      )({class3: true})
    }).not.toStrictEqual({
      className: "class3"
    }))
    it("TBD", () => expect({
      //@ts-expect-error
      ...classNamingCtx({classnames})(
        {class1: true}
      )({class2: true}
      )({class1: false}
      )({class3: true})
    }).not.toStrictEqual({
      className: "class2 class3"
    }))
  })
})