import React from "react"
import expectRender from "../expect-to-same-render";
import type { ClassHash } from "./defs";
import { classNamesMap } from ".";
import { Tooltip } from "reactstrap";

const classnames = {Root: "App", "Item--active": "hash1"} as Record<"Root"|"Theme--dark"|"Item--active", ClassHash>
, {Root} = classnames
, mapping = classNamesMap(classnames)

it("Some Component", () => {
  type ThirdPartyComponentProps = {
    checked?: boolean
    ContainerClassName?: string
    CheckedClassName?: string
    NotCheckedClassName?: string
  }  
  function ThirdPartyComponent({ checked, ContainerClassName, CheckedClassName, NotCheckedClassName}: ThirdPartyComponentProps ) {
    return <div className={ContainerClassName}>
      <div className={checked ? CheckedClassName : NotCheckedClassName}/>
    </div>
  }
  
  expectRender(
    <ThirdPartyComponent checked={true} {...mapping<ThirdPartyComponentProps>({
      ContainerClassName: {Root, "Theme--dark": true},
      CheckedClassName: {"Item--active": true},
      //@ts-expect-error Object literal may only specify known properties, and 'NotExistentProperty' does not exist
      NotExistentProperty: {"Theme--dark": true}
    })}/>
  ).toSame(
    <div className="App Theme--dark">
      <div className="hash1"/>
    </div>
  )
})

it("reactstrap Tooltip", () => expectRender(
  <Tooltip target="target" {...mapping<typeof Tooltip>({
    className: {Root},
    popperClassName: {"Theme--dark": true},
    innerClassName: {"Item--active": true},
  })}/>
).toSame(
  // No static render
))

