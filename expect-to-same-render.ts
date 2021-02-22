import {renderToStaticMarkup} from "react-dom/server"

type RElement = Parameters<typeof renderToStaticMarkup>[0]

export default expectRender

function expectRender(
  ...elements: RElement[]
) {
  return {
    toSame: (...expectations: RElement[]) => 
      expect(
        elements.map(renderToStaticMarkup).join("")
      ).toBe(
        expectations.map(renderToStaticMarkup).join("")
      )
  }
}
