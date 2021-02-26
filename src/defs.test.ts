import {
  Component,
  // ReactElement
} from "react"
import type { ClassNamed, ClassValue, ReactRelated, GetProps} from "./defs"

export {}

type Getter<T extends ReactRelated> = GetProps<T>

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
    type x =
    | Getter<typeof RProps>
    //@ts-expect-error
    type Res =
    //@ts-expect-error
    | Getter<typeof RWithout>
    //@ts-expect-error
    | Getter<typeof RWrong> 
    //Consider @ts-expect-error
    | Getter<typeof RSome>
    | Getter<typeof RProps>
    
    expect(true).toBe(true)
  })

  it("Function", () => {
    function RWithout(_: Without) {return null};
    function RWrong(_: Wrong) {return null};
    function RSome(_: Some) {return null};
    function RProps(_: Props) {return null};

    // type RF = (props: {classnames: any}) => ReactElement<any, any> | null

    // const ch1: Props extends {classnames: any} ? true : false = true
    // const ch2: Parameters<typeof RProps>[0] extends {classnames: any} ? true : false = true
    // const ch3: Parameters<typeof RProps>[0] extends Parameters<RF>[0] ? true : false = true

    //@ts-expect-error
    type Res =
    //TODO @ts-expect-error
    | Getter<typeof RWithout>
    //TODO @ts-expect-error
    | Getter<typeof RWrong>
    //Consider @ts-expect-error 
    | Getter<typeof RSome>
    | Getter<typeof RProps>
    
    expect(true).toBe(true)
  })


})