//-/ <reference path="node_modules/react-classnaming/dist" />
import {classBeming, ClassNamed, ClassNamesProperty, setOptions} from "react-classnaming"
import type {ClassHash, ReactClassNaming} from "react-classnaming"

declare module "react-classnaming" {
  namespace ReactClassNaming {
    interface BemOptions {
      elementDelimiter: "_";
      modDelimiter: "-";
      blockModKey: "&";
    }
  }
}

setOptions({
  elementDelimiter: "_",
  modDelimiter: "-",
  blockModKey: "&"
})

type CssModule = Record<
  "block"|"block-m"
  |"block_el"|"block_el-m-X"|"block_el-m-Y",
  ClassHash
>

describe("go", () => {
  const bem = classBeming<ClassNamesProperty<CssModule> & ClassNamed>()
  , classNamed = bem(true, {
    block: "m",
    block_el: {"m": "X"}
  })
  it("TBD", () => expect(classNamed).not.toStrictEqual({
    className: "block block-m block_el block_el_m-X"
  }))
  it("Now", () => expect(classNamed).toStrictEqual({
    className: "block block-m block_el_m block_el_m-X"
  }))
})