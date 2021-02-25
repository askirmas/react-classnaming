import {Component} from "react"
import type { ClassNamed, ClassValue, ClassNames} from "./defs"

export {}

it.todo("ClassNamesFrom")

describe("ReactRelated", () => {
  type Without = ClassNamed
  type Wrong = ClassNamed & {classnames: string}
  type Some = ClassNamed & {classnames: Record<string, ClassValue>}
  type Props = ClassNamed & {classnames: {class1: ClassValue; class2: ClassValue;}}

  it("Component", () => {
    class RWithout extends Component<Without> {};
    class RWrong extends Component<Wrong> {};
    class RSome extends Component<Some> {};
    class RProps extends Component<Props> {};

    //@ts-expect-error
    type Res =
    //@ts-expect-error
    | ClassNames<typeof RWithout>
    //@ts-expect-error
    | ClassNames<typeof RWrong> 
    //Consider @ts-expect-error
    | ClassNames<typeof RSome>
    | ClassNames<typeof RProps>
    
    expect(true).toBe(true)
  })

  it("Function", () => {
    function RWithout(_: Without) {return null};
    function RWrong(_: Wrong) {return null};
    function RSome(_: Some) {return null};
    function RProps(_: Props) {return null};

    //@ts-expect-error
    type Res =
    //TODO @ts-expect-error
    | ClassNames<typeof RWithout>
    //TODO @ts-expect-error
    | ClassNames<typeof RWrong>
    //Consider @ts-expect-error 
    | ClassNames<typeof RSome>
    | ClassNames<typeof RProps>
    
    expect(true).toBe(true)
  })


})