import React from "react"
import expectRender from "../expect-to-same-render";
import type { ClassHash } from "../src";
import { classNamesMap } from "../src";
import { Tooltip } from "reactstrap";

const classnames = {Root: "App", "Item--active": "hash1"} as Record<"Root"|"Theme--dark"|"Item--active", ClassHash>
, {Root} = classnames
, mapping = classNamesMap(classnames)

it("reactstrap Tooltip", () => expectRender(
  <Tooltip target="target" {...mapping<typeof Tooltip>({
    //TODO #25 {target: {...}}
    className: {Root},
    popperClassName: {"Theme--dark": true},
    innerClassName: {"Item--active": true},
  })}/>
).toSame(
  // No static render
))

