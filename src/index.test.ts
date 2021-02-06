import classNaming from ".";

it("demo", () => expect(classNaming(
  {"hashed": "Hash", "notHashed": undefined}
)).toStrictEqual({
  "className": "Hash notHashed"
}))