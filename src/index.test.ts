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
