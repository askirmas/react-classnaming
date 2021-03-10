import { Falsy } from "react-classnaming/ts-swiss.types"
import { Action, ClassHash, CssModule } from "../src/definitions.types"

const {keys: $keys} = Object

it("`in string` vs `:string`", () => {
  type In = {[k in string]: boolean}
  type Colon = {[k: string]: boolean}
  
  function check1(_: {some: boolean}) {}
  function checkR<K extends string>(_: {[k in K]: boolean}) {}
  function checkC(_: {[k: string]: boolean}) {}

  const input1: In = {}, input2: Colon = {}
  //@ts-expect-error
  check1(input1)
  //@ts-expect-error
  check1(input2)
  checkR(input1)
  checkR(input2)
  checkC(input1)
  checkC(input2)

}) 

describe("this", () => {
  type Context = {context: string}
  
  it.todo("`this?` is illegal")

  it("|void - NOPE", () => {  
    function thising(this: void | Context): typeof this extends Context ? true : null {
      //@ts-expect-error
      return this && 'context' in this
      ? true
      : null
    }
  
    const suite1 = thising()
    , suite2 = thising.bind({context: ""})()
    , suite1Check: Record<string, typeof suite1> = {
      "null": null,
      //@ts-expect-error
      "true": true
    }
    , suite2Check: Record<string, typeof suite2> = {
      //TODO #13 @ts-expect-error
      "null": null,
      //@ts-expect-error //TODO #13
      "true": true
    }

    expect({suite1Check, suite2Check}).toBeInstanceOf(Object)
  })

  it("|undefined - NOPE", () => {  
    function thising(this: undefined | Context): typeof this extends Context ? true : null {
      //@ts-expect-error
      return this && 'context' in this
      ? true
      : null
    }
  
    //@ts-expect-error //TODO #13 The 'this' context of type 'void' is not assignable
    const suite1 = thising()
    , suite2 = thising.bind({context: ""})()
    , suite1Check: Record<string, typeof suite1> = {
      "null": null,
      //@ts-expect-error
      "true": true
    }
    , suite2Check: Record<string, typeof suite2> = {
      //TODO #13 @ts-expect-error
      "null": null,
      //@ts-expect-error //TODO #13
      "true": true
    }

    expect({suite1Check, suite2Check}).toBeInstanceOf(Object)
  })

  it("|unknown - NOPE", () => {  
    function thising(this: unknown | Context): typeof this extends Context ? true : null {
      //@ts-expect-error
      return this && 'context' in this
      ? true
      : null
    }
  
    const suite1 = thising()
    , suite2 = thising.bind({context: ""})()
    , suite1Check: Record<string, typeof suite1> = {
      "null": null,
      //@ts-expect-error
      "true": true
    }
    , suite2Check: Record<string, typeof suite2> = {
      //TODO #13 @ts-expect-error
      "null": null,
      //@ts-expect-error //TODO #13
      "true": true
    }

    expect({suite1Check, suite2Check}).toBeInstanceOf(Object)
  })

  it("overload", () => {
    function thising(): null
    function thising(this: Context): true 
    function thising(this: void | Context) {
      return this && 'context' in this
      ? true
      : null
    }
  
    const suite1 = thising()
    , suite2 = thising.bind({context: ""})()
    , suite1Check: Record<string, typeof suite1> = {
      "null": null,
      //@ts-expect-error
      "true": true
    }
    , suite2Check: Record<string, typeof suite2> = {
      //@ts-expect-error
      "null": null,
      "true": true
    }

    expect({suite1Check, suite2Check}).toBeInstanceOf(Object)
  })

  it("throw variable - Nope", () => {
    function _thising(this: void | Context) {
      return this && 'context' in this
      ? true
      : null
    }

    //Same for ((this: Context) => true) | () => null)
    type Thising = (<T>(this: T) => T extends Context ? true : null)

    const thising = _thising as Thising

    const suite1 = thising()
    , binded = thising.bind({context: ""})
    , suite2 = binded()
    , suite1Check: Record<string, typeof suite1> = {
      "null": null,
      //@ts-expect-error
      "true": true
    }
    , suite2Check: Record<string, typeof suite2> = {
      //TODO #13 @ts-expect-error
      "null": null,
      //@ts-expect-error //TODO #13
      "true": true
    }

    expect({suite1Check, suite2Check}).toBeInstanceOf(Object)
  })

  it("idfn this", () => {
    function thising<T>(this: T) {
      return this
    }

    const suite = thising()
    , suiteCheck: Record<string, typeof suite> = {
      "void": undefined
    }
    
    expect({suiteCheck}).toBeInstanceOf(Object)
  })
})

describe("UX of TS choice", () => {
  type T1 = {
    class1: string,
    class2: undefined
  }

  // it("union", () => {
  //   type tUnion<S extends CssModule> = (
  //     <A extends {[K in keyof S]?: V}>(source: A) => string
  //   ) | (
  //     <A extends {[K in keyof S]?: V}>(inject: string, source: A) => string
  //   );
    
  //   // const str = <S extends CssModule>(arg1: strS) => $keys(source).join(" ")
  // })

  // it("expression 1", () => {
  //   type tExpression1<S extends CssModule> = (
  //     <A extends {[K in keyof S]?: V}>(arg0: string|A, arg1?: typeof arg0 extends string ? A : never) => string
  //   );  
  // })

  // it("overload interface", () => {
  //   interface iOverload<S extends CssModule> {
  //     <A extends {[K in keyof S]?: V}>(arg0: string): string
  //     <A extends {[K in keyof S]?: V}>(arg0: string, arg1: A): string
  //   }  
  // })

  it("overload function", () => {
    function joiner<S extends CssModule>(source: {[K in keyof S]?: ClassHash}) :string
    function joiner<S extends CssModule>(inj: string, source: {[K in keyof S]?: ClassHash}) :string
    function joiner<S extends CssModule, F1 extends {[K in keyof S]?: ClassHash} | string>(
      arg0: F1,
      // arg1?: typeof arg0 extends string ? {[K in keyof S]?: V} : never 
      arg1?: F1 extends string ? Exclude<F1, string> : never
    ) {
      return `${
        typeof arg0 === "string" ? arg0 : $keys(arg0) 
      } ${
        arg1 === undefined ? "" : $keys(arg1).join(" ")
      }`.trim()
    }

    const bothObjects = joiner<T1>(
      //@ts-expect-error Argument of type '{ class1: string; }' is not assignable to parameter of type 'string'
      {class1: ""},
      {class2: ""}
    )
    , redundantKey = joiner<T1>(
      //@ts-expect-error Argument of type '{ class3: string; }' is not assignable
      {class3: ""}
    )
    
    expect({bothObjects, redundantKey}).toBeInstanceOf(Object)
  })
})

describe("keys hinting", () => {
  type Source = {
    class1: ClassHash
    class2: ClassHash
    class3: ClassHash
  }

  it("- partial", () => {
    const partial = <T extends {[K in keyof Source]?: Action}>(pay: T) => pay
    , $return = partial({class1: true, class2: true, class4: undefined})
    , check: Record<string, typeof $return> = {
      //@ts-expect-error
      "missed": {
        class1: true, class2: true
      },
      "exact": {
        class1: true, class2: true, class4: undefined
      }
    } 

    expect(check).toBeInstanceOf(Object)
  })

  it("- partial*pick", () => {
    const partial = <T extends {[K in keyof Source]?: Action}>(pay: Pick<T, keyof Source>) => pay
    , checkRedundant = partial({class1: true, class2: true,
        //@ts-expect-error
        class4: undefined
      })
    , $return = partial({class1: true, class2: true})
    , check: Record<string, typeof $return> = {
      "exact": {},
    } 

    expect({check, checkRedundant}).toBeInstanceOf(Object)
  })

  it("+ partial*own pick", () => {
    type Parter<Source> = <
      T extends {[K in keyof Source]?: Action}
    >(
      pay?: T & {[K in keyof T]: K extends keyof Source ? Action : never} | Falsy
    ) => T

    const partial: Parter<Source> = (pay) => pay as any
    , checkRedundant = partial({class1: true, class2: true,
        //@ts-expect-error
        class4: undefined
      })
    , $return = partial({class1: true, class2: true })
    , check: Record<string, typeof $return> = {
      //@ts-expect-error
      "missed": {class1: true},
      "exact": {class1: true, class2: true},
      "redundant": {class1: true, class2: true,
        //@ts-expect-error
        class3: true
      },
    } 

    expect({check, checkRedundant}).toBeInstanceOf(Object)
  })
})
