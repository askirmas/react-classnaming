import type { Subest } from "./ts-swiss.types"

describe("Subest", () => {

  type SubFunc<Base> = <T extends {[K in keyof Base]?: Base[K]}>(arg: Subest<T, Base>) => (keyof T)[]

  function keying<Base>() {
    return (arg => Object.keys(arg)) as SubFunc<Base>
  }

  type FlatOpt = {
    opt1?: "a"|"b"|"c"
    opt2?: string
  }

  type FlatReq = {
    req1: "a"|"b"|"c"
    req2: string
  }

  it("demo", () => {
    const retOpt = keying<FlatOpt>()({opt1: "a"})
    , retReq = keying<FlatReq>()({req1: "a"})
    , checkOpt: Record<string, typeof retOpt> = {
      "exact": ["opt1"],
      "redundant": ["opt1", 
        //@ts-expect-error
        "opt2"
      ]
    }
    , checkReq: Record<string, typeof retReq> = {
      "exact": ["req1"],
      "redundant": ["req1", 
        //@ts-expect-error
        "req2"
      ]
    }
    
    expect({checkOpt, checkReq}).toBeInstanceOf(Object)
  })

  it("flat", () => {  
    const check1: Record<string, Subest<{opt1: "a"|"b"}, FlatOpt>> = {
      "exact": {opt1: "a"},
      //@ts-expect-error
      "wrong value": {opt1: "X"},
      "redundant property": {opt1: "a",
        //@ts-expect-error
        redundant: "x"
      }
    }

    expect({check1}).toBeInstanceOf(Object)
  })
})