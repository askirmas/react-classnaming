import type { TooltipProps } from 'reactstrap';
import type { GridOptions } from "ag-grid-community";
import { classNamesMap } from "../src/map";

const module_css = {
  class1: "hash1",
  class2: "hash2"
}
const mapping = classNamesMap(module_css)

it("reactstrap tooltip", () => {
  expect(mapping<TooltipProps>({
    popperClassName: {class1: true, class2: true},
    //@ts-expect-error Object literal may only specify known properties, and 'isOpen' does not exist
    isOpen: {class1: true}
  })).toStrictEqual({
    "popperClassName": "hash1 hash2",
    "isOpen": "hash1"
  })
})

it("AgGrid", () => expect(
  mapping<GridOptions>({
    rowClass: {class2: true},
  })
).toStrictEqual({
  rowClass: "hash2"
}))  

describe("type checks", () => {
  it("persist required/optional", () => {
    const mapped = mapping<typeof module_css>(
      //TODO #25 @ts-expect-error
      {}
    )
    expect(mapped).toStrictEqual({})
  })
  it("output types", () => {
    const mapped = mapping<typeof module_css>({
      class1: {class2: true},
    })
    , check: Record<string, typeof mapped> = {
      //TODO #25 @ts-expect-error
      "empty": {},
      "redundant": {
        class1: "hash2",
        //TODO #25 @ts-expect-error
        class2: "hash1",
      }
    }
    expect(check).toBeInstanceOf(Object)
  })
})
