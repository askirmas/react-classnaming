import React from "react"
import expectToRender from "../expect-to-render"
import type { ClassNames, ClassValue } from "./defs"
import classNamingBasic from "./basic"
import classNamesCheck from "./check"

function Button({className, "classNames": { Btn }}: ClassNames<true, "Btn">) {
  return <button {...classNamingBasic(className, { Btn })}/>
}

function Root({
  classNames, "classNames": { App__Item, App__Footer }
}: ClassNames<"App__Item"|"App__Footer", typeof Button>) {
  return <>
    <Button {...{
      ...classNamingBasic({ App__Item }),
      classNames
    }}/>
    <div
      className={classNamingBasic<string>({App__Footer})}
      data-class={`${classNamingBasic({App__Footer})}`}
    />
  </>
}

it("not css module", () => expectToRender(
  <Root classNames={classNamesCheck()}/>,
  [
    '<button class="App__Item Btn"></button>',
    '<div class="App__Footer" data-class="App__Footer"></div>'
  ]
))

it("css module", () => expectToRender(
  <Root classNames={{
    App__Footer: "footer-hash",
    App__Item: "item-hash",
    Btn: "btn-hash"
  }}/>,
  [
    '<button class="item-hash btn-hash"></button>',
    '<div class="footer-hash" data-class="footer-hash"></div>'
  ]
))

it("vscode couldn't rename enum element", () => {
  function Root({
    "classNames": {App: App__Container}
  }: ClassNames<"App">) {
    return <div {...classNamingBasic({App: App__Container})}/>
  }

  expectToRender(
    <Root classNames={classNamesCheck()} />,
    '<div class="App"></div>'
  )
})

it("vscode can rename property", () => {
  type RootProps = {
    classNames: {
      App__Container: ClassValue
    }
  }

  function Root({
    "classNames": {App__Container: App__Container}
  }: RootProps) {
    return <div {...classNamingBasic({App: App__Container})}/>
  }

  function Root2({
    "classNames": {
      // VSCode didn't rename here due to `ClassNames<>` wrapper
      //@ts-expect-error Property 'App' does not exist
      App: App__Container
    }
  }: ClassNames<typeof Root>) {
    return <div {...classNamingBasic({App: App__Container})}/>
  }

  expectToRender(
    <>
      <Root
        //TODO Solve it
        //@ts-expect-error Property 'App' is missing in type 'Record<string, 
        classNames={
          classNamesCheck()} />
      <Root2 classNames={classNamesCheck()} />
    </>,
    [
      '<div class="App"></div>',
      '<div class="App"></div>'
    ]
  )
})

it("additional type check after rename", () => {
  type Props1 = {
    classNames: { class1: ClassValue }
  }
  type Props2 = {
    classNames: { class2_renamed: ClassValue }
  }
  const { class1,
    //@ts-expect-error Property 'class2' does not exist 
    class2
  } = classNamesCheck<Props1 & Props2>();

  expectToRender(
    <>
      <div {...classNamingBasic<Props1>({class1})} />
      <div {...classNamingBasic<Props2>({
        //@ts-expect-error Object literal may only specify known properties, and 'class2' does not exist
        class2
      })} />
    </>,
    [
      '<div class="class1"></div>',
      '<div class="class2"></div>'
    ]
  )
})
