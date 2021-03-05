//@ts-nocheck
import type { JSXElementConstructor, Component, ReactElement } from "react"
import { ClassNamed, ClassNamesProperty, ClassHash } from "../src/defs"

function FWith(_: ClassNamed & ClassNamesProperty<{a: ClassHash}>) { return null }
function FWithout(_: ClassNamed) { return null }

describe("extending", () => {
  it("function", () => {
    type ReactFunction<P = never> = (props: P) => ReactElement<any, any> | null
    type FnWithClassNames = ReactFunction<{
      classname: any
      [k: string]: any
    }>
    // function check1(_: FnWithClassNames) {}
    // function check2<T extends FnWithClassNames>(_: T) {}
    function check1(_: ReactFunction) {}
    function check2<T extends ReactFunction>(_: T) {}
    check1(FWith)
    check2(FWith)
  })
  // type X = JSXElementConstructor
//     type JSXElementConstructor<P> =
// | ((props: P) => ReactElement<any, any> | null)
// | (new (props: P) => Component<P, any>);


})