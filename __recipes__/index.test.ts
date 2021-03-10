//-/ <reference path="node_modules/react-classnaming/dist" />
import {classBeming, ClassNamesProperty, setOptions} from "react-classnaming"
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

it("go", () => {
  const bem = classBeming<ClassNamesProperty<CssModule>>()
  expect(bem({
    "block": {
      "&": "m",
      "el": {"m": "X"}
    }
  })).toStrictEqual({
    className: "block block-m block_el block_el-m-X"
  })
})