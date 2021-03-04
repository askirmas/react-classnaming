import type { TooltipProps } from 'reactstrap';
import { AnyObject } from "./ts-swiss";
import classNamesMap from "./map";

const module_css = {
  class1: "hash1",
  class2: "hash2"
}
const mapping = classNamesMap(module_css)

describe("ClassNamesMap", () => {

  it("reactstrap tooltip", () => {
    type WithoutAny<T extends AnyObject> = {[K in keyof T]?: any extends T[K] ? never : T[K]}
    type TooltipDefinedProps = WithoutAny<TooltipProps>
    expect(mapping<TooltipDefinedProps>({
      //TODO ts-expect-error #23
      "isOpen": true
    })).toStrictEqual({
      "isOpen": ""
    })
  })
})
