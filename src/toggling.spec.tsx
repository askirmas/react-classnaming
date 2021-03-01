import React from "react"
import type { ClassNames, ClassNamesProperty, ClassHash } from "."
import classNaming, { classNamesCheck } from "."
import expectRender from "../expect-to-same-render"

const {classnames}: ClassNames<typeof App> = {
  classnames: {
    "App__Item": "hash",
    class1: "hash1",
    class2: "hash2"
  }
}

function App({classnames, className}: ClassNames<
  true,
  ClassNamesProperty<{App__Item: ClassHash}>,
  typeof Component
>) {
  const classes = classNaming({
    classnames, className
  })

  return <Component {...{
    ...classes(
      true, {App__Item: true}
    ),
    classnames
  }}/>
}

function Component(props: ClassNames<true, ClassNamesProperty<{class1: ClassHash, class2: ClassHash}>>) {
  const classes = classNaming(props)
  return <>
    <div {...classes(true, {class1: true, class2: false})}/>
    <div {...classes({class2: true})}/>
  </>
}

it("not module", () => expectRender(
  <App className="MyApp" classnames={classNamesCheck()} />
).toSame(
  <div className="MyApp App__Item class1" />,
  <div className="class2" />
))

it("css module", () => expectRender(
  <App className="MyApp" classnames={classnames} />
).toSame(
  <div className="MyApp hash hash1" />,
  <div className="hash2" />
))
