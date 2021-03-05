import type { TooltipProps } from 'reactstrap';
import type { GridOptions } from "ag-grid-community";
import classNamesMap from "./map";

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
