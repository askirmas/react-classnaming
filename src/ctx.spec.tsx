import React from "react"
import { classNamesCheck, classNamingCtx } from "."
import expectToRender from "../expect-to-render"
import { ClassNames } from "./defs"

describe(classNamingCtx.name, () => {
  it("demo", () => {
    function Component(props: ClassNames<true, "class1"|"class2">) {
      const classes = classNamingCtx(props)

      return <>
        <div {...classes(true, {class1: true, class2: false})}/>
        <div {...classes("class2")}/>
      </>
    }

    function App({classNames, className}: ClassNames<true, "App__Item", typeof Component>) {
      const classes = classNamingCtx({classNames, className})

      return <>
        <Component {...classes("App__Item")} {...{classNames}}/>
      </>
    }

    expectToRender(
      <App className="MyApp" classNames={classNamesCheck()} />,
      [
        '<div class="App__Item class1"></div>',
        '<div class="class2"></div>'
      ]
    )
  })
})