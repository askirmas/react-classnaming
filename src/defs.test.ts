import {
  Component,
  // ReactElement
} from "react"
import type {
  ClassNamed,
  ClassHash,
  ReactRelated,
  GetProps,
  ClassNamesProperty
} from "./defs"

describe("ClassNamesProperty", () => {
  it("Free declaration", () => {
    type Props = ClassNamesProperty<{
      class1: ClassHash, class2: ClassHash
    }>
    const suites: Record<string, Props["classnames"]> = {
      "all setted": {
        class1: "class1",
        class2: undefined
      },
      "redundant": {
        class1: "class1",
        class2: undefined,
        //@ts-expect-error
        redundant: "redundant"
      },
      //@ts-expect-error
      "missed": {
        class1: "class1"
      },
      "wrong type": {
        class1: "class1",
        //@ts-expect-error
        class2: false
      }
    }
    expect(suites).toBeInstanceOf(Object)
  })
  it("Module based", () => {
    type CssModule = {
      App: ClassHash
      class1: ClassHash, class2: ClassHash
    }

    type Props = ClassNamesProperty<CssModule, {
      class1: ClassHash
      class2: ClassHash
      //TODO #12 Why no suggestion?
    }>

    type PropsWithWrong = ClassNamesProperty<CssModule,
      //@ts-expect-error
      {class3: ClassHash}
    >
    
    const suite4wrong: PropsWithWrong["classnames"] = {
        class3: undefined,
    },
    suite: Props["classnames"] = {
      class1: "class1",
      class2: undefined
    }
    expect({suite4wrong, suite}).toBeInstanceOf(Object)
  })
})

it.todo("ClassNamesFrom")

describe("ReactRelated", () => {
  type Getter<T extends ReactRelated> = GetProps<T>

  type Without = ClassNamed
  type Wrong = ClassNamed & {classnames: string}
  type Some = ClassNamed & {classnames: Record<string, ClassHash>}
  type Props = ClassNamed & {classnames: {class1: ClassHash; class2: ClassHash;}}

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
