//-/ <reference path="node_modules/react-classnaming/dist" />
import {classBeming, ClassNamed, ClassNamesProperty, setOptions} from "react-classnaming"
import type {ClassHash, ReactClassNaming} from "react-classnaming"

declare module "react-classnaming" {
  namespace ReactClassNaming {
    interface BemOptions {
      elementDelimiter: "_";
      modDelimiter: "-";
    }
  }
}

setOptions({
  elementDelimiter: "_",
  modDelimiter: "-",
})

type CssModule = Record<
  |"block-m"
  |"block_el"|"block_el-m-X"|"block_el-m-Y",
  ClassHash
>

it("go", () => {
  const bem = classBeming<ClassNamesProperty<CssModule> & ClassNamed>()
  , classNamed = bem(true, {
    block: "m",
    block_el: {"m": "X"}
  })
  expect(classNamed).toStrictEqual({
    className: "block block-m block_el block_el-m-X"
  })
})