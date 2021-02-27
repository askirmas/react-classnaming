import classNaming from "./ctx";

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

  it("className", () => expect({
    ...classNaming(
      {className}
    )()
  }).toStrictEqual({
    className
  }))

  it("empty", () => expect({
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
      ...classes({
        class1: true,
        class2: false,
        //TODO //@ts-expect-error
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

    
    it("propagate absent className", () => expect({
      ...classes(
        //TODO Raise TS error
        true,
        {class1: true, class4: true}
      )
    }).toStrictEqual({
      className: "class1 hash4"
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

it("TBD no duplication on TS level", () => {
  const {class1, class2} = classnames
  , cn = classNaming({classnames})
  , call1 = cn({class1})
  , call2 = call1({class2})
  //TODO //@ts-expect-error
  , call3 = call2({class1})

  expect({
    ...call3
  }).toStrictEqual({
    className: "class1 class2 class1"
  })
})
