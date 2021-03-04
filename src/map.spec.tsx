import React from "react"
import classNaming from ".";
import expectRender from "../expect-to-same-render";
import { ClassHash, ClassNamesProperty } from "./defs";
import {classNamesMap} from ".";


type ComponentProps = {checked: boolean} & ClassNamesProperty<{
  Container: ClassHash
  Checked___true: ClassHash
  Checked___false: ClassHash
}>

function Component({
  checked,
  classnames, classnames: {
    Checked___true, Checked___false
  }
}: ComponentProps ) {
  const classes = classNaming({classnames})

  return <div {...classes({Container: true})}>
    <div {...classes(checked ? {Checked___true} : {Checked___false})}/>
  </div>
}


const classnames = {Root: "App", "Item--active": "hash1"} as Record<"Root"|"Theme--dark"|"Item--active", ClassHash>
, {Root} = classnames
, mapping = classNamesMap(classnames)

it("demo", () => expectRender(
  <Component checked={true} {...mapping<ComponentProps>({
    Container: {Root, "Theme--dark": true},
    Checked___true: {"Item--active": true},
    Checked___false: {}
  })}/>
).toSame(
  <div className="App Theme--dark">
    <div className="hash1"/>
  </div>
))