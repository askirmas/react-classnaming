import React from "react"
import {classNamesCheck, classNamingBasic} from "."
import expectToRender from "../expect-to-render"
import type { ClassNames, ClassNamesMap } from "./defs"

function Root(_: ClassNames<"fc1"|"fc2">) {
  return null
}

describe(classNamingBasic.name, () => {
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
})

describe(classNamesCheck.name, () => {
  it("dummy", () => {
    <Root classNames={classNamesCheck()}/>;

    //@ts-expect-error Property 'fc2' is missing
    <Root classNames={classNamesCheck<"fc1">()}/>;
    <Root classNames={classNamesCheck<"fc1"|"fc2"|"etc">()}/>;

    expect(true).toBe(true)
  })

  it("check that all are used", () => {
    const classNames = {} as ClassNamesMap<"fc1"|"fc2"|"fc3">;
    //@ts-expect-error is missing the following properties
    <Root classNames={
      classNamesCheck<"">(classNames)
    } />;

    // TypeScript doesn't check redundant props
    <Root classNames={{} as ClassNamesMap<"fc1"|"fc2">} />;
    <Root classNames={classNames} />;
    <Root classNames={classNames as ClassNames<typeof Root>["classNames"]} />;
    
    //@ts-expect-error //TODO TBD redundant props
    <Root classNames={classNamesCheck<typeof Root>(classNames)} />;
    //@ts-expect-error //TODO TBD not error
    <Root3 classNames={classNamesCheck<typeof Root3>(classNames)} />;

    function Root3(_: ClassNames<"fc1"|"fc2"|"fc3">) {
      return null
    }

    expect(true).toBe(true)
  })  
})