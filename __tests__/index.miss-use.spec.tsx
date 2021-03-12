import React from "react"
import type { ClassNames, ClassNamesProperty, ClassHash } from "../src/"
import classNaming from "../src/"
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
  return <Component {...{
    ...classNaming({
      classnames, className
    })(
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

it("not propagate classnames", () => {
  const App = ({classnames, className}: ClassNames<
    true,
    ClassNamesProperty<{App__Item: ClassHash}>,
    typeof Component>
  ) =>
    //@ts-expect-error Types of property classnames are incompatible Type undefined is not assignable
    <Component {
      ...classNaming({
        classnames, className
      })(
        true, {App__Item: true}
      )}
    />

  expectRender(
    <App className="MyApp" classnames={classnames}/>
  ).toSame(
    <div className="MyApp hash class1" />,
    <div className="class2" />
  )
})
