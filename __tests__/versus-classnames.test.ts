import type {ClassNames} from "../src/naming"
import classNaming from "../src/naming"

import classnames_default from "classnames"
import classnames_bind from "classnames/bind"

import css from "./some.css"
import module from "./some.module.css"
import { ClassNamesProperty, ClassHash } from "../src/defs"

const module_css: typeof module = {
  "class1": "hash1",
  "class2": "hash2"
}

it("usage interface", () => {
  const { class1,
    whatever
  } = css
  
  const props: ClassNames<ClassNamesProperty<{class2: ClassHash}>> = {
    //@ts-expect-error
    "classnames": css
  }
  
  const {classnames: {class2}} = props
  , classes = classNaming()
  expect({
    ...classes({class1, class2})
  }).toStrictEqual({
    //@ts-expect-error `classnames` has no possibility for type hints
    className:  classnames_default<"whatever">("class1", "class2")
  })

  expect(class2 ?? whatever).toBe(undefined)
})

it("css module", () => {
  const classes = classNaming({classnames: module_css})
  
  expect({
    className: classnames_bind.bind(module_css)(
      // No error on redundant CSS-class
      {"class1": true},
      "class3"
    )
  }).toStrictEqual({
    ...classes({
      class1: true,
      //@ts-expect-error  Argument of type '"class3"' is not assignable to parameter
      class3: true
    })
  })
})

it.todo("Does `classnames` have chainable interface?")
