import React from "react"
import { classNamesCheck, classNamingCtx } from "."
import expectToRender from "../expect-to-render"
import { ClassNames } from "./defs"

function Component(props: ClassNames<true, "class1"|"class2">) {
  const classes = classNamingCtx(props)
  return <>
    <div {...classes(true, {class1: true, class2: false})}/>
    <div {...classes("class2")}/>
  </>
}

function App({classNames, className}: ClassNames<true, "App__Item", typeof Component>) {
  return <Component {...{
    ...classNamingCtx({
      classNames, className
    })(
      true, "App__Item"
    ),
    classNames
  }}/>
}

describe(classNamingCtx.name, () => {
  it("demo", () => expectToRender(
    <App className="MyApp" classNames={classNamesCheck()} />,
    [
      '<div class="MyApp App__Item class1"></div>',
      '<div class="class2"></div>'
    ]
  ))

  it("forget className", () => expectToRender(
    //@ts-expect-error Property 'className' is missing
    <App classNames={classNamesCheck()}/>,
    [
      '<div class="App__Item class1"></div>',
      '<div class="class2"></div>'
    ]  
  ))
  it("forget classNames", () => expectToRender(
    //@ts-expect-error Property 'classNames' is missing
    <App className={"MyApp"}/>,
    [
      '<div class="MyApp App__Item class1"></div>',
      '<div class="class2"></div>'
    ]  
  ))

})