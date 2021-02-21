import { classNamingCtx } from ".";

describe(classNamingCtx.name, () => {
  const classNames = {
    "class3": "hash3",
    "class4": "hash4",
  } as unknown as Record<"class1"|"class2"|"class3"|"class4", string|undefined>
  , className = "App"

  describe("classNames", () => {
    const classes = classNamingCtx({classNames})
    it("map", () => expect(classes(
      {
        class1: true,
        class2: false,
        class3: "",
        //@ts-expect-error Truthy not allowed by TS
        class4: 1,
      }
    )).toStrictEqual({
      className: "class1 hash4"
    }))

    it("array", () => expect(classes(
      true && "class1",
      false && "class2",
      "" && "class3",
      1 && "class4"
    )).toStrictEqual({
      className: "class1 hash4"
    }))

    it("map + array", () => expect(classes(
      {
        class1: false,
        class4: true
      },
      "class1",
      false && "class4"
    )).toStrictEqual({
      className: "hash4 class1"
    }))

    it("redundant in map", () => expect(classes({
      //@ts-expect-error Object literal may only specify known properties, and 'etc' does not exist 
      etc: true
    })).toStrictEqual({
      className: "etc"
    }))
    
    it("redundant in array", () => expect(classes(
      //@ts-expect-error Argument of type '"etc"' is not assignable
      "etc"
    )).toStrictEqual({
      className: "etc"
    }))

    //TODO Raise TS error
    it("propagate absent className", () => expect(classes(
      true,
      {class1: true},
      "class4"
    )).toStrictEqual({
      className: "class1 hash4"
    }))
  })

  describe("className + classNames", () => {
    const classes = classNamingCtx({className, classNames})
    it("only propagated - trailing space", () => expect(classes(
      true
    )).toStrictEqual({
      className: `${className} `
    }))

    it("without propagation", () => expect(classes(
      "class1",
      "class4"
    )).toStrictEqual({
      className: "class1 hash4"
    }))

    it("both", () => expect(classes(
      true,
      "class1",
      "class4"
    )).toStrictEqual({ 
      className: "App class1 hash4"
    }))
  })
})