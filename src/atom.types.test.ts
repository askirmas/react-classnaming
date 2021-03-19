/// <reference path="./global.d.ts" />
import type {CssIdentifiersMap as BootStrap3} from "../__typing__/bootstrap3.css"
import type {CssIdentifiersMap as BootStrap4} from "../__typing__/bootstrap4.css"
import type { AtomicQuery, Values } from "./atom.types"

it("bootstrap4", () => {
  const check: Record<string, AtomicQuery<BootStrap3>> = {
    "1": {
      collapse: true,
      // display: "",
      "progress": "bar-danger",
      // "justify-content": {
      //   _: "around",
      //   "lg": "between"
      // },
      "visible": "lg-inline-block"
    },
  }
  expect(check).toBeInstanceOf(Object)
})

it("bootstrap4", () => {
  const check: Record<string, AtomicQuery<BootStrap4>> = {
    "1": {
      collapse: true,
      display: 1,
      "progress-bar": "animated",
      "justify-content": {
        _: "around",
        "lg": "between"
      },
      d: ["inline", {lg: "inline-block"}],
      col: {
        //TODO #38 @ts-expect-error No such class `col-label`
        _: "label",
        form: "label-lg"
      }
    },
  }
  expect(check).toBeInstanceOf(Object)
})

it("merge values",() => {
  type Display = `${""|"lg-"|"md-"}${
    "none"
    |`table${""|"-row"|"-cell"}`
    |"inline"
    |`${"inline-"|""}${"block"|"flex"}`
  }`
  const check: Record<string, Values<Display, "-", "_">> = {
    "1": ["block", {lg: "block"}]
  }
  expect(check).toBeInstanceOf(Object)
})
