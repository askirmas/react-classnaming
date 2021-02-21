import React from "react"
import { classNamesCheck, classNamingCtx } from "."
import expectToRender from "../expect-to-render"
import { ClassNames } from "./defs"

const {classNames}: ClassNames<typeof App> = {
  classNames: {
    "App__Item": "hash",
    class1: "hash1",
    class2: "hash2"
  }
}

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
  it("not module", () => expectToRender(
    <App className="MyApp" classNames={classNamesCheck()} />,
    [
      '<div class="MyApp App__Item class1"></div>',
      '<div class="class2"></div>'
    ]
  ))

  it("css module", () => expectToRender(
    <App className="MyApp" classNames={classNames} />,
    [
      '<div class="MyApp hash hash1"></div>',
      '<div class="hash2"></div>'
    ]
  ))

  it("propagate classNames by option", () => {
    const App = ({classNames, className}: ClassNames<true, "App__Item", typeof Component>) =>
      <Component {
        ...classNamingCtx(
          {classNames, className},
          {withClassNames: true}
        )(
          true, "App__Item"
      )}/>
    
    expectToRender(
      <App className="MyApp" classNames={classNames}/>,
      [
        '<div class="MyApp hash hash1"></div>',
        '<div class="hash2"></div>'
        ]
    )
  })  

  it("not propagate classNames", () => {
    const App = ({classNames, className}: ClassNames<true, "App__Item", typeof Component>) =>
      //@ts-expect-error Types of property 'classNames' are incompatible Type 'undefined' is not assignable 
      <Component {
        ...classNamingCtx({
          classNames, className
        })(
          true, "App__Item"
      )}/>
    
    expectToRender(
      <App className="MyApp" classNames={classNames}/>,
      [
        '<div class="MyApp hash class1"></div>',
        '<div class="class2"></div>'  
      ]
    )
  })

  it("propagate wrongly to leaf element", () => {
    const Component = ({classNames}: ClassNames<"class1">) =>
      <div {
        ...classNamingCtx({classNames}, {withClassNames: true})("class1")
      }/>

    expectToRender(
      <Component classNames={classNames}/>,
      '<div class="hash1" classNames=""></div>'
    )
  })
})