import { _doubleShape } from "./double-shape";

describe(_doubleShape.name, () => {
  const css_module = {
    mod1: "hash1",
    mod2: "hash2",
    mod3: "hash3"
  }
  , css_global = {
    glob1: undefined,
    glob2: undefined
  }
  , className = "App"

  it('1 arg', () => expect({..._doubleShape(
    {
      classnames: {...css_module, ...css_global},
      className
    },
    true,
    "Inj",
    {
      //TODO no key hints
      mod1: undefined,
      mod2: false,
      mod3: true,
      mod4: "",
      mod5: "abc",
      glob1: undefined,
      glob2: false,
      glob3: true,
      glob4: "",
      glob5: "abc",
    }
  )}).toStrictEqual({
    className: [
      "App",
      "Inj",
      "mod1",
      "hash3",
      "", // mod4
      "abc",
      "glob1",
      "glob3",
      "", //glob4
      "abc"
    ].join(" ")
  }))

  it("TBD chaining", () => expect({..._doubleShape(
    {classnames: css_module, className},
    false,
    undefined,
    {"mod1": true}
  )(
    true,
    undefined,
    {"mod1": false}
  )}).toStrictEqual({
    className: "App"
  }))
})