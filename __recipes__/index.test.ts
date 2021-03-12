import {classBeming, ClassNamed, ClassNamesProperty, setOptions} from "react-classnaming"
import type {ClassHash} from "react-classnaming"

setOptions({
  elementDelimiter: "_",
  modDelimiter: "-",
})

type CssModule = Record<
  |"block1-m"
  |"block2_el-m-X"|"block2_el-m-Y",
  ClassHash
>

it("go", () => {
  const bem = classBeming<ClassNamesProperty<CssModule> & ClassNamed>()
  , classNamed = bem(true, {
    block1: "m",
    block2: true,
    block2_el: {"m": "X"}
  })
  expect(classNamed).toStrictEqual({
    className: "block1 block1-m block2 block2_el block2_el-m-X"
  })
})