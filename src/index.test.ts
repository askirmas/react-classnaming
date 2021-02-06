import classNaming from ".";

it("demo", () => expect(classNaming(
  {
    "hashed": "Hash",
    "notHashed": undefined,
    //@ts-expect-error
    "UnknownValueType": []
  }
)).toStrictEqual({
  "className": "Hash notHashed UnknownValueType"
}))

it("as string", () => expect(
  `${classNaming({"class": undefined})}`
).toBe(
  "class"
))

it("with start", () => expect(classNaming(
  "propagated",
  {"class": undefined}
)).toStrictEqual({
  "className": "propagated class"
}))

it("with `undefined` start", () => expect(classNaming(
  undefined,
  {"class": undefined}
)).toStrictEqual({
  "className": "class"
}))

it("No trim, no dedup", () => expect(classNaming(
  " Dup  Dup ",
  {
    " Dup ": undefined,
    "": " Dup "
  }
)).toStrictEqual({
  "className": " Dup  Dup   Dup   Dup "
}))
