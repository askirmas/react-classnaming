import {renderToStaticMarkup} from "react-dom/server"

type RElement = Parameters<typeof renderToStaticMarkup>[0]

export default expectRender

function expectRender(
  ...elements: RElement[]
) {
  const input = toStatic(elements)

  return {
    toSame: (...expectations: RElement[]) => expect(input).toBe(toStatic(expectations)),
    not: {
      toSame: (...expectations: RElement[]) => expect(input).not.toBe(toStatic(expectations)),
    }
  }
}

function toStatic(els: RElement[]) {
  return els.map(renderToStaticMarkup).join("")
}