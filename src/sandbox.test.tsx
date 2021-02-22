import React from "react"
import expectRender from "../expect-to-same-render"

it("falsy props", () => expectRender(
  <div {...{
    "null": null,
    "undefined": undefined,
    // "false": false,  // console.error Warning: Received `false` for a non-boolean attribute `false`.
    "data-false": false,
    "empty": ""
  }}/>
).toSame(
  <div data-false="false"
    //@ts-expect-error Property 'empty' does not exist
    empty="" />
))

it("object props", () => expectRender(
  //@ts-expect-error
  <div {...{
    "null": {[Symbol.toPrimitive]: () => null},
    "undefined": {toString: () => undefined},
    "false": {valueOf: () => false}
  }}/>
).toSame(
  <div
    //@ts-expect-error Property 'null' does not exist
    null="null"
    undefined="undefined"
    false="false"
  />
))

//TODO emits no warning!!! Against `classnames`
it("props to dom attribute", () => expectRender(
  //@ts-expect-error
  <div classnames={{toString: () => ""}} />
).toSame(
  //@ts-expect-error
  <div classnames="" />
))
