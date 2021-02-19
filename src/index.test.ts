import classNaming from ".";

describe("demo",() => {
  it("basic", () => expect(
    {...classNaming("propagate", {
      "hashed": "Hash",
      "notHashed": undefined,
      //@ts-expect-error
      "UnknownValueType": [],
      //@ts-expect-error
      "false_is_also_unknown": false
    })}
  ).toStrictEqual({
    "className": "propagate Hash notHashed UnknownValueType false_is_also_unknown"
  }))
  
  it("to string", () => expect(
    `${classNaming({"class": undefined})}`
  ).toBe(
    "class"
  ))
  
  it("callback for toggling", () => expect(
    {...classNaming("propagate", {
        "class": undefined,
        "class--on": undefined,
        "class--off": undefined,
        "class2": undefined
    })({
      "class--on": true,
      "class--off": false,
      //@ts-expect-error
      "class--": true,
    })
  }).toStrictEqual({
    "className": "propagate class--on"
  }))
})

it("with start", () => expect({...classNaming(
  "propagated",
  {"class": undefined}
)}).toStrictEqual({
  "className": "propagated class"
}))

it("with `undefined` start", () => expect({...classNaming(
  undefined,
  {"class": undefined}
)}).toStrictEqual({
  "className": "class"
}))

it("No trim, no dedup", () => expect({...classNaming(
  " Dup  Dup ",
  {
    " Dup ": undefined,
    "": " Dup "
  }
)}).toStrictEqual({
  "className": " Dup  Dup   Dup   Dup "
}))

it("with empties", () => expect({...classNaming(
  " ",
  {}
)}).toStrictEqual({
  "className": "  "
}))

it("in `.join`", () => expect(
    [
    "class1",
    classNaming({"class2": undefined}),
    "class3"
  ].join(" ")
).toBe(
  "class1 class2 class3"
))


describe("in sum", () => {
  it("expected", () => expect(
    "class1" + classNaming({"class2": undefined}) + "class3"
  ).toBe(
    "class1class2class3"
  ))

  describe("if extended", () => {
    const output = classNaming({"class2": undefined})
    , {className} = output

    Object.defineProperty(output, "valueOf", {
      "value": () => ` ${className} `
    })

    it("in sum", () => expect(
      "class1" + output + "class3"
    ).toBe(
      "class1 class2 class3"
    ))

    it("as string calls valueOf", () => expect(
      `${output}`
    ).toBe(
      " class2 "
    ))

  })
})
