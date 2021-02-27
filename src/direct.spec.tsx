import React from "react"
import expectRender from "../expect-to-same-render"
import type { ClassNames, ClassNamesProperty, ClassNamed, ClassHash } from "."
import classNaming, {classNamesCheck} from "."

const Button = ({className, "classnames": { Btn }}
  : ClassNamed & ClassNamesProperty<{Btn: ClassHash}>
) => <button {...classNaming(className, { Btn })}/>

type RootClassNames = ClassNamesProperty<{
  App__Item: ClassHash
  App__Footer: ClassHash
}>
type RootProps = RootClassNames & ClassNames<typeof Button>
function Root({classnames, "classnames": { App__Item, App__Footer }}: RootProps) {
  const classFooter = classNaming({App__Footer})

  return <>
    <Button {...{
      ...classNaming({ App__Item }),
      classnames
    }}/>
    <div {...classFooter} data-classname={`${classFooter}`} />
  </>
}

it("not css module", () => expectRender(
  <Root classnames={classNamesCheck()}/>
).toSame(  
  <button className="App__Item Btn"></button>,
  <div className="App__Footer" data-classname="App__Footer"></div>
))

it("css module", () => expectRender(
  <Root classnames={{
    App__Footer: "footer-hash",
    App__Item: "item-hash",
    Btn: "btn-hash"
  }}/>
).toSame(
  <button className="item-hash btn-hash"></button>,
  <div className="footer-hash" data-classname="footer-hash"></div>
))

it("VSCode can rename property", () => {
  type RootProps = ClassNamesProperty<{
    App__Container: ClassHash
  }>

  function Root({
    "classnames": {App__Container: App__Container}
  }: RootProps) {
    return <div {...classNaming({App: App__Container})}/>
  }

  function Root2({
    "classnames": {
      // VSCode didn't rename here due to `ClassNames<>` wrapper
      //@ts-expect-error Property 'App' does not exist
      App: App__Container
    }
  }: ClassNames<typeof Root>) {
    return <div {...classNaming({App: App__Container})}/>
  }

  expectRender(
    <Root
      classnames={
        classNamesCheck()} />,
    <Root2 classnames={classNamesCheck()} />
  ).toSame(
    <div className="App"/>,
    <div className="App"/>
  )
})

it("additional type check after rename", () => {
  type Props1 = ClassNamesProperty<{ class1: ClassHash }>
  type Props2 = {
    classnames: { class2_renamed: ClassHash }
  }
  const { class1,
    //@ts-expect-error Property 'class2' does not exist 
    class2
  } = classNamesCheck<Props1 & Props2>();

  expectRender(
    <div {...classNaming<Props1["classnames"]>({class1})} />,
    <div {...classNaming<Props2["classnames"]>({
      //@ts-expect-error Object literal may only specify known properties, and 'class2' does not exist
      class2
    })} />
  ).toSame(
    <div className="class1"/>,
    <div className="class2"/>    
  )
})

it("chaining", () => {
  const props = {className: "Cell", classnames: classNamesCheck()}

  const {className, "classnames": {
    Column_1, Column_2,
    Row_1, Row_2
  }} = props
  , Cell = classNaming(className)
  , Col1 = Cell({Column_1})
  , Col2 = Cell({Column_2})

  expectRender(
    <div {...Col1({ Row_1 })} />,
    <div {...Col1({ Row_2 })} />,
    <div {...Col2({ Row_1 })} />,
    <div {...Col2({ Row_2 })} />,
    <div {...classNaming({ Column_1 })({ Column_2 })({ Row_1 })({ Row_2 })} />
  ).toSame(
    <div className="Cell Column_1 Row_1" />,
    <div className="Cell Column_1 Row_2" />,
    <div className="Cell Column_2 Row_1" />,
    <div className="Cell Column_2 Row_2" />,
    <div className="Column_1 Column_2 Row_1 Row_2" />
  )
})
