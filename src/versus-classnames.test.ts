import {classNamesCheck, classNamingBasic, classNamingCtx} from "."

import classnames_default from "classnames"
import classnames_bind from "classnames/bind"

const cssModule = {
  "class1": "hash1",
  "class2": "hash2"
}
, importRawCss = {}


it("usage interface", () => {
  const {class1} = classNamesCheck(importRawCss)

  expect(
    classNamingBasic({class1})
  ).toStrictEqual({
    //@ts-expect-error `classnames` has no possibility for type hints
    className:  classnames_default<"class2">("class1")
  })
})

it("css module", () => expect({
  className: classnames_bind.bind(cssModule)(
    // No error on redundant CSS-class
    "class1", "class3"
  )
}).toStrictEqual(
  classNamingCtx({classNames: cssModule})(
    "class1",
    //@ts-expect-error
    "class3"
  )
))

