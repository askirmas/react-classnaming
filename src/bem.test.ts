import { classBeming } from "./bem";

describe("contexting", () => {
  describe("empty", () => {
    const bem = classBeming()

    it("1", () => expect(bem({
      "block1": true,
      "block2": { "el": true }
    })).toStrictEqual({
      className: "block1 block2__el"
    }))
  })

  describe("full", () => {
    const bem = classBeming({
      className: "propagated",
      classnames: {
        "block1": "hash1",
        "block2__el": "hash2"
      }
    })

    it("1", () => expect(bem(true, {
      "block1": true,
      "block2": { "el": true }
    })).toStrictEqual({
      className: "propagated hash1 hash2"
    }))
  })
})
