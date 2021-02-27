import React from "react"
import { classNamesCheck, classNamingCtx } from "."
import expectRender from "../expect-to-same-render"
import { ClassNames, ClassNamesProperty, ClassHash } from "./defs"

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
    ...classNamingCtx({
      classnames, className
    })(
      true, {App__Item: true}
    ),
    classnames
  }}/>
}

//TODO No rename inheritance
function Component(props: ClassNames<true, {classnames: {class1: ClassHash, class2: ClassHash}}>) {
  const classes = classNamingCtx(props)
  return <>
    <div {...classes(true, {class1: true, class2: false})}/>
    <div {...classes({class2: true})}/>
  </>
}

describe(classNamingCtx.name, () => {
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

  it("not propagate classnames", () => {
    const App = ({classnames, className}: ClassNames<
      true,
      ClassNamesProperty<{App__Item: ClassHash}>,
      typeof Component>
    ) =>
      //@ts-expect-error Types of property classnames are incompatible Type undefined is not assignable 
      <Component {
        ...classNamingCtx({
          classnames, className
        })(
          true, {App__Item: true}
        )}
      />
    
    expectRender(
      <App className="MyApp" classnames={classnames}/>
    ).toSame(
      <div className="MyApp hash class1" />,
      //TODO split wrong usage
      <div className="MyApp hash class2" />  
    )
  })
})
