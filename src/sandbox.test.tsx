import React from "react"
import expectToRender from "../expect-to-render"

it("falsy props", () => expectToRender(
  <div {...{
    "null": null,
    "undefined": undefined,
    "false": false, 
    "data-false": false,
    "empty": ""
  }}/>,
  '<div data-false="false" empty=""></div>'
))

it("object props", () => expectToRender(
  //@ts-expect-error
  <div {...{
    "null": {[Symbol.toPrimitive]: () => null},
    "undefined": {toString: () => undefined},
    "false": {valueOf: () => false}
  }}/>,
  '<div null="null" undefined="undefined" false="false"></div>'
))
