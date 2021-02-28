import type {ClassNames} from "."
import classNaming, { classNamesCheck } from "."

import classnames_default from "classnames"
import classnames_bind from "classnames/bind"

import css from "./some.css"
import module from "./some.module.css"
import { ClassNamesProperty, ClassHash } from "./defs"
const module_css: typeof module = {
  "class1": "hash1",
  "class2": "hash2"
}

it("usage interface", () => {
  const { class1,
    //@ts-expect-error Property 'class3' does not exist
    whatever
  } = classNamesCheck<ClassNamesProperty<{class1: ClassHash; class2: ClassHash}>>(css)
  
  const props: ClassNames<ClassNamesProperty<{class2: ClassHash}>> = {
    //@ts-expect-error
    "classnames": css
  }
  
  const {classnames: {class2}} = props

  expect({
    ...classNaming({class1, class2})
  }).toStrictEqual({
    //@ts-expect-error `classnames` has no possibility for type hints
    className:  classnames_default<"whatever">("class1", "class2")
  })

  expect(class2 ?? whatever).toBe(undefined)
})

it("css module", () => expect({
  className: classnames_bind.bind(module_css)(
    // No error on redundant CSS-class
    {"class1": true},
    "class3"
  )
}).toStrictEqual({
  //@ts-expect-error //TODO #11 Error on overload, not on object
  ...classNaming({classnames: module_css})({
    class1: true,
    //TODO #11 Recover @ts-expect-error Argument of type '"class3"' is not assignable to parameter
    class3: true
  })
}))

it.todo("Does `classnames` have chainable interface?")
