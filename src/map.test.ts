import { ClassHash, ClassNamesProperty } from "./defs"
import classNamesMap from "./map"

type Layout = ClassNamesProperty<{
  Header: ClassHash
  Body: ClassHash
}>

const css_module = {
  "App__Header": "header_hash",
  "App__Body": "body_hash",
  "App___dark": undefined
}
, {
  App__Body, 
  App__Header,
  App___dark
} = css_module

it("direct", () => expect(classNamesMap<
  Layout,
  ClassNamesProperty<typeof css_module>
>({
  Body: {App__Body, App___dark},
  Header: {App__Header}
})).toStrictEqual({
  classnames: {
    Body: "body_hash App___dark",
    Header: "header_hash"
  }
}))