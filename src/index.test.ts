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