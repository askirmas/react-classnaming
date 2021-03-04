import React from "react"
import expectRender from "../expect-to-same-render";
import type { ClassHash } from "./defs";
import { classNamesMap } from ".";
import type { GridOptions } from "ag-grid-community";

type ThirdPartyComponentProps = {
  checked?: boolean
  ContainerClassName?: string
  CheckedClassName?: string
  NotCheckedClassName?: string
}

function ThirdPartyComponent({
  checked,
  ContainerClassName,
  CheckedClassName,
  NotCheckedClassName,
}: ThirdPartyComponentProps ) {
  return <div className={ContainerClassName}>
    <div className={checked ? CheckedClassName : NotCheckedClassName}/>
  </div>
}

const classnames = {Root: "App", "Item--active": "hash1"} as Record<"Root"|"Theme--dark"|"Item--active", ClassHash>
, {Root} = classnames
, mapping = classNamesMap(classnames)

it("demo", () => expectRender(
  <ThirdPartyComponent checked={true} {...mapping<ThirdPartyComponentProps>({
    ContainerClassName: {Root, "Theme--dark": true},
    CheckedClassName: {"Item--active": true}
  })}/>
).toSame(
  <div className="App Theme--dark">
    <div className="hash1"/>
  </div>
))

it("AgGrid", () => expect(
  mapping<GridOptions>({
    rowClass: {Root, "Item--active": true},
  })
).toStrictEqual({
  rowClass: "App hash1"
}))

