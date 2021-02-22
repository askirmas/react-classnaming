import type {ClassNames} from "."
import {
  classNamesCheck,
  classNamingBasic,
  classNamingCtx
} from "."

import classnames_default from "classnames"
import classnames_bind from "classnames/bind"

import css from "./some.css"
import module from "./some.module.css"
const module_css: typeof module = {
  "class1": "hash1",
  "class2": "hash2"
}

it("usage interface", () => {
  const { class1,
    //@ts-expect-error Property 'class3' does not exist
    whatever
  } = classNamesCheck<"class1"|"class2">(css)
  
  const props: ClassNames<"class2"> = {"classnames": css}
  
  const {classnames: {class2}} = props

  expect(
    classNamingBasic({class1, class2})
  ).toStrictEqual({
    //@ts-expect-error `classnames` has no possibility for type hints
    className:  classnames_default<"whatever">("class1", "class2")
  })

  expect(class2 ?? whatever).toBe(undefined)
})

it("css module", () => expect({
  className: classnames_bind.bind(module_css)(
    // No error on redundant CSS-class
    "class1", "class3"
  )
}).toStrictEqual(
  classNamingCtx({classnames: module_css})(
    "class1",
    //@ts-expect-error Argument of type '"class3"' is not assignable to parameter
    "class3"
  )
))

