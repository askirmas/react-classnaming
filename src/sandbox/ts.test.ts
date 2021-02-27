export {}

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
