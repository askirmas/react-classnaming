import React from "react"
import expectToRender from "../expect-to-render"
import type { ClassNames } from "./defs"
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

it("vscode renamed", () => {
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
