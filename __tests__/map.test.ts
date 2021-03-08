import type { TooltipProps } from 'reactstrap';
import type { GridOptions } from "ag-grid-community";
import { classNamesMap } from "../src/map";
import classNaming from '../src';

const module_css = {
  class1: "hash1",
  class2: "hash2"
}
const mapping = classNamesMap(module_css)

it("AgGrid", () => expect(
  mapping<GridOptions>({
    rowClass: {class2: true},
  })
).toStrictEqual({
  rowClass: "hash2"
}))  

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

it("classNaming as values", () => {
  const classes = classNaming({classnames: module_css})
  expect(mapping<TooltipProps>({
    //@ts-expect-error //TODO #27
    popperClassName: classes({class1: true})
  })).toStrictEqual({
    popperClassName: "hash1"
  })
})

describe("type checks", () => {
  it("No unknown source keys", () => {
    const mapped = mapping<typeof module_css>({
      class1: {
        //@ts-expect-error Object literal may only specify known properties, but 'class3' does not exist
        class3: true
      }
    })
    expect(mapped).toStrictEqual({class1: "class3"})
  })

  it("Strict action", () => {
    const {act} = {} as {act?: boolean}
    , mapped = mapping<typeof module_css>({
      //TODO @ts-expect-error
      class1: {class2: act},
    })

    expect(mapped).toStrictEqual({class1: "hash2"})
  })

  it("return keys", () => {
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
