import classNaming from "../src"
import { CssModule } from "../src/defs"

const global_css: CssModule = {}
, module_css = {
  "class3": "hash3",
  "class4": "hash4",
} as unknown as Record<"class1"|"class2"|"class3"|"class4", string|undefined>

describe("ctx", () => {
  it("context-less call", () => expect({
    //TODO Recover //@ts-expect-error
    ...classNaming()
  }).toStrictEqual({
    className: ""
  }))

  it("classnames === null", () => expect({
    //@ts-expect-error
    ...classNaming({classnames: null})({classnames: true})
  }).toStrictEqual({
    className: "classnames"
  }))  

  it("ctx + actions", () => expect({
    //@ts-expect-error
    ...classNaming({classnames: module_css}, {class1: true})
  }).toStrictEqual({
    className: ""
  }))

  it("second ctx assign", () => expect({
    ...classNaming({classnames: global_css})({
      //@ts-expect-error Type 'Record<string, ClassHash>' is not assignable to type 'string | boolean | undefined'
      classnames: global_css
    })
  }).toStrictEqual({
    className: "classnames"
  }))
})

describe("mixed args", () => {
  it("ctx", () => expect({
    ...classNaming()({
      class1: true,
      //TODO @ts-expect-error
      class2: undefined
    })
  }).toStrictEqual({
    className: "class1 class2"
  }))

  it("piped", () => expect({
    ...classNaming({classnames: global_css})({
      class1: true,
      //TODO @ts-expect-error
      class2: undefined
    })
  }).toStrictEqual({
    className: "class1 class2"
  }))
})

describe("multi-arg call", () => {
  it("ctx", () => {
    const classes = classNaming()
    
    expect({...classes(
      {class1: true},
      //@ts-expect-error
      {class2: "hash2"}
    )}).toStrictEqual({
      className: "class1"
    })
  })

})

it("not equal hashes", () => expect({
  ...classNaming({classnames: {class1: "HASH1"}})({class1: "hash1"})
}).toStrictEqual({
  className: "HASH1"
}))


it("no duplication on TS level", () => {
  const {class1, class2} = global_css
  , cn = classNaming({classnames: global_css})
  , call1 = cn({class1})
  , call2 = call1({class2})
  //@ts-expect-error Type 'undefined' is not assignable to type 'never'
  , call3 = call2({class1: undefined})

  expect({
    ...call3
  }).toStrictEqual({
    className: "class1 class2 class1"
  })
})
