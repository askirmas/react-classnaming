import { ClassHash, ClassNamesProperty } from "./defs"
import classNamesMap from "./map"

type Layout = ClassNamesProperty<{
  Header: ClassHash
  Body: ClassHash
  Footer: ClassHash
}>

const css_module = {
  "App__Header": "header_hash",
  "App__Body": "body_hash",
  "App---dark": undefined
}
, {
  App__Body, 
  App__Header,
} = css_module


describe("contexted", () => {
  const mapping = classNamesMap(css_module)

  it("demo", () => expect(mapping<Layout>({
    Body: {App__Body, "App---dark": true},
    Header: {App__Header},
    Footer: {}
  })).toStrictEqual({
    classnames: {
      Body: "body_hash App---dark",
      Header: "header_hash",
      Footer: ""
    }
  }))

  it("forgot Footer", () => expect(mapping<Layout>(
    //@ts-expect-error
    {
      Body: {App__Body, "App---dark": true},
      Header: {App__Header},
    }
  )).toStrictEqual({
    classnames: {
      Body: "body_hash App---dark",
      Header: "header_hash"
    }
  }))

  it("redundant", () => expect(mapping<Layout>({
    Body: {App__Body, "App---dark": true},
    Header: {App__Header},
    Footer: {},
    //@ts-expect-error
    "redundant": {}
  })).toStrictEqual({
    classnames: {
      Body: "body_hash App---dark",
      Header: "header_hash",
      Footer: "",
      redundant: ""
    }
  }))

  it("unknown @ source", () => expect(mapping<Layout>({
    Body: {App__Body, "App---dark": true},
    Header: {App__Header},
    Footer: {
      //@ts-expect-error
      unknown: true
    },
  })).toStrictEqual({
    classnames: {
      Body: "body_hash App---dark",
      Header: "header_hash",
      Footer: "unknown"
    }
  }))
})

it("free form", () => expect(classNamesMap({} as Record<string, ClassHash>)({
  "ever what": {"whatever": true}
})).toStrictEqual({
  "classnames": {"ever what": "whatever"}
}))
