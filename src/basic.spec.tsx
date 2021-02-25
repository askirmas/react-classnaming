import React from "react"
import expectRender from "../expect-to-same-render"
import type { ClassNames, ClassNamesProperty, ClassValue } from "./defs"
import classNamingBasic from "./basic"
import classNamesCheck from "./check"

function Button({className, "classnames": { Btn }}: ClassNames<true, ClassNamesProperty<{Btn: ClassValue}>>) {
  return <button {...classNamingBasic(className, { Btn })}/>
}

function Root({
  classnames, "classnames": { App__Item, App__Footer }
}: ClassNames<ClassNamesProperty<{App__Item: ClassValue; App__Footer: ClassValue}>, typeof Button>) {
  return <>
    <Button {...{
      ...classNamingBasic({ App__Item }),
      classnames
    }}/>
    <div
      className={`${classNamingBasic({App__Footer})}`}
      data-classname={`${classNamingBasic({App__Footer})}`}
    />
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

it("vscode couldn't rename enum element", () => {
  function Root({
    "classnames": {App: App__Container}
  }: ClassNames<ClassNamesProperty<{App: ClassValue}>>) {
    return <div {...classNamingBasic({App: App__Container})}/>
  }

  expectRender(
    <Root classnames={classNamesCheck()} />
  ).toSame(
    <div className="App"></div>
  )
})

it("vscode can rename property", () => {
  type RootProps = {
    classnames: {
      App__Container: ClassValue
    }
  }

  function Root({
    "classnames": {App__Container: App__Container}
  }: RootProps) {
    return <div {...classNamingBasic({App: App__Container})}/>
  }

  function Root2({
    "classnames": {
      // VSCode didn't rename here due to `ClassNames<>` wrapper
      //@ts-expect-error Property 'App' does not exist
      App: App__Container
    }
  }: ClassNames<typeof Root>) {
    return <div {...classNamingBasic({App: App__Container})}/>
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
  type Props1 = {
    classnames: { class1: ClassValue }
  }
  type Props2 = {
    classnames: { class2_renamed: ClassValue }
  }
  const { class1,
    //@ts-expect-error Property 'class2' does not exist 
    class2
  } = classNamesCheck<Props1 & Props2>();

  expectRender(
    <div {...classNamingBasic<Props1>({class1})} />,
    <div {...classNamingBasic<Props2>({
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

  const {className, classnames: {
    Column_1, Column_2,
    Row_1, Row_2
  }} = props
  , cn1 = classNamingBasic(className, {Column_1})
  , cn2 = classNamingBasic(className, {Column_2})

  expectRender(
    <div {...cn1({ Row_1 })} />,
    <div {...cn1({ Row_2 })} />,
    <div {...cn2({ Row_1 })} />,
    <div {...cn2({ Row_2 })} />,
    <div {...classNamingBasic({ Column_1 })({ Column_2 })({ Row_1 })({ Row_2 })} />
  ).toSame(
    <div className="Cell Column_1 Row_1" />,
    <div className="Cell Column_1 Row_2" />,
    <div className="Cell Column_2 Row_1" />,
    <div className="Cell Column_2 Row_2" />,
    <div className="Column_1 Column_2 Row_1 Row_2" />
  )
})
