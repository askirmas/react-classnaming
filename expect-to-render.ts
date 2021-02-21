import {renderToStaticMarkup} from "react-dom/server"

const {isArray: $isArray} = Array

export default expectToRender

function expectToRender(
  element: Parameters<typeof renderToStaticMarkup>[0],
  expectation: string | string[] 
) {
  return expect(
    renderToStaticMarkup(element)
  ).toBe(
    !$isArray(expectation)
    ? expectation
    : expectation.join("")
  )
}
