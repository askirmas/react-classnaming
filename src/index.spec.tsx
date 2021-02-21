import React from "react"
import {renderToStaticMarkup} from "react-dom/server"
import classNaming, {classNameCheck} from "."
import type { ClassNames, ClassNamesMap } from "./defs"

function Root(_: ClassNames<"fc1"|"fc2">) {
  return null
}

describe(classNaming.name, () => {
  function Button({
    className, "classNames": { Btn }
  }: ClassNames<true, "Btn">) {
    return <button {...classNaming(className, { Btn })}/>
  }

  function Root({
    classNames, "classNames": { App__Item, App__Footer }
  }: ClassNames<"App__Item"|"App__Footer", typeof Button>) {
    return <>
      <Button {...{
        ...classNaming({ App__Item }),
        classNames
      }}/>
      <div
        //TODO Invalid property due to function
        className={classNaming<string>({App__Footer})}
        data-class={`${classNaming({App__Footer})}`}
      />
    </>
  }

  expect(renderToStaticMarkup(
    <Root classNames={classNameCheck()}/>
  )).toBe([
    '<button class="App__Item Btn"></button>',
    '<div data-class="App__Footer"></div>'
  ].join(""))
})

describe(classNameCheck.name, () => {
  it("dummy", () => {
    <Root classNames={classNameCheck()}/>;

    //@ts-expect-error Property 'fc2' is missing
    <Root classNames={classNameCheck<"fc1">()}/>;
    <Root classNames={classNameCheck<"fc1"|"fc2"|"etc">()}/>;

    expect(true).toBe(true)
  })

  it("check that all are used", () => {
    const classNames = {} as ClassNamesMap<"fc1"|"fc2"|"fc3">;
    //@ts-expect-error is missing the following properties
    <Root classNames={
      classNameCheck<"">(classNames)
    } />;

    // TypeScript doesn't check redundant props
    <Root classNames={{} as ClassNamesMap<"fc1"|"fc2">} />;
    <Root classNames={classNames} />;
    <Root classNames={classNames as ClassNames<typeof Root>["classNames"]} />;
    
    //@ts-expect-error //TODO TBD redundant props
    <Root classNames={classNameCheck<typeof Root>(classNames)} />;
    //@ts-expect-error //TODO TBD not error
    <Root3 classNames={classNameCheck<typeof Root3>(classNames)} />;

    function Root3(_: ClassNames<"fc1"|"fc2"|"fc3">) {
      return null
    }

    expect(true).toBe(true)
  })  
})